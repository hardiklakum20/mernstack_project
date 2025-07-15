import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../../../../Assets/scss/category.css";
import Select from "react-select";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

export function EditBrand() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [image, setImage] = useState();
    const [showImg, setShowImg] = useState(true);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [brand, setBrand] = useState(state.brand);
    const [status, setStatus] = useState(state.status);

    const handleEdit = async (e) => {
        e.preventDefault();
        try {
            const url = `${process.env.REACT_APP_URL}/edit-brand/${state._id}`;
            const formData = new FormData();
            formData.append('brand', brand);
            formData.append('status', status);

            if (image) {
                formData.append("image", image);
            } else if (state?.image) {
                formData.append("existingImage", state.image);
            }
            selectedCategories.forEach(cat => {
                formData.append('categories[]', cat.value);
            });

            const response = await axios.put(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            if (response.status === 200) {
                toast.success(response.data);
                setTimeout(() => {
                    navigate('/product/brand');
                }, 1500)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data || "Something went wrong");
        }
    }

    const fetchCategories = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_URL}/category`);
            if (res.data.status === true) {
                const activeCategories = res.data.categories
                    .filter(cat => cat.status === 1)
                    .map(cat => ({
                        value: cat._id,
                        label: cat.category
                    }));
                setCategories(activeCategories);

                // Pre-select categories
                const selectedValues = Array.isArray(state?.categories)
                    ? state.categories.map(c => c.category) // assuming state.categories contains [{ _id, category }]
                    : [];

                const matched = activeCategories.filter(option =>
                    selectedValues.includes(option.label)
                );

                setSelectedCategories(matched);
            }
        } catch (err) {
            console.error(err);
            toast.error("Failed to load categories");
        }
    };


    useEffect(() => {
        fetchCategories();
        if (state?.image) {
            setPreviewUrl(`${process.env.REACT_APP_IMAGE}${state.image}`);
            setShowImg(true);
        }
    }, [state]);

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
                <h3>Edit Brand</h3>
            </div>

            <div className="categroy-description">
                <form onSubmit={handleEdit}>
                    <div>
                        <label className="category-brand">Brand Name</label>
                        <input
                            type="text"
                            value={brand}
                            className="add-category"
                            placeholder="Enter the Brand Name"
                            required
                            onChange={(e) => setBrand(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="category-brand">Select Categories</label>
                        <Select
                            className="add-category"
                            options={categories}
                            value={selectedCategories}
                            onChange={setSelectedCategories}
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
                            value={status}
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
                        />
                        <div className="mt-2">
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

                    <div className="d-flex justify-content-end mt-3 gap-3">
                        <button type="submit" className="btn default-btn">Update</button>
                        <button type="button" className='btn btn-closes' onClick={() => navigate("/product/brand")}>Cancel</button>
                    </div>

                </form>
                <ToastContainer />
            </div>
        </>
    );
}
