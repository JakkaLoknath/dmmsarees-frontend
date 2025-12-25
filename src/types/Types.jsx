import { useNavigate } from "react-router-dom";

export default function Types()
{
    const navigate = useNavigate();
    return(
        <div className="t-outer">
            <div className="t-inner">
                <div className="t-header">
                    <h4>SELECT SIGN IN TYPE</h4>
                </div>
                <button onClick={() => {
                    navigate("/a-login");
                }}>ADMIN</button> <br />

                <button onClick={() => {
                    navigate("/v-register");
                }}>VENDOR</button> <br />

                <button onClick={() => {
                    navigate("/u-register");
                }}>USER</button> <br />

                <div className="back-div">
                    <button onClick={() => {
                        navigate("/");
                    }}>BACK</button>
                </div>
            </div>
        </div>
    );
}