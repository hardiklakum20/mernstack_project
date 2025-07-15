import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import '../../Assets/scss/product.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

function EditProduct() {
    const navigate = useNavigate();
    const { state } = useLocation();

    console.log(state, 'edit state');


    const [name, setName] = useState(state.name);
    const [sku, setSku] = useState(state.sku);
    const [price, setPrice] = useState(state.price);
    const [discount, setDiscount] = useState(state.discount);
    const [brand, setBrand] = useState(state.brand?._id);
    const [status, setStatus] = useState(state.status);
    const [selectBrand, setselectBrand] = useState();

    const handleBrand = async () => {
        try {
            const url = `${process.env.REACT_APP_URL}/get-brand`;
            const response = await axios.get(url);

            if (response?.data?.status === true) {
                const activeBrands = response.data.brand.filter((brand) => brand.status === 1);
                setselectBrand(activeBrands);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        handleBrand();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const url = `${process.env.REACT_APP_URL}/edit-product/${state._id}`;

            const response = await axios.put(url, { name, sku, price, discount, brand, status });
            if (response.status === 200) {
                toast.success(response.data);
                setTimeout(() => {
                    navigate('/product');
                }, 1500)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data);
        }
    }

    return (
        <>
            <div className='product-head'>
                <h3>Edit Product</h3>
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
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
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
                                    value={sku}
                                    onChange={(e) => setSku(e.target.value)}
                                    required
                                />
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
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    required
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
                                    value={discount}
                                    onChange={(e) => setDiscount(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-md-6'>
                            <div className='mb-3'>
                                <label htmlFor='brandId' className='form-label'>Brand *</label>
                                <select
                                    className='form-select'
                                    required
                                    value={brand}
                                    onChange={(e) => setBrand(e.target.value)}
                                >
                                    <option value="">Select Brand</option>
                                    {
                                        selectBrand?.map((brand) => (
                                            <option key={brand._id} value={brand._id}>{brand.brand}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* <div className='mb-3'>
                        <label htmlFor='image' className='form-label'>Product Image</label>
                        <input
                            type='file'
                            className='form-control'
                            onChange={handleImageChange}
                            accept='image/*'
                        />
                    </div> */}

                    <div className='mb-3'>
                        <label htmlFor='statusFlag' className='form-label'>Status</label>
                        <select
                            className='form-select'
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="1">Active</option>
                            <option value="0">Inactive</option>
                        </select>
                    </div>

                    <div className='d-flex gap-3 mt-4'>
                        <button type='submit' className='btn btn-primary'>
                            Update Product
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

export default EditProduct;