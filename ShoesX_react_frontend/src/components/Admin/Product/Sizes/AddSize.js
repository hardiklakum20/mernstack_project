import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

export function AddSize() {
    const navigate = useNavigate();

    const [size, setSize] = useState();
    const [status, setStatus] = useState(1);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const url = `${process.env.REACT_APP_URL}/add-size`;

            const response = await axios.post(url, { size, status });
            console.log(response);

            if (response.status === 200) {
                toast.success(response.data);
                setTimeout(() => {
                    navigate('/product/size');
                }, 1500)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message);
        }
    }

    return (
        <>
            <div className='product-head'>
                <h3>Add Size</h3>
            </div>
            <div className='categroy-description'>
                <form onSubmit={handleSubmit}>
                    <div>
                        <div>
                            <label className='category-brand'>Size</label>
                            <div>
                                <input
                                    type='text'
                                    className='add-category'
                                    placeholder='Enter Size'
                                    name='Size'
                                    onChange={(e) => setSize(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="category-brand">Select Status Flag</label>
                            <select
                                className="form-select shadow-none"
                                onChange={(e) => setStatus(e.target.value)}
                                required
                            >
                                <option value="1">Active</option>
                                <option value="0">Inactive</option>
                            </select>
                        </div>

                        <div className='d-flex gap-3 mt-4'>
                            <button type='submit' className='btn btn-primary'>
                                Add Size
                            </button>
                            <button type="button" className='btn btn-secondary' onClick={() => navigate('/product/size')}>Cancel</button>
                        </div>
                    </div>
                </form>
                <ToastContainer />
            </div>
        </>
    );
}