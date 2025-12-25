import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserCart()
{
    const u = JSON.parse(localStorage.getItem("user"));
    const[userCartProducts, setUserCartProducts] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        fetch(`https://dmmsarees-backend.onrender.com/getallcart/${u.id}`)
        .then(res => res.json())
        .then(data => {
            Promise.all(
                data.map(item => (
                    fetch(`https://dmmsarees-backend.onrender.com/getproductbyid/${item.productid}`)
                    .then(res => res.json())
                    .then(product => ({
                        ...product,
                        cartId: item.id,
                        cartQuantity : item.quantity
                    }))
                ))
            ).then(fullData => setUserCartProducts(fullData));
        })
        .catch(() => console.log("Unable to fetch data"));
    }, []);

    const handleDelete = async (id) => {

        if(!window.confirm("Confirm Removal"))
        {
            return;
        }

        const delRes = await fetch(`https://dmmsarees-backend.onrender.com/deletecartproduct/${id}`, {
            method : "DELETE"
        })

        setUserCartProducts(prev => prev.filter(ucp => ucp.cartId !== id));
    }

    return(
        <div className="uc-outer">
            <div className="uc-inner-one">
                <button onClick={() => {
                    navigate("/udb");
                }}>Back</button>
                <button disabled={userCartProducts.length === 0} onClick={() => {
                    
                    navigate("/ub", {
                        state : {
                            cartItems : userCartProducts
                        }
                    })
                }}>
                    Generate Bill
                </button>
            </div>
            <div className="uc-inner">
                {
                    userCartProducts.length !== 0 ? (userCartProducts.map(p => (
                        <div className="udb-product" key={p.id}>
                            <div className="udb-image">
                                <img src={`https://dmmsarees-backend.onrender.com/getimage/${p.id}`} alt={p.sareeName} />
                                <button onClick={() => {
                                    localStorage.setItem("udb-image", JSON.stringify(p.id));
                                    navigate("/udb-product-image");
                                }} className="udb-view-photo">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M200-200v-240h80v160h160v80H200Zm480-320v-160H520v-80h240v240h-80Z"/></svg>
                                </button>
                            </div>
                            <div className="udb-info">
                                <p className="udb-saree-name"> {p.sareeName}</p>
                                <p>{p.material}</p>
                                <p>{p.color}</p> <br />
                                <p className="udb-saree-price"> ₹{p.price}  * {p.cartQuantity}</p>
                            </div>
                            <div className="udb-btns">
                                <button onClick={() => {
                                    localStorage.setItem("uc-product-update", JSON.stringify(p));
                                    navigate("/ucu");
                                }}>Update Quantity</button>
                                
                                <button onClick={() => {
                                    handleDelete(p.cartId);
                                }}>Remove Product</button>
                            </div>
                        </div>
                    ))) : ("LOADING OR NO PRODUCTS ARE ADDED")
                }
            </div>
        </div>
    );
}