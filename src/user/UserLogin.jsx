import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserLogin()
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

        const user = {
            mail : mail,
            password : password
        }

        const res = await fetch("https://dmmsarees-backend.onrender.com/getuser", {
            method : "POST",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify(user)
        })

        const data = await res.text();

        if(data !== "")
        {
            const userData = await JSON.parse(data);
            localStorage.setItem("user", JSON.stringify(userData));
            navigate("/udb");
        }
        else
        {
            alert("Invalid credentials");
        }
    }

    return(
        <div className="u-outer">
            <div className="u-inner">
                <h4 className="u-header">USER LOGIN</h4>


                <label htmlFor="mail">Email:</label> <br />
                <input onChange={(e) => setMail(e.target.value)} id="mail" name="mail" type="email" placeholder="Enter email"/>

                <label htmlFor="password">Password:</label> <br />
                <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="Enter password"/>

                <div className="u-login-link">
                    <p>Not Registered, then<button className="register-btn" onClick={() => {
                        navigate("/u-register");
                    }}>Register</button></p>
                </div>


                <div className="u-btns">
                    <button className="u-back" onClick={() => {
                        navigate("/u-register");
                    }}>Back</button>
                    <button className="u-sign-in" onClick={() => {
                        handleLogin();
                    }}>Sign in</button>
                </div>
            </div>
        </div>
    );
}