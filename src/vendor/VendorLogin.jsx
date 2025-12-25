import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function VendorRegister()
{
    const navigate = useNavigate();

    const[mail, setMail] = useState("");
    const[password, setPassword] = useState("");

    const handleLogin = async () => {

        if(!mail.trim() || !password.trim())
        {
            alert("Fill all fields")
            return;
        }

        const vendor = {
            mail : mail,
            password : password
        }

        const res = await fetch("https://dmmsarees-backend.onrender.com/getvendor", {
            method : "POST",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify(vendor)
        })
        const data = await res.text();
        if(data !== "")
        {
            const vendorData = await JSON.parse(data);
            localStorage.setItem("vendor", JSON.stringify(vendorData));
            navigate("/vdb");
        }
        else
        {
            alert("Invalid credentials");
        }
    }

    return(
        <div className="v-outer">
            <div className="v-inner">
                <h4 className="v-header">VENDOR LOGIN</h4>


                <label htmlFor="mail">Email:</label> <br />
                <input onChange={(e) => setMail(e.target.value)} id="mail" name="mail" type="email" placeholder="Enter email"/>

                <label htmlFor="password">Password:</label> <br />
                <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="Enter password"/>

                <div className="v-login-link">
                    <p>Not Registered, then<button className="register-btn" onClick={() => {
                        navigate("/v-register");
                    }}>Register</button></p>
                </div>


                <div className="v-btns">
                    <button className="v-back" onClick={() => {
                        navigate("/v-register");
                    }}>Back</button>
                    <button className="v-sign-in" onClick={() => {
                        handleLogin();
                    }}>Sign in</button>
                </div>

                
            </div>
        </div>
    );
}