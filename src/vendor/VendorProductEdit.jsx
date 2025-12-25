import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function VendorProductEdit()
{
    const vendorProductEdit = JSON.parse(localStorage.getItem("vendorProductEdit"));
    const vendor = JSON.parse(localStorage.getItem("vendor"));

    const[sareename, setSareeName] = useState(vendorProductEdit.sareeName);
    const[weavername, setWeaverName] = useState(vendorProductEdit.weaverName);
    const[weaverphone, setWeaverPhone] = useState(vendorProductEdit.weaverPhone);
    const[material, setMaterial] = useState(vendorProductEdit.material);
    const[color, setColor] = useState(vendorProductEdit.color);
    const[price, setPrice] = useState(vendorProductEdit.price);
    const[stock, setStock] = useState(vendorProductEdit.stock);
    const[description, setDescription] = useState(vendorProductEdit.description);

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

        const formData = new FormData();
        formData.append("id", vendorProductEdit.id)
        formData.append("sareename", sareename);
        formData.append("weavername", weavername);
        formData.append("weaverphone", weaverphone);
        formData.append("material", material);
        formData.append("color", color);
        formData.append("price", price);
        formData.append("stock", stock);
        formData.append("description", description);

        const res = await fetch("https://dmmsarees-backend.onrender.com/updateproduct", {
            method : "POST",
            body : formData
        })

        if(res.ok)
        {
            alert("Product Updated");
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
                <h4 className="vpf-header">UPDARE SAREE DETAILS</h4>
                <div className="vpf-form">
                    <label htmlFor="sareename">Saree name:</label> <br />
                    <input value={sareename} onChange={e => setSareeName(e.target.value)} id="sareename" name="sareename" type="text" placeholder="Enter saree name"/>

                    <label htmlFor="weavername">Weaver name:</label> <br />
                    <input value={weavername} onChange={e => setWeaverName(e.target.value)}  id="weavername" name="weavername" type="text" placeholder="Enter weaver name"/>

                    <label htmlFor="weaverphone">Weaver Phone:</label> <br />
                    <input value={weaverphone} onChange={e => setWeaverPhone(e.target.value)}  id="weaverphone" name="weaverphone" type="number" placeholder="Enter weaver phone number"/>

                    <label htmlFor="material">Material:</label> <br />
                    <input value={material} onChange={e => setMaterial(e.target.value)}  id="material" name="material" type="text" placeholder="Enter material (Silk etc)"/>

                    <label htmlFor="color">Color:</label> <br />
                    <input value={color} onChange={e => setColor(e.target.value)}  type="text" id="color" name="color" placeholder="Enter color"/>

                    <label htmlFor="price">Price:</label> <br />
                    <input value={price} onChange={e => setPrice(e.target.value)}  type="number" id="price" name="price" placeholder="Enter price"/>

                    <label htmlFor="stock">Stock:</label> <br />
                    <input value={stock} onChange={e => setStock(e.target.value)}  type="number" id="stock" name="stock" placeholder="Enter stock quantity"/>

                    <label htmlFor="description">Description:</label> <br />
                    <input value={description} onChange={e => setDescription(e.target.value)}  type="text" id="description" name="description" placeholder="Enter description"/>
                </div>
                <div className="vpf-btns">
                    <button className="vpf-back-btn" onClick={() => {
                        navigate("/vdb");
                    }}>Back</button>
                    <button className="vpf-add-btn" onClick={() => {
                        handleAdd();
                    }}>Update</button>
                </div>
            </div>
        </div>
    );
}