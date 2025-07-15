import { useNavigate } from 'react-router-dom';
import '../../../../Assets/scss/category.css';
import React, { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'

export function AddCategory() {
    const navigate = useNavigate();

    const [category, setCategory] = useState();
    const [status, setStatus] = useState(1);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const url = `${import.meta.env.VITE_REACT_APP_URL}/add-category`;

            const response = await axios.post(url, { category, status });
            console.log(response, 'res');

            if (response.status === 200) {
                toast.success(response.data);
                setTimeout(() => {
                    navigate("/product/category");
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
                <h3>Add Category</h3>
            </div>
            <div className='categroy-description'>
                <form onSubmit={handleSubmit}>
                    <div className=''>
                        <div>
                            <label htmlFor='addCategory' className='category-brand'>
                                Category <span className='star'>*</span>
                            </label>
                            <input
                                type="text"
                                id='addCategory'
                                className='add-category'
                                placeholder="Enter The Category Name"
                                onChange={(e) => setCategory(e.target.value)}
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
                            <option value="0">InActive</option>
                        </select>
                    </div>

                    <div className='d-flex gap-3 mt-4'>
                        <button type='submit' className='btn btn-primary'>Add Category</button>
                        <button type="button" className='btn btn-secondary' onClick={() => navigate("/product/category")}>Cancel</button>
                    </div>
                </form>

                <ToastContainer />
            </div>
        </>
    );
}