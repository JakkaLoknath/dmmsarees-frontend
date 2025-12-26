import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserRegister()
{
    const navigate = useNavigate();

    const[name, setName] = useState("");
    const[mail, setMail] = useState("");
    const[landmark, setLandmark] = useState("");
    const[city, setCity] = useState("");
    const[state, setState] = useState("");
    const[pincode, setPincode] = useState(0);
    const[password, setPassword] = useState("");
    const[cpassword, setCpassword] = useState("");

    const handleRegister = async () => {

        if(!name.trim() || !mail.trim() || !landmark.trim() || !city.trim() || !state.trim() || !password.trim() || !cpassword.trim())
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

        const newUser = {
            name : name,
            mail : mail,
            landmark : landmark,
            city : city,
            state : state,
            pincode : pincode,
            password : password
        }

        const res = await fetch("https://dmmsarees-backend.onrender.com/newuser", {
            method : "POST",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify(newUser)
        })

        const resData = await res.text();
        if(resData === "ADDED")
        {
            alert("Registration successful, you can login");
            navigate("/u-login");
        }
        else
        {
            alert(resData);
        }
    }

    return(
        <div className="u-outer">
            <div className="u-inner">
                <h4 className="u-header">USER REGISTRATION</h4>
                <div className="u-scroll">
                    <label htmlFor="name">User name:</label> <br />
                    <input onChange={(e) => setName(e.target.value)} id="name" type="text" name="name" placeholder="Enter full name"/> 

                    <label htmlFor="mail">Email:</label> <br />
                    <input onChange={(e) => setMail(e.target.value)} id="mail" name="mail" type="email" placeholder="Enter email"/>

                    <label htmlFor="mark">Landmark:</label> <br />
                    <input onChange={(e) => setLandmark(e.target.value)} type="text" name="mark" id="mark" placeholder="Enter landmark"/> 

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
                <div className="u-login-link">
                    <p>Already Registered, then<button className="login-btn" onClick={() => {
                        navigate("/u-login");
                    }}>Login</button></p>
                </div>

                <div className="u-btns">
                    <button className="u-back" onClick={() => {
                        navigate("/types");
                    }}>Back</button>
                    <button className="u-sign-up" onClick={() => {
                        handleRegister();
                    }}>Sign up</button>
                </div>
            </div>
        </div>
    );
}