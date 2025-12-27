import { use, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function VendorDB()
{
    const vendor = JSON.parse(localStorage.getItem("vendor"));
    const navigate = useNavigate();
    const [allProducts,setAllProducts] = useState([]);
    

    useEffect(() => {
        if (!vendor) {
            navigate("/v-login");
            return;
        }
        fetch(`https://dmmsarees-backend.onrender.com/getproducts/${vendor.id}`)
        .then(res => res.json())
        .then(data => setAllProducts(data))
        .catch(() => alert("Something went wrong"))
    }, [])

    const handleDelete = async(id) => {
        if(!window.confirm("Do you want to delete this product?"))
        {
            return;
        }
        const res = await fetch(`https://dmmsarees-backend.onrender.com/deleteproduct/${id}`, {
            method : "DELETE"
        })
        const updatedProducts = allProducts.filter((p) => p.id !== id);
        setAllProducts(updatedProducts);

        if(res.ok)
        {
            alert("Product deleted");
        }
        else
        {
            alert("Something went wrong");
        }
    }

    return(
        <div>
            <nav className="vdb-nav">
                <div><h3>DMM SAREES</h3></div>
                <button className="vdb-profile" onClick={() => {
                    navigate("/vp");
                }}>
                   <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="rgb(4, 170, 109)"><path d="M480-480q-51 0-85.5-34.5T360-600q0-50 34.5-85t85.5-35q50 0 85 35t35 85q0 51-35 85.5T480-480Zm0-80q17 0 28.5-11.5T520-600q0-17-11.5-28.5T480-640q-17 0-28.5 11.5T440-600q0 17 11.5 28.5T480-560ZM240-240v-76q0-21 10.5-39.5T279-385q46-27 96.5-41T480-440q54 0 104.5 14t96.5 41q18 11 28.5 29.5T720-316v76H240Zm240-120q-41 0-80 10t-74 30h308q-35-20-74-30t-80-10Zm0-240Zm0 280h154-308 154ZM160-80q-33 0-56.5-23.5T80-160v-160h80v160h160v80H160ZM80-640v-160q0-33 23.5-56.5T160-880h160v80H160v160H80ZM640-80v-80h160v-160h80v160q0 33-23.5 56.5T800-80H640Zm160-560v-160H640v-80h160q33 0 56.5 23.5T880-800v160h-80Z"/></svg>
                    <div className="vdb-profile-info">
                        <p>Name: {vendor.name}</p>
                        <p>Email: {vendor.mail}</p>
                        <p>City: {vendor.city}</p>
                    </div>
                </button>
            </nav>

            <div className="vdb-products">
                {
                    allProducts.length !== 0 ? (allProducts.map((p) => (
                        <div className="vdb-product" key={p.id}>
                            <div className="vdb-image">
                                <img src={`https://dmmsarees-backend.onrender.com/getimage/${p.id}`} alt={p.sareeName} />
                                <button onClick={() => {
                                    localStorage.setItem("vdb-image", JSON.stringify(p.id));
                                    navigate("/vdb-product-image");
                                }} className="vdb-view-photo">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M200-200v-240h80v160h160v80H200Zm480-320v-160H520v-80h240v240h-80Z"/></svg>
                                </button>
                            </div>
                            <div className="vdb-info">
                                <p className="vdb-saree-name"> {p.sareeName}</p>
                                <p>Material: {p.material}</p>
                                <p>Color: {p.color}</p> 
                                <p>Weaver name: {p.weaverName}</p>
                                <p>Weaver phone: {p.weaverPhone}</p><br />
                                <p className="vdb-saree-price"> ₹{p.price}</p>
                                <p>Stock: {p.stock}</p>
                            </div>
                            <div className="vdb-btns">
                                <button onClick={() => {
                                    localStorage.setItem("vendorProductEdit", JSON.stringify(p));
                                    navigate("/vpe")
                                }}>Edit
                                </button>
                                <button className="vdb-del-btn" onClick={() => {
                                    handleDelete(p.id);
                                }}>Delete
                                </button>
                            </div>
                        </div>
                    ))) : (<div className="vdb-no-products-msg">NO PRODUCTS ARE ADDED</div>)
                }
            </div>

            <div className="vdb-btn">
                <button className="vdb-add-btn" onClick={() => {
                    navigate("/vpf");
                }}>Add Product</button>
            </div>
        </div>
    );
}