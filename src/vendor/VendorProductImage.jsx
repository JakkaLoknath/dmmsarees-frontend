import { useNavigate } from "react-router-dom";

export default function VendoProductImage()
{
    const navigate = useNavigate();
    const id = JSON.parse(localStorage.getItem("vdb-image"));
    return(
        <div className="vdb-image-outer">
            <div className="vdb-image-inner">
                <img src={`https://dmmsarees-backend.onrender.com/getimage/${id}`}/>
                <button onClick={() => {
                        navigate("/vdb");
                    }} className="vdb-image-photo">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
                </button>
            </div>
        </div>
    );
}