import { useNavigate } from "react-router-dom";

export default function UserProfile()
{
    const navigate = useNavigate();
    const vendor = JSON.parse(localStorage.getItem("user"));
    return(
        <div className="up-outer">
            <div className="up-inner">
                <div>
                    <h3 className="up-header">PROFILE INFO</h3>
                    <p><b>Name: </b> {vendor.name}</p>
                    <p><b>Mail: </b> {vendor.mail}</p>
                    <p><b>City: </b> {vendor.city}</p>
                    <p><b>Pincode: </b>{vendor.pincode}</p>
                </div>
                <div className="up-btns">
                    <button className="up-back-btn" onClick={() => {
                        navigate("/udb");
                    }}>Back</button>
                    <button onClick={() => {
                        navigate("/");
                    }}>Sign out</button>
                </div>
            </div>
        </div>
    );
}