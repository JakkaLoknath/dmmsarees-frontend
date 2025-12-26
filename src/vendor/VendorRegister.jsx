import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function VendorRegister()
{
    const navigate = useNavigate();

    const[name, setName] = useState("");
    const[mail, setMail] = useState("");
    const[storeName, setStoreName] = useState("");
    const[landmark, setLandmark] = useState("");
    const[city, setCity] = useState("");
    const[state, setState] = useState("");
    const[pincode, setPincode] = useState(1);
    const[password, setPassword] = useState("");
    const[cpassword, setCpassword] = useState("");

    const handleRegister = async () => {

        if(!name.trim() || !mail.trim() || !storeName.trim() || !landmark.trim() || !city.trim() || !state.trim() || !password.trim() || !cpassword.trim())
        {
            alert("Fill all fields")
            return;
        }

        if(pincode < 1) 
        {
            alert("Pincode can not be ZERO or NEGATIVE");
            return;
        }

        if(password.trim() !== cpassword.trim())
        {
            alert("Passwords are not matching");
            return;
        }

        const newVendor = {
            name : name,
            mail : mail,
            storeName : storeName,
            landmark : landmark,
            city : city,
            state : state,
            pincode : pincode,
            password : password
        }

        const res = await fetch("https://dmmsarees-backend.onrender.com/addvendor", {
            method : "POST",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify(newVendor)
        })

        const resData = await res.text();

        if(resData === "ADDED")
        {
            alert("Registration successful, you can login");
            navigate("/v-login");
        }
        else
        {
            alert(resData);
        }
    }

    return(
        <div className="v-outer">
            <div className="v-inner">
                <h4 className="v-header">VENDOR REGISTRATION</h4>
                <div className="v-scroll">
                    <label htmlFor="name">Vendor name:</label> <br />
                    <input onChange={(e) => setName(e.target.value)} id="name" type="text" name="name" placeholder="Enter full name"/> 

                    <label htmlFor="mail">Email:</label> <br />
                    <input onChange={(e) => setMail(e.target.value)} id="mail" name="mail" type="email" placeholder="Enter email"/>

                    <label htmlFor="store">Store name:</label> <br />
                    <input onChange={(e) => setStoreName(e.target.value)} type="text" name="store" id="store" placeholder="Enter store name"/> 

                    <label htmlFor="mark">Landmark:</label> <br />
                    <input onChange={(e) => setLandmark(e.target.value)} type="text" name="mark" id="mark" placeholder="Enter landmark"/> <br />

                    <label htmlFor="city">City:</label> <br />
                    <input onChange={(e) => setCity(e.target.value)} type="text" name="city" id="city" placeholder="Enter city"/> 

                    <label htmlFor="state">State:</label> <br />
                    <input onChange={(e) => setState(e.target.value)} type="text" name="state" id="state" placeholder="Enter State"/>

                    <label htmlFor="pincode">Pincode:</label> <br />
                    <input min={1} onChange={(e) => setPincode(e.target.value)} type="number" name="pincode" id="pincode" placeholder="Enter pincode"/>

                    <label htmlFor="password">Password:</label> <br />
                    <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="Enter password"/>

                    <label htmlFor="cpassword">Confirm Password:</label> <br />
                    <input onChange={(e) => setCpassword(e.target.value)} type="password" name="cpassword" id="cpassword" placeholder="Confirm password"/>
                </div>
                <div className="v-login-link">
                    <p>Already Registered, then<button className="login-btn" onClick={() => {
                        navigate("/v-login");
                    }}>Login</button></p>
                </div>

                <div className="v-btns">
                    <button className="v-back" onClick={() => {
                        navigate("/types");
                    }}>Back</button>
                    <button className="v-sign-up" onClick={() => {
                        handleRegister();
                    }}>Sign up</button>
                </div>

                
            </div>
        </div>
    );
}