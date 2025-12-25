import { useNavigate } from "react-router-dom";

export default function HomeImage()
{
    const navigate = useNavigate();
    const id = JSON.parse(localStorage.getItem("home-image"));
    return(
        <div className="home-image-outer">
            <div className="home-image-inner">
                <img src={`https://dmmsarees-backend.onrender.com/getimage/${id}`}/>
                <button onClick={() => {
                        navigate("/");
                    }} className="home-image-photo">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
                </button>
            </div>
        </div>
    );
}