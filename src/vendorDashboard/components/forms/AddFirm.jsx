import React, { useState } from 'react'
import { API_URL } from '../../data/apiPath'

const AddFirm = () => {
    const [firmname, setFirmName] = useState("");
    const [area, setArea] = useState("")
    const [category, setCategory] = useState([]);
    const [region, setRegion] = useState([]);
    const [offer, setOffer] = useState("");
    const [file, setFile] = useState(null);

    const handleCategoryChange = (event) => {
        const value = event.target.value;
        if (category.includes(value)) {
            setCategory(category.filter((item) => item !== value))

        }
        else {
            setCategory([...category, value])
        }
    }
    const handleRegionChange = (event) => {
        const value = event.target.value;
        if (region.includes(value)) {
            setRegion(region.filter((item) => item !== value))

        }
        else {
            setRegion([...region, value])
        }
    }

    const handleImageUpload = (event) => {
        const selectedImage = event.target.files[0];
        setFile(selectedImage)
    }

    const handleFirmSubmit = async (e) => {
        e.preventDefault();
        try {
            const loginToken = localStorage.getItem('loginToken')
            if (!loginToken) {
                console.error("user not authenticated")
            }
            const formData = new FormData();
            formData.append('firmName', firmname);
            formData.append('area', area);
            formData.append('offer', offer);
            formData.append('image', file)

            category.forEach((value) => {
                formData.append('category', value)
            });

            region.forEach((value) => {
                formData.append('region', value)
            });

            const response = await fetch(`${API_URL}/firm/add-firm`, {
                method: "POST",
                headers: {
                    'token': `${loginToken}`
                },
                body: formData
            })
            const data = await response.json()
            if (response.ok) {
                console.log("data", data)
                alert("Firm added successfully")
                setFirmName("")
                setArea("")
                setCategory([]);
                setRegion([])
                setOffer("");
                setFile(null)
                alert("Firm Added Successfully")
            }
            else if(data.message === "Vendor can have only one Firm"){
                alert("Firm Exists 🥗. nly 1 Firm can be added")
            }
            else{
                alert("Failed to add Firm")
            }
            console.log("This is Firm Id",data.firmId);
            
            const firmId = data.firmId;
            localStorage.setItem('firmId',firmId)
        }
        catch (error) {
            console.error("Failed to add Firm")

        }
    }

    return (
        <div className="firmSection">
            <form className="tableForm" onSubmit={handleFirmSubmit}>
                <h3>Add Firm</h3>
                <label>FirmName</label>
                <input type="text" name='firmName' placeholder='Enter Firm Name' value={firmname} onChange={(e) => setFirmName(e.target.value)} />
                <label>Area</label>
                <input type="text" name='area' placeholder='Enter Area' value={area} onChange={(e) => setArea(e.target.value)} />

                <div className="checkInp">
                    <label>Category</label>
                    <div className="inputsContainer">
                        <div className="checboxContainer">
                            <label>Veg</label>
                            <input type="checkbox" value="veg" checked={category.includes('veg')} onChange={handleCategoryChange} />
                        </div>
                        <div className="checboxContainer">
                            <label>Non-Veg</label>
                            <input type="checkbox" value="non-veg" checked={category.includes('non-veg')} onChange={handleCategoryChange} />
                        </div>
                    </div>

                </div>
                <label>Offer</label>
                <input type="text" name="offer" placeholder='Enter Firm Name' value={offer} onChange={(e) => setOffer(e.target.value)} />

                <div className="checkInp">
                    <label>Region</label>
                    <div className="inputsContainer">
                        <div className="regBoxContainer">
                            <label>South Indian</label>
                            <input type="checkbox" value="south-indian" checked={region.includes('south-indian')} onChange={handleRegionChange} />
                        </div>
                        <div className="regBoxContainer">
                            <label>North Indian</label>
                            <input type="checkbox" value="north-indian" checked={region.includes('north-indian')} onChange={handleRegionChange} />
                        </div>
                        <div className="regBoxContainer">
                            <label>Chinese</label>
                            <input type="checkbox" value="chinese" checked={region.includes('chinese')} onChange={handleRegionChange} />
                        </div>
                        <div className="regBoxContainer">
                            <label>Bakery</label>
                            <input type="checkbox" value="bakery" checked={region.includes('bakery')} onChange={handleRegionChange} />
                        </div>
                    </div>

                </div>

                <label>Firm Image</label>
                <input type="file" onChange={handleImageUpload} />

                <div className="btnSubmit">
                    <button type='submit' >Submit</button>
                </div>


            </form>
        </div>
    )
}

export default AddFirm
