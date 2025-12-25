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

        const admin = {
            mail : mail,
            password : password
        }

        const res = await fetch("https://dmmsarees-backend.onrender.com/getadmin", {
            method : "POST",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify(admin)
        })

        const data = await res.text();

        if(data !== "")
        {
            const userData = await JSON.parse(data);
            localStorage.setItem("admin", JSON.stringify(userData));
            navigate("/adb");
        }
        else
        {
            alert("Invalid credentials");
        }
    }

    return(
        <div className="a-outer">
            <div className="a-inner">
                <h4 className="a-header">ADMIN LOGIN</h4>

                <label htmlFor="mail">Email:</label> <br />
                <input onChange={(e) => setMail(e.target.value)} id="mail" name="mail" type="email" placeholder="Enter email"/>

                <label htmlFor="password">Password:</label> <br />
                <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="Enter password"/>

                <div className="a-btns">
                    <button className="a-back" onClick={() => {
                        navigate("/types");
                    }}>Back</button>
                    <button className="a-sign-in" onClick={() => {
                        handleLogin();
                    }}>Sign in</button>
                </div>
                
            </div>
        </div>
    );
}