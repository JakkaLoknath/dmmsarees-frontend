import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();

    const[products, setProducts] = useState([]);

    useEffect(() => {
        fetch("https://dmmsarees-backend.onrender.com/getproducts")
        .then(res => res.json())
        .then(data => setProducts(data))
        .catch(() => console.log("Unable to fetch data"))
    }, [])

    return(
        <>
            <div className="nav-outer">
                <div className="nav-first">
                    <h3>DMM SAREES</h3>
                </div>

                <div className="nav-second">
                    <button className="sign-in-btn" onClick={() => {
                        navigate("/types");
                    }}>Sign in</button>
                </div>
            </div>
            <div className="home-products">
                    {
                    products.length !== 0 ? (products.map((p) => (
                        <div className="home-product" key={p.id}>
                            <div className="home-image">
                                <img src={`https://dmmsarees-backend.onrender.com/getimage/${p.id}`} alt={p.sareeName} />
                                <button onClick={() => {
                                    localStorage.setItem("home-image", JSON.stringify(p.id));
                                    navigate("/home-image");
                                }} className="home-view-photo">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M200-200v-240h80v160h160v80H200Zm480-320v-160H520v-80h240v240h-80Z"/></svg>
                                </button>
                            </div>
                            <div className="home-info">
                                <p className="home-saree-name"> {p.sareeName}</p>
                                <p>Material: {p.material}</p>
                                <p>Color: {p.color}</p> 
                                <br />
                                <p className="home-saree-price"> ₹{p.price}</p>
                                <p>Stock: {p.stock}</p>
                            </div>
                            <div className="home-btns">
                                <button className="home-add-btn" onClick={() => {
                                    navigate("/types");
                                }}>Add to cart</button>
                                <button className="home-info-btn" onClick={() => {
                                    navigate("/types");
                                }}>More info</button>
                            </div>
                        </div>
                    ))) : ("LOADING PLEASE WAIT")
                    }
            </div>
        </>
    );
}