import { useNavigate, useLocation } from 'react-router-dom';
import '../../../Assets/scss/category.css';
import React from "react";
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import namer from 'color-namer';
import { toast } from 'react-toastify';

export function Color() {
    const navigate = useNavigate();

    const [color, setColor] = useState();
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [colorFilter, setColorFilter] = useState('');

    const fetchColor = async () => {
        try {
            const url = `${import.meta.env.VITE_REACT_APP_URL}/get-color`;

            const response = await axios.get(url);
            console.log(response.data, 'get res');

            if (response?.data?.status === true) {
                setColor(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchColor()
    }, [])

    const deleteColor = async (id) => {
        try {
            const url = `${import.meta.env.VITE_REACT_APP_URL}/delete-color/${id}`

            const response = await axios.delete(url);
            console.log(response, 'delete res');
            toast.success(response.data);

            if (response.status === 200) {
                fetchColor();
            }
        } catch (error) {
            console.log(error);
        }
    }

    const capitalizeWords = (str) =>
        str.replace(/\b\w/g, (char) => char.toUpperCase());

    const filterColor = color?.color?.filter((item) => {
        const name = capitalizeWords(namer(item.color).basic[0]?.name || 'Unknown');
        const matchSearch = name
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchStatus =
            statusFilter === "" || String(item.status) === statusFilter;

        const matchColor =
            colorFilter === "" || item.color === colorFilter;

        return matchSearch && matchStatus && matchColor;
    })

    return (
        <>
            <div className='product-head'>
                <h3>Color</h3>
                <button className='btn' id='add-category-btn' onClick={() => navigate('/add-color')}>Add Color</button>
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
                                placeholder="Search Color"
                                type="text"
                                className="form-control"
                                onChange={(e) => setSearch(e.target.value)}
                                value={search}
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
                        <select className="form-select" value={colorFilter} onChange={(e) => setColorFilter(e.target.value)}>
                            <option value="">All Colors</option>
                            {
                                color?.color?.map((item, index) => {
                                    return (
                                        <option key={index} value={item.color}>{item.color}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                </div>

                <div className='product-table table-responsive-xxl'>
                    <table className="table align-middle">
                        <thead>
                            <tr className="text-center">
                                <th>Index</th>
                                <th>Color Name</th>
                                <th>Color Code</th>
                                <th>StatusFlag</th>
                                <th>Date</th>
                                <th>
                                    <span>Action</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                filterColor && filterColor.length > 0 ? (
                                    filterColor?.map((item, index) => {
                                        const name = capitalizeWords(namer(item.color).basic[0]?.name || 'Unknown');
                                        return (
                                            <tr className="text-center" key={index}>
                                                <td>{index + 1}</td>
                                                <td>{name}</td>
                                                <td>
                                                    <div className="d-flex align-items-center justify-content-center">
                                                        <div
                                                            style={{
                                                                width: "30px",
                                                                height: "30px",
                                                                backgroundColor: `${item.color}`,
                                                                border: "1px solid #ddd",
                                                                borderRadius: "4px"
                                                            }}
                                                        ></div>
                                                        <span className="ms-2">{item.color}</span>
                                                    </div>
                                                </td>
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
                                                            onClick={() => navigate('/edit-color', { state: item })}
                                                            title="Edit Color"
                                                        ></i>
                                                        <i
                                                            className="fa-solid fa-trash text-danger"
                                                            style={{ cursor: "pointer" }}
                                                            title="Delete Color"
                                                            onClick={() => deleteColor(item._id)}
                                                        ></i>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    }


                                    )
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