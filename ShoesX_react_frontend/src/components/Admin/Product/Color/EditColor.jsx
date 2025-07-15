import { useLocation, useNavigate } from 'react-router-dom';
import '../../../Assets/scss/category.css';
import React, { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

export function EditColor() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [color, setColor] = useState(state?.color);
    const [status, setStatus] = useState(state?.status);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = `${process.env.REACT_APP_URL}/edit-color/${state._id}`;

            const response = await axios.put(url, { color, status });
            console.log(response, 'put res');

            if (response.status === 200) {
                toast.success(response.data);
                setTimeout(() => {
                    navigate('/color');
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
                <h3>Edit Color</h3>
            </div>
            <div className='categroy-description'>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label className='category-brand'>Color</label>
                        <input
                            type='color'
                            className='add-category'
                            placeholder='Enter Color'
                            value={color}
                            name='Color'
                            required
                            onChange={(e) => setColor(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="category-brand">Select Status Flag</label>
                        <select
                            className="form-select shadow-none"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            required
                        >
                            <option value="1">Active</option>
                            <option value="0">Inactive</option>
                        </select>
                    </div>

                    <div className='d-flex gap-3 mt-4'>
                        <button type='submit' className='btn btn-primary'>Update Color</button>
                        <button type="button" className='btn btn-secondary' onClick={() => navigate('/color')}>Cancel</button>
                    </div>
                </form>
                <ToastContainer />
            </div>
        </>
    );
}