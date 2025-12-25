import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDB()
{
    const admin = JSON.parse(localStorage.getItem("admin"));
    const navigate = useNavigate();

    const[users, setUsers] = useState([]);
    const[vendors, setVendors] = useState([]);

    useEffect(() => {
        fetch("https://dmmsarees-backend.onrender.com/getusers")
        .then(res => res.json())
        .then(data => setUsers(data))
        .catch(() => console.log("something went wrong"))

        fetch("https://dmmsarees-backend.onrender.com/getvendors")
        .then(res => res.json())
        .then(data => setVendors(data))
        .catch(() => console.log("something went wrong"))
    }, [])

    const handleUserRemove = async(userid) => {
        if(!window.confirm("Click ok to delete user"))
        {
            return;
        }

        const res = await fetch(`https://dmmsarees-backend.onrender.com/deleteuserandusercart/${userid}`, {
            method : "DELETE"
        })

        if(res.ok)
            setUsers(prev => prev.filter((user) => user.id !== userid));
        else
            alert("unable to delete user");
    }

    const handleVendorRemove = async(vendorid) => {
        if(!window.confirm("Click ok to delete vendor"))
        {
            return;
        }

        const res = await fetch(`https://dmmsarees-backend.onrender.com/deletevendorandvendorproducts/${vendorid}`, {
            method : "DELETE"
        })

        if(res.ok)
            setVendors(prev => prev.filter((vendor) => vendor.id !== vendorid));
        else
            alert("unable to delete user");
    }

    return(
        <div>
            <nav className="udb-nav">
                <div><h3>DMM SAREES</h3></div>
                <div className="udb-nav-second">
                    <button className="udb-profile">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="rgb(4, 170, 109)"><path d="M480-480q-51 0-85.5-34.5T360-600q0-50 34.5-85t85.5-35q50 0 85 35t35 85q0 51-35 85.5T480-480Zm0-80q17 0 28.5-11.5T520-600q0-17-11.5-28.5T480-640q-17 0-28.5 11.5T440-600q0 17 11.5 28.5T480-560ZM240-240v-76q0-21 10.5-39.5T279-385q46-27 96.5-41T480-440q54 0 104.5 14t96.5 41q18 11 28.5 29.5T720-316v76H240Zm240-120q-41 0-80 10t-74 30h308q-35-20-74-30t-80-10Zm0-240Zm0 280h154-308 154ZM160-80q-33 0-56.5-23.5T80-160v-160h80v160h160v80H160ZM80-640v-160q0-33 23.5-56.5T160-880h160v80H160v160H80ZM640-80v-80h160v-160h80v160q0 33-23.5 56.5T800-80H640Zm160-560v-160H640v-80h160q33 0 56.5 23.5T880-800v160h-80Z"/></svg>
                        <div className="udb-profile-info">
                            <p>Email: {admin.mail}</p>
                        </div>
                    </button>

                    <button className="adb-sign-out" onClick={() => {
                        navigate("/");
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="rgb(4, 170, 109)"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/></svg>

                        <div className="adb-sign-out-msg">
                            <p>Sign Out</p>
                        </div>
                    </button>
                </div>
            </nav>
            <div className="adb-users-outer">
                <div className="adb-users">
                    <h3>USERS</h3>
                    <hr />
                    <div className="adb-table">
                        {
                            users ? (users.map((user) => (
                                <div className="adb-user" key={user.id}>
                                    <div>{user.id}</div>
                                    <div>{user.name}</div>
                                    <div className="adb-del-btn">
                                        <button onClick={() => {
                                            localStorage.setItem("adb-user-details", JSON.stringify(user));
                                            navigate("/adb-ud");
                                        }}>Details</button>
                                    </div>
                                    <div className="adb-rem-btn">
                                        <button onClick={() => {
                                            handleUserRemove(user.id);
                                        }}>Remove</button>
                                    </div>
                                </div>
                            ))) : ("FOUND NO USERS")
                        }
                    </div>
                </div>
            </div>
            <div className="adb-vendors-outer">
                <div className="adb-vendors">
                    <h3>VENDORS</h3>
                    <hr />
                    <div className="adb-table">
                        {
                            vendors ? (vendors.map((vendor) => (
                                <div className="adb-vendor" key={vendor.id}>
                                    <div>{vendor.id}</div>
                                    <div>{vendor.name}</div>
                                    <div className="adb-del-btn">
                                        <button onClick={() => {
                                            localStorage.setItem("adb-vendor-details", JSON.stringify(vendor));
                                            navigate("/adb-vd");
                                        }}>Details</button>
                                    </div>
                                    <div className="adb-rem-btn">
                                        <button onClick={() => {
                                            handleVendorRemove(vendor.id);
                                        }}>Remove</button>
                                    </div>
                                </div>
                            ))) : ("FOUND NO VENDORS")
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}