import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserCartUpdate()
{
    const u = JSON.parse(localStorage.getItem("user"));
    const p = JSON.parse(localStorage.getItem("uc-product-update"));
    
    const navigate = useNavigate();
    const [count, setCount] = useState(p.cartQuantity);

    const increase = () => {
        if(count >= p.stock)
        {
            alert(`Max Stock Quantity: ${p.stock}`);
            return;
        }
        setCount(count + 1);
    }

    const decrease = () => {
        if(count <= 1)
        {
            alert("Min Quantity to select is 1");
            return;
        }
        setCount(count - 1);
    }

    const handleCartAdd = async() => {
        const productRes = await fetch(`https://dmmsarees-backend.onrender.com/getcart/${u.id}/${p.id}`, {
            method : "GET"
        })

        let data = await productRes.json();

        const userCartProduct = {
            id : data.id,
            userid : u.id,
            productid : p.id,
            quantity : count
        }
        
        await fetch("https://dmmsarees-backend.onrender.com/addtocart", {
            method : "POST",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify(userCartProduct)
        })

        navigate("/uc");
        alert("Product quantity updated");
    }
    

    return(
        <div className="ucp-outer">
            <div className="ucp-product">
                <div className="udb-image">
                    <img src={`https://dmmsarees-backend.onrender.com/getimage/${p.id}`} alt={p.sareeName} />
                </div>
                <div className="udb-info">
                    <p className="udb-saree-name"> {p.sareeName}</p>
                    <p>Material: {p.material}</p>
                    <p>Color: {p.color}</p>
                    <p className="udb-saree-price"> ₹{p.price}</p>
                    <p>Stock: {p.stock}</p>
                </div>
                <h4>Update Quantity</h4>
                <div className="ucp-counter">
                    <button onClick={() => {
                        decrease();
                    }}>-</button>
                    <span>{count}</span>
                    <button onClick={() => {
                        increase();
                    }}>+</button>
                </div>
                
                <div className="ucp-btns">
                    <button className="ucp-back-btn" onClick={() => {
                        navigate("/uc");
                    }}>Back</button>
                    <button className="ucp-add-btn" onClick={() => {
                        handleCartAdd();
                    }}>Update</button>
                </div>
            </div>
        </div>
    );
}