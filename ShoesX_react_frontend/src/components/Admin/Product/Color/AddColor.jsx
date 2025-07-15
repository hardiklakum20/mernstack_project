import { useNavigate } from 'react-router-dom';
import '../../../Assets/scss/category.css';
import React, { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'

export function AddColor() {
    const navigate = useNavigate();

    const [color, setColor] = useState('');
    const [status, setStatus] = useState(1);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const url = 'http://localhost:8080/api/add-color';

            const response = await axios.post(url, { color, status });
            console.log(response);

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
                <h3>Add Color</h3>
            </div>
            <div className='categroy-description'>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label className='category-brand'>Color</label>
                        <input
                            type='color'
                            className='form-control'
                            placeholder='Enter Color'
                            name='Color'
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                            required
                        />
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
                        <button type='submit' className='btn btn-primary'>Add Color</button>
                        <button type="button" className='btn btn-secondary' onClick={() => navigate('/color')}>Cancel</button>
                    </div>
                </form>
                <ToastContainer />
            </div>
        </>
    );
}