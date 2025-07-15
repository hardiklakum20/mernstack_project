import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Role() {
    const navigate = useNavigate();
    const [role, setRole] = useState();

    const fetchRole = async () => {
        try {
            const url = `${import.meta.env.VITE_REACT_APP_URL}/get-user`;

            const response = await axios.get(url);
            console.log(response.data, 'get res');

            if (response?.data?.status === true) {
                setRole(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchRole();
    }, []);

    const handleDelete = async (id) => {
        try {
            const url = `${import.meta.env.VITE_REACT_APP_URL}/delete-user/${id}`
            const response = await axios.delete(url);
            toast.success(response.data);
            if (response.status === 200) {
                fetchRole();
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <div className='product-head'>
                <h3>Role</h3>
                <Link to={'/role/add-role'}><button className='btn' id='add-category-btn'>Add Role</button></Link>
            </div>
            <div className='product-body body-bg'>
                <div className='row'>
                    <div className='col-lg-3 col-md-6 mt-md-0'>
                        <div className='input-div'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="gray" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8" />
                                <line x1="16" y1="16" x2="22" y2="22" />
                            </svg>
                            <input placeholder="Search Role" className='form-control' type="text" />
                        </div>
                    </div>
                    <div className='col-lg-3 col-md-6 mt-md-0 mt-3'>
                        <select className="form-select" aria-label="Default select example">
                            <option defaultValue>Active</option>
                            <option value="1">Inactive</option>
                        </select>
                    </div>
                    <div className='col-lg-3 col-md-6 mt-lg-0 mt-md-3 mt-3'>
                        <select className="form-select" aria-label="Default select example">
                            <option defaultValue>Category</option>
                            <option value="1">Brand</option>
                        </select>
                    </div>
                    {/* <div className='col-md-3 col-md-6 mt-lg-0 mt-md-3 mt-3'>
                        <select className="form-select" aria-label="Default select example">
                            <option defaultValue>Category</option>
                            <option value="1">Brand</option>
                        </select>
                    </div> */}
                </div>
                <div className='product-table table-responsive'>
                    <table className="table align-middle">
                        <thead className=''>
                            <tr className='text-center'>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>StatusFlag</th>
                                <th>Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>


                            {
                                role?.user?.map((item, index) => (
                                    <>
                                        <tr className="text-center" key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.name}</td>
                                            <td>{item.email}</td>
                                            <td>{item.roleName}</td>
                                            <td className="">
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
                                                        onClick={() => navigate('edit-role', { state: item })}
                                                        data-bs-toggle="tooltip"
                                                        data-bs-placement="top"
                                                        title="Edit Role"
                                                    ></i>
                                                    <i
                                                        className="fa-solid fa-trash text-danger"
                                                        style={{ cursor: "pointer" }}
                                                        data-bs-toggle="tooltip"
                                                        data-bs-placement="top"
                                                        title="Delete Role"
                                                        onClick={() => handleDelete(item._id)}
                                                    ></i>
                                                </div>
                                            </td>
                                        </tr>
                                    </>
                                ))
                            }

                            {/* ))
                            ) : (
                            <tr>
                                <td className="text-center" colSpan={6}>No roles available</td>
                            </tr>
                            )} */}
                        </tbody>
                    </table>
                </div>
                <ToastContainer />
            </div >
        </>
    );
}

export default Role;