import { useNavigate } from "react-router-dom";

export default function AdminDBVendorDetails()
{
    const vendor = JSON.parse(localStorage.getItem("adb-vendor-details"));
    const navigate = useNavigate();

    const handleVendorRemove = async(vendorid) => {
        if(!window.confirm("Click ok to delete vendor"))
        {
            return;
        }

        const res = await fetch(`https://dmmsarees-backend.onrender.com/deletevendorandvendorproducts/${vendorid}`, {
            method : "DELETE"
        })

        if(res.ok)
        {
            navigate("/adb");
        }
        else
            alert("unable to delete user");
    }

    return(
        <div className="adb-ud-outer">
            <div className="adb-ud-inner">
                <div>
                    <h3 className="adb-ud-header">Vendor Details</h3>
                    <p><b>Id:</b> {vendor.id}</p>
                    <p><b>Name:</b>{vendor.name}</p>
                    <p><b>Mail:</b> {vendor.mail}</p>
                    <p><b>LandMark:</b> {vendor.landmark}</p>
                    <p><b>City:</b> {vendor.city}</p>
                    <p><b>State:</b> {vendor.state}</p>
                    <p><b>Pincode:</b> {vendor.pincode}</p>
                </div>
                <div className="adb-ud-btns">
                    <button className="adb-ud-btns-back" onClick={() => {
                        navigate("/adb");
                    }}>Back</button>

                    <button onClick={() => {
                        handleVendorRemove(vendor.id);
                    }}>Remove</button>
                </div>
            </div>
        </div>
    );
}