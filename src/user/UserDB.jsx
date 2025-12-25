import { use, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function VendorDB()
{
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();
    const [allProducts,setAllProducts] = useState([]);
    

    useEffect(() => {
        if (!user) {
            navigate("/u-login");
            return;
        }
        fetch(`https://dmmsarees-backend.onrender.com/getproducts`)
        .then(res => res.json())
        .then(data => setAllProducts(data))
        .catch(() => alert("Something went wrong"))
    }, [])


    return(
        <div>
            <nav className="udb-nav">
                <div><h3>DMM SAREES</h3></div>
                <div className="udb-nav-second">
                    <button className="udb-cart" onClick={() => {
                        navigate("/uc");
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="rgb(4, 170, 109)"><path d="M240-80q-33 0-56.5-23.5T160-160v-480q0-33 23.5-56.5T240-720h80q0-66 47-113t113-47q66 0 113 47t47 113h80q33 0 56.5 23.5T800-640v480q0 33-23.5 56.5T720-80H240Zm0-80h480v-480h-80v80q0 17-11.5 28.5T600-520q-17 0-28.5-11.5T560-560v-80H400v80q0 17-11.5 28.5T360-520q-17 0-28.5-11.5T320-560v-80h-80v480Zm160-560h160q0-33-23.5-56.5T480-800q-33 0-56.5 23.5T400-720ZM240-160v-480 480Z"/></svg>
                    </button>
                    <button className="udb-profile" onClick={() => {
                        navigate("/up");
                    }}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="rgb(4, 170, 109)"><path d="M480-480q-51 0-85.5-34.5T360-600q0-50 34.5-85t85.5-35q50 0 85 35t35 85q0 51-35 85.5T480-480Zm0-80q17 0 28.5-11.5T520-600q0-17-11.5-28.5T480-640q-17 0-28.5 11.5T440-600q0 17 11.5 28.5T480-560ZM240-240v-76q0-21 10.5-39.5T279-385q46-27 96.5-41T480-440q54 0 104.5 14t96.5 41q18 11 28.5 29.5T720-316v76H240Zm240-120q-41 0-80 10t-74 30h308q-35-20-74-30t-80-10Zm0-240Zm0 280h154-308 154ZM160-80q-33 0-56.5-23.5T80-160v-160h80v160h160v80H160ZM80-640v-160q0-33 23.5-56.5T160-880h160v80H160v160H80ZM640-80v-80h160v-160h80v160q0 33-23.5 56.5T800-80H640Zm160-560v-160H640v-80h160q33 0 56.5 23.5T880-800v160h-80Z"/></svg>
                        <div className="udb-profile-info">
                            <p>Name: {user.name}</p>
                            <p>Email: {user.mail}</p>
                            <p>City: {user.city}</p>
                        </div>
                    </button>
                </div>
            </nav>

            <div className="udb-products">
                {
                    allProducts.length !== 0 ? (allProducts.map((p) => (
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
                                <p>Material: {p.material}</p>
                                <p>Color: {p.color}</p><br />
                                <p className="udb-saree-price"> ₹{p.price}</p>
                                <p>Stock: {p.stock}</p>
                            </div>
                            <div className="udb-btns">
                                <button onClick={() => {
                                    localStorage.setItem("user-product-info", JSON.stringify(p));
                                    navigate("/upi");
                                }}>More info
                                </button>
                                <button className="udb-cart-btn" onClick={() => {
                                    localStorage.setItem("user-cart-product", JSON.stringify(p));
                                    navigate("/ucp");
                                }}>Add to cart
                                </button>
                            </div>
                        </div>
                    ))) : (<div className="udb-no-products-msg">LODING OR NO PRODUCTS ADDED</div>)
                }
            </div>
        </div>
    );
}