import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../../Assets/scss/category.css";
import Select from "react-select";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useEffect } from "react";

export function AddBrand() {
    const navigate = useNavigate();

    const [brand, setBrand] = useState();
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [status, setStatus] = useState();
    const [image, setImage] = useState();
    const [showImg, setShowImg] = useState(true);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const url = 'http://localhost:8080/api/add-brand';
            const formData = new FormData();

            formData.append('brand', brand);
            formData.append('status', status ?? 1);
            formData.append('image', image);
            selectedCategories.forEach((catId) => {
                formData.append('categories[]', catId); // Proper array appending
            });

            const response = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            console.log(response, 'brand');


            if (response.status === 200) {
                toast.success(response.data);
                setTimeout(() => {
                    navigate('/product/brand');
                }, 1500)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message);
        }
    }

    const handleCategory = async () => {
        try {
            const url = 'http://localhost:8080/api/category';

            const response = await axios.get(url);
            console.log(response.data, 'get res');

            if (response?.data?.status === true) {
                const formattedCategories = response.data.categories
                    .filter(cat => cat.status === 1) // Optional: filter active ones
                    .map(cat => ({
                        value: cat._id,
                        label: cat.category
                    }));
                setCategories(formattedCategories);
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        handleCategory();
    }, [])

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreviewUrl(URL.createObjectURL(file));
            setShowImg(true);
        }
    };

    const clearSelectedImage = () => {
        setImage(null);
        setPreviewUrl(null);
        setShowImg(false);
    };



    return (
        <>
            <div className='product-head'>
                <h3>Add Brand</h3>
            </div>
            <div className="categroy-description">
                <form onSubmit={handleSubmit}>
                    <div>
                        <label className="category-brand">Brand Name</label>
                        <input
                            type="text"
                            className="add-category"
                            placeholder="Enter the Brand Name"
                            onChange={(e) => setBrand(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="category-brand">Select Categories</label>
                        <Select
                            className="add-category"
                            options={categories}
                            value={categories.filter(option => selectedCategories.includes(option.value))}
                            onChange={(selectedOptions) =>
                                setSelectedCategories(selectedOptions.map(option => option.value))
                            }
                            isMulti
                            closeMenuOnSelect={false}
                            placeholder="Select categories"
                            required
                        />
                    </div>

                    <div>
                        <label className="category-brand">Status</label>
                        <select
                            className="form-select shadow-none"
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="1">Active</option>
                            <option value="0">Inactive</option>
                        </select>
                    </div>

                    <div>
                        <label className="category-brand">Brand Image</label>
                        <input
                            type="file"
                            id="brandImageInput"
                            className="add-category"
                            onChange={handleImageChange}
                            required
                        />
                        <div className="mt-2">
                            <label className="ms-2"></label>
                            {previewUrl && showImg && (
                                <div className="mt-2 position-relative" style={{ display: 'inline-block' }}>
                                    <img
                                        src={previewUrl}
                                        alt="Brand Preview"
                                        style={{
                                            maxWidth: '200px',
                                            maxHeight: '200px',
                                            border: '1px solid #ddd',
                                            borderRadius: '4px'
                                        }}
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-sm btn-danger position-absolute"
                                        style={{ top: '5px', right: '5px' }}
                                        onClick={clearSelectedImage}
                                    >
                                        ×
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="d-flex gap-3 mt-4">
                        <button type="submit" className="btn btn-primary">
                            Add Brand
                        </button>
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => navigate("/product/brand")}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </>
    );
}