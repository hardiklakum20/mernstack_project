import { useNavigate, useLocation } from 'react-router-dom';
import '../../../Assets/scss/category.css';
import React from "react";
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';

export function Size() {
    const navigate = useNavigate();

    const [size, setSize] = useState();
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [sizeFilter, setSizeFilter] = useState('');

    const fetchSize = async () => {
        try {
            const url = `${process.env.REACT_APP_URL}/get-size`;
            const response = await axios.get(url);
            console.log(response);

            if (response?.data?.status === true) {
                setSize(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchSize();
    }, [])

    const handleDelete = async (id) => {
        try {
            const url = `${process.env.REACT_APP_URL}/delete-size/${id}`;

            const response = await axios.delete(url);
            console.log(response, 'delete res');
            toast.success(response.data);

            if (response.status === 200) {
                fetchSize();
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data);
        }
    }

    const filterSize = size?.size?.filter((item) => {
        const matchSearch = String(item.size)
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchStatus =
            statusFilter === "" || String(item.status) === statusFilter;

        const matchSize =
            sizeFilter === "" || String(item.size) === sizeFilter;

        return matchSearch && matchStatus && matchSize;
    });

    return (
        <>
            <div className='product-head'>
                <h3>Size</h3>
                <button className='btn' id='add-category-btn' onClick={() => navigate('/add-size')}>Add Size</button>
            </div>
            <div className='product-body body-bg'>
                {/* Static Filter Section */}
                <div className='row'>
                    <div className="col-lg-3 col-md-6 mt-md-0">
                        <div className='input-div'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="gray" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8" />
                                <line x1="16" y1="16" x2="22" y2="22" />
                            </svg>
                            <input
                                placeholder="Search Size"
                                type="text"
                                className="form-control"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 mt-md-0 mt-3">
                        <select className="form-select" onChange={(e) => setStatusFilter(e.target.value)}>
                            <option value="">All Status</option>
                            <option value="1">Active</option>
                            <option value="0">Inactive</option>
                        </select>
                    </div>
                    <div className="col-lg-3 col-md-6 mt-lg-0 mt-md-3 mt-3">
                        <select className="form-select" onChange={(e) => setSizeFilter(e.target.value)}>
                            <option value="">All Sizes</option>
                            {
                                size?.size?.map((item) => (
                                    <option key={item.id}>{item.size}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>

                <div className='product-table table-responsive-xxl'>
                    <table className="table align-middle">
                        <thead>
                            <tr className="text-center">
                                <th>Index</th>
                                <th>Size Name</th>
                                <th>StatusFlag</th>
                                <th>Date</th>
                                <th>
                                    <span>Action</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                filterSize && filterSize.length > 0 ? (
                                    filterSize?.map((item, index) => (
                                        <tr className="text-center" key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.size}</td>
                                            <td>
                                                <div className="form-check form-switch d-flex justify-content-center">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        role="switch"
                                                        checked={item.status === 1}
                                                    />
                                                </div>
                                            </td>
                                            <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                                            <td>
                                                <div className="d-flex justify-content-center gap-3">
                                                    <i
                                                        className="fa-solid fa-pen pointer"
                                                        style={{ color: "#00A1FF", cursor: "pointer" }}
                                                        onClick={() => navigate('/edit-size', { state: item })}
                                                        title="Edit Size"
                                                    ></i>
                                                    <i
                                                        className="fa-solid fa-trash text-danger"
                                                        style={{ cursor: "pointer" }}
                                                        title="Delete Size"
                                                        onClick={() => handleDelete(item._id)}
                                                    ></i>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="text-center">No Data Found</td>
                                    </tr>
                                )
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}