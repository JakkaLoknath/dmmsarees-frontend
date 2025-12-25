import { useNavigate } from "react-router-dom";

export default function AdminDBUserDetails()
{
    const user = JSON.parse(localStorage.getItem("adb-user-details"));
    const navigate = useNavigate();

    const handleUserRemove = async(userid) => {
        if(!window.confirm("Click ok to delete user"))
        {
            return;
        }

        const res = await fetch(`https://dmmsarees-backend.onrender.com/deleteuserandusercart/${userid}`, {
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
                    <h3 className="adb-ud-header">User Details</h3>
                    <p><b>Id:</b> {user.id}</p>
                    <p><b>Name:</b>{user.name}</p>
                    <p><b>Mail:</b> {user.mail}</p>
                    <p><b>LandMark:</b> {user.landmark}</p>
                    <p><b>City:</b> {user.city}</p>
                    <p><b>State:</b> {user.state}</p>
                    <p><b>Pincode:</b> {user.pincode}</p>
                </div>
                <div className="adb-ud-btns">
                    <button className="adb-ud-btns-back" onClick={() => {
                        navigate("/adb");
                    }}>Back</button>

                    <button onClick={() => {
                        handleUserRemove(user.id);
                    }}>Remove</button>
                </div>
            </div>
        </div>
    );
}