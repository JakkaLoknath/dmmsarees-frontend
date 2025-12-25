import { useNavigate } from "react-router-dom";

export default function VendorProfile()
{
    const navigate = useNavigate();
    const vendor = JSON.parse(localStorage.getItem("vendor"));
    return(
        <div className="vp-outer">
            <div className="vp-inner">
                <div>
                    <h3 className="vp-header">PROFILE INFO</h3>
                    <p><b>Name: </b> {vendor.name}</p>
                    <p><b>Mail: </b> {vendor.mail}</p>
                    <p><b>Store name: </b> {vendor.storeName}</p>
                    <p><b>City: </b> {vendor.city}</p>
                    <p><b>Pincode: </b>{vendor.pincode}</p>
                </div>
                <div className="vp-btns">
                    <button className="vp-back-btn" onClick={() => {
                        navigate("/vdb");
                    }}>Back</button>
                    <button onClick={() => {
                        navigate("/");
                    }}>Sign out</button>
                </div>
            </div>
        </div>
    );
}