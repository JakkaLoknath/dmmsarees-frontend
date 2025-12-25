import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserCartProduct()
{
    const u = JSON.parse(localStorage.getItem("user"));
    const p = JSON.parse(localStorage.getItem("user-cart-product"));
    const navigate = useNavigate();
    const[count, setCount] = useState(1);

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

        let data = null;

        if (productRes.ok) {
            const text = await productRes.text();
            data = text ? JSON.parse(text) : null;
        }

        
        if(data)
        {
            if(count + data.quantity > p.stock)
            {
                alert(`your cart quantity of this product: ${data.quantity}\nProduct stock is limited to: ${p.stock}`);
                return;
            }

            const userCartProduct = {
                id : data.id,
                userid : u.id,
                productid : p.id,
                quantity : count + data.quantity
            }
            
            const addRes = fetch("https://dmmsarees-backend.onrender.com/addtocart", {
                method : "POST",
                headers : {"Content-Type" : "application/json"},
                body : JSON.stringify(userCartProduct)
            })

            alert("Product quantity updated");
            navigate("/udb");
        }
        else
        {
            const userCartProduct = {
                userid : u.id,
                productid : p.id,
                quantity : count
            }

            const addRes = fetch("https://dmmsarees-backend.onrender.com/addtocart", {
                method : "POST",
                headers : {"Content-Type" : "application/json"},
                body : JSON.stringify(userCartProduct)
            })

            alert("Product added");
            navigate("/udb");
        }
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
                <h4>Quantity</h4>
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
                        navigate("/udb");
                    }}>Back</button>
                    <button className="ucp-add-btn" onClick={() => {
                        handleCartAdd();
                    }}>Add</button>
                </div>
            </div>
        </div>
    );
}