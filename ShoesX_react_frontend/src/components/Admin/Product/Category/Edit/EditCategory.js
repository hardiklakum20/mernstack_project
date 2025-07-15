import { useLocation, useNavigate } from 'react-router-dom';
import '../../../../Assets/scss/category.css';
import { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

export function EditCategory() {
    const navigate = useNavigate();
    const { state } = useLocation();

    const [category, setCategory] = useState(state.category || '');
    const [status, setStatus] = useState(state.status || '1');

    const handleEdit = async (e) => {
        e.preventDefault();
        try {
            const url = `${process.env.REACT_APP_URL}/update-category/${state._id}`;

            const response = await axios.put(url, { category, status });
            console.log(response, 'put res');

            if (response.status === 200) {
                toast.success(response.data);
                setTimeout(() => {
                    navigate('/product/category');
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
                <h3>Edit Category</h3>
            </div>
            <div className='categroy-description'>
                <form onSubmit={handleEdit}>
                    <div className=''>
                        <div>
                            <label htmlFor='editCategory' className='category-brand'>
                                Category <span className='star'>*</span>
                            </label>
                            <input
                                type="text"
                                id='editCategory'
                                className='add-category'
                                placeholder="Enter The Category Name"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                required
                            />
                        </div>
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
                            <option value="0">InActive</option>
                        </select>
                    </div>
                    <div className='d-flex gap-3 mt-4'>
                        <button type='submit' className='btn btn-primary'>Update Category</button>
                        <button type="button" className='btn btn-secondary' onClick={() => navigate("/product/category")}>Cancel</button>
                    </div>
                </form>
                <ToastContainer />
            </div>
        </>
    );
}
