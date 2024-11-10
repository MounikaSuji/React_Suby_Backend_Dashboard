import React, { useState } from 'react'
import { API_URL } from '../../data/apiPath'

const AddProduct = () => {
    const [productName, setProductName] = useState("");
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState([]);
    const [bestSeller, setBestSeller] = useState(false);
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

    const handleBestSeller = (event) => {
        const value = event.target.value === 'true'
        setBestSeller(value)

    }

    const handleImageUpload = (event) => {
        const selectedImage = event.target.files[0];
        setFile(selectedImage)
    }

    const handleAddProduct = async (e) => {
        e.preventDefault()
        try {
            const loginToken = localStorage.getItem('loginToken')
            const firmId = localStorage.getItem('firmId')

            if (!loginToken || !firmId) {
                console.error("user not authenticated")
            }

            const formData = new FormData();
            formData.append('productName', productName);
            formData.append('price', price);
            formData.append('description', description);
            formData.append('image', file)
            formData.append('bestSeller',bestSeller)
            category.forEach((value) => {
                formData.append('category', value)
            });

            
            const response = await fetch(`${API_URL}/product/add-product/${firmId}`, {
                method: "POST",
                body: formData
            })
            const data = await response.json();
            if (response.ok) {
                console.log("data", data)
                alert("Product added successfully")
                setProductName("")
                setPrice("")
                setCategory([]);
                setBestSeller(false)
                setDescription("")
                setFile(null)
            }

        } catch (error) {
              console.error(error);
            alert("Failed to Add Product")

        }

    }



    return (
        <div className="firmSection">
            <form className="tableForm" onSubmit={handleAddProduct}>
                <h3>Add Product</h3>
                <label>ProductName</label>
                <input type="text" placeholder='Enter Product Name' value={productName} onChange={(e) => setProductName(e.target.value)} />
                <label>Price</label>
                <input type="text" placeholder='Enter Price' value={price} onChange={(e) => setPrice(e.target.value)} />
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
                <label>Description</label>
                <input type="text" placeholder='Enter Description' value={description} onChange={(e) => setDescription(e.target.value)} />
                <div className="checkInp">
                    <label>Best Seller</label>
                    <div className="inputsContainer">
                        <div className="checboxContainer">
                            <label>Yes</label>
                            <input type="radio" value="true" onChange={handleBestSeller} checked={bestSeller === true} />
                        </div>
                        <div className="checboxContainer">
                            <label>No</label>
                            <input type="radio" value="false" onChange={handleBestSeller} checked={bestSeller === false} />
                        </div>
                    </div>

                </div>

                <label>Product Image</label>
                <input type="file" onChange={handleImageUpload} />

                <div className="btnSubmit">
                    <button type='submit'>Submit</button>
                </div>


            </form>
        </div>
    )
}

export default AddProduct
