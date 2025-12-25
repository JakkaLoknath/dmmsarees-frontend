import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserProductInto()
{
    const navigate = useNavigate();
    const p = JSON.parse(localStorage.getItem("user-product-info"));
    const [vendor, setVendor] = useState([]);

    useEffect(() => {
        fetch(`https://dmmsarees-backend.onrender.com/getvendor/${p.vendorId}`)
        .then(res => res.json())
        .then(data => setVendor(data))
        .catch(e => console.log("Something went wrong"))
    },[])

    return(
        <div className="upi-outer">
            <div className="upi-inner">
                <div className="upi-image">
                    <img src={`https://dmmsarees-backend.onrender.com/getimage/${p.id}`} alt={p.sareeName} />
                </div>
                <div className="upi-info">
                    <h3><u>SAREE DETAILS</u></h3>
                    <p className="upi-saree-name"><i>{p.sareeName}</i></p>
                    <p><b>Material:</b> {p.material}</p>
                    <p><b>Color:</b> {p.color}</p> 
                    
                    <p><b>Price:</b> ₹{p.price}</p>
                    <p><b>Stock:</b> {p.stock}</p>
                    <h3><u>VENDOR DETAILS</u></h3>
                    <p><b>Name:</b> {vendor.name}</p>
                    <p><b>Mail:</b> {vendor.mail}</p>
                    <p><b>City:</b> {vendor.city}</p>
                    <p><b>Store name:</b> {vendor.storeName}</p>
                    <h3><u>WEAVER DETAILS</u></h3>
                    <p><b>Name:</b> {p.weaverName}</p>
                    <p><b>Phone:</b> {p.weaverPhone}</p>
                </div>
                <div className="upi-btns">
                    <button className="upi-back-btn" onClick={() => {
                        navigate("/udb");
                    }}>Back</button>
                    <button onClick={() => {
                        navigate("/ucp");
                    }}>Add to cart</button>
                </div>
            </div>
        </div>
    );
}