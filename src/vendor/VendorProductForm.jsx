import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function VendorProductForm()
{
    const vendor = JSON.parse(localStorage.getItem("vendor"));

    const[sareename, setSareeName] = useState("");
    const[weavername, setWeaverName] = useState("");
    const[weaverphone, setWeaverPhone] = useState(0);
    const[material, setMaterial] = useState("");
    const[color, setColor] = useState("");
    const[price, setPrice] = useState(0);
    const[stock, setStock] = useState(0);
    const[description, setDescription] = useState("");
    const[image, setImage] = useState(null);
    const vendorid = vendor.id;

    const navigate = useNavigate();

    const handleAdd = async () => {
        if(!sareename || !weavername || !material || !color || !description)
        {
            alert("Fill all fields");
            return;
        }
        if(weaverphone < 1000000000)
        {
            alert("Phone number must contain 10 digits");
            return;
        }
        if(price <= 0)
        {
            alert("Price cant be zero or less than zero");
            return;
        }
        if(stock <=0 )
        {
            alert("Stock quantity must be gareater than 0");
            return;
        }

        if(image === null)
        {
            alert("Must upload image");
            return;
        }

        const formData = new FormData();
        formData.append("sareename", sareename);
        formData.append("weavername", weavername);
        formData.append("weaverphone", weaverphone);
        formData.append("material", material);
        formData.append("color", color);
        formData.append("price", price);
        formData.append("stock", stock);
        formData.append("description", description);
        formData.append("image", image);
        formData.append("vendorid", vendorid);

        const res = await fetch("https://dmmsarees-backend.onrender.com/addproduct", {
            method : "POST",
            body : formData
        })

        if(res.ok)
        {
            alert("Product added");
            navigate("/vdb");
            return;
        }
        else
        {
            alert("Something went wrong");
            return;
        }
    }

    return(
        <div className="vpf-outer">
            <div className="vpf-inner">
                <h4 className="vpf-header">NEW SAREE FORM</h4>
                <div className="vpf-form">
                    <label htmlFor="sareename">Saree name:</label> <br />
                    <input onChange={e => setSareeName(e.target.value)} id="sareename" name="sareename" type="text" placeholder="Enter saree name"/>

                    <label htmlFor="weavername">Weaver name:</label> <br />
                    <input onChange={e => setWeaverName(e.target.value)}  id="weavername" name="weavername" type="text" placeholder="Enter weaver name"/>

                    <label htmlFor="weaverphone">Weaver Phone:</label> <br />
                    <input onChange={e => setWeaverPhone(e.target.value)}  id="weaverphone" name="weaverphone" type="number" placeholder="Enter weaver phone number"/>

                    <label htmlFor="material">Material:</label> <br />
                    <input onChange={e => setMaterial(e.target.value)}  id="material" name="material" type="text" placeholder="Enter material (Silk etc)"/>

                    <label htmlFor="color">Color:</label> <br />
                    <input onChange={e => setColor(e.target.value)}  type="text" id="color" name="color" placeholder="Enter color"/>

                    <label htmlFor="price">Price:</label> <br />
                    <input onChange={e => setPrice(e.target.value)}  type="number" id="price" name="price" placeholder="Enter price"/>

                    <label htmlFor="stock">Stock:</label> <br />
                    <input onChange={e => setStock(e.target.value)}  type="number" id="stock" name="stock" placeholder="Enter stock quantity"/>

                    <label htmlFor="description">Description:</label> <br />
                    <input onChange={e => setDescription(e.target.value)}  type="text" id="description" name="description" placeholder="Enter description"/>

                    <label htmlFor="image">Upload Image</label> <br />
                    <input onChange={e => setImage(e.target.files[0])}  className="img" type="file" id="image" name="image" accept="image/*"/>
                </div>
                <div className="vpf-btns">
                    <button className="vpf-back-btn" onClick={() => {
                        navigate("/vdb");
                    }}>Back</button>
                    <button className="vpf-add-btn" onClick={() => {
                        handleAdd();
                    }}>Add Saree</button>
                </div>
            </div>
        </div>
    );
}