import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../Assets/scss/product.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useEffect } from "react";

function AddProduct() {
    const navigate = useNavigate();

    const [name, setName] = useState();
    const [sku, setSku] = useState();
    const [brand, setBrand] = useState();
    // const [category, setCategory] = useState();
    const [price, setPrice] = useState();
    const [discount, setDiscount] = useState();
    const [status, setStatus] = useState(1);
    // const [selectCategory, setSelectCategory] = useState();
    const [selectBrand, setselectBrand] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const url = `${import.meta.env.VITE_REACT_APP_URL}/add-product`;

            const response = await axios.post(url, { name, sku, brand, price, discount, status });
            console.log(response, 'res');

            if (response.status === 200) {
                toast.success(response.data);
                setTimeout(() => {
                    navigate("/product");
                }, 1500)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data);
        }
    }

    // const handleCategory = async () => {
    //     try {
    //         const url = 'http://localhost:8080/api/category';
    //         const response = await axios.get(url);

    //         console.log(response, 'product category');


    //         if (response?.data?.status === true) {

    //             const activeCategories = response.data.categories.filter((category) => category.status === 1);

    //             setSelectCategory(activeCategories);
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    const handleBrand = async () => {
        try {
            const url = `${import.meta.env.VITE_REACT_APP_URL}/get-brand`;
            const response = await axios.get(url);

            console.log(response, 'product brand');


            if (response?.data?.status === true) {
                const activeBrands = response.data.brand.filter((brand) => brand.status === 1);
                setselectBrand(activeBrands);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        // handleCategory();
        handleBrand();
    }, [])



    return (
        <>
            <div className='product-head'>
                <h3>Add Product</h3>
            </div>
            <div className='product-body body-bg'>
                <form onSubmit={handleSubmit}>
                    <div className='row'>
                        <div className='col-md-6'>
                            <div className='mb-3'>
                                <label htmlFor='name' className='form-label'>Product Name *</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    id='name'
                                    required
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className='mb-3'>
                                <label htmlFor='sku' className='form-label'>SKU *</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    id='sku'
                                    required
                                    onChange={(e) => setSku(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        {/* <div className='col-md-6'>
                            <div className='mb-3'>
                                <label htmlFor='categoryId' className='form-label'>Category *</label>
                                <select
                                    className='form-select'
                                    required
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                    <option value="">Select Category</option>
                                    {
                                        selectCategory?.map((item) => (
                                            <option key={item._id} value={item._id}>
                                                {item.category}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div> */}
                        <div className='col-md-6'>
                            <div className='mb-3'>
                                <label htmlFor='brandId' className='form-label'>Brand *</label>
                                <select
                                    className='form-select'
                                    required
                                    onChange={(e) => setBrand(e.target.value)}
                                >
                                    <option value="">Select Brand</option>
                                    {
                                        selectBrand?.map((item) => (
                                            <option key={item._id} value={item._id}>{item.brand}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-md-6'>
                            <div className='mb-3'>
                                <label htmlFor='price' className='form-label'>Price *</label>
                                <input
                                    type='number'
                                    className='form-control'
                                    id='price'
                                    min="0"
                                    step="0.01"
                                    required
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className='mb-3'>
                                <label htmlFor='discount' className='form-label'>Discount (%)</label>
                                <input
                                    type='number'
                                    className='form-control'
                                    id='discount'
                                    min="0"
                                    max="100"
                                    onChange={(e) => setDiscount(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className='mb-3'>
                        <label htmlFor='statusFlag' className='form-label'>Status</label>
                        <select
                            className='form-select'
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="1">Active</option>
                            <option value="0">Inactive</option>
                        </select>
                    </div>

                    <div className='d-flex gap-3 mt-4'>
                        <button type='submit' className='btn btn-primary'>
                            Add Product
                        </button>
                        <button
                            type='button'
                            className='btn btn-secondary'
                            onClick={() => navigate("/product")}
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

export default AddProduct;