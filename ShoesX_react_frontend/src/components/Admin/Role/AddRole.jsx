import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddRole() {
    const navigate = useNavigate();

    const [roleName, setRoleName] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState('');
    const [permissions, setPermissions] = useState({
        dashboard: { all: false, view: false, edit: false, add: false, delete: false },
        users: { all: false, view: false, edit: false, add: false, delete: false },
        products: { all: false, view: false, edit: false, add: false, delete: false },
        category: { all: false, view: false, edit: false, add: false, delete: false },
        brand: { all: false, view: false, edit: false, add: false, delete: false },
        color: { all: false, view: false, edit: false, add: false, delete: false },
        size: { all: false, view: false, edit: false, add: false, delete: false },
        payment: { all: false, view: false, edit: false, add: false, delete: false },
        orders: { all: false, view: false, edit: false, add: false, delete: false },
        role: { all: false, view: false, edit: false, add: false, delete: false },
        bids: { all: false, view: false, edit: false, add: false, delete: false }
    });

    const handlePermissionChange = (module, type) => {
        setPermissions(prev => {
            const updatedModule = { ...prev[module] };

            if (type === 'all') {
                const newValue = !updatedModule.all;
                Object.keys(updatedModule).forEach(key => {
                    updatedModule[key] = newValue;
                });
            } else {
                updatedModule[type] = !updatedModule[type];

                const { view, edit, add, delete: del } = updatedModule;
                updatedModule.all = view && edit && add && del;
            }

            return {
                ...prev,
                [module]: updatedModule
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!roleName || !name || !email || !password || status === "") {
            toast.error("Please fill all required fields.");
            return;
        }

        try {
            const res = await axios.post(`${process.env.REACT_APP_URL}/add-user`, {
                roleName,
                name,
                email,
                password,
                status: Number(status),
                permissions
            });

            toast.success(res.data.message || "User registered successfully");
            setTimeout(() => navigate(-1), 1500);
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data || "Something went wrong");
        }
    };

    return (
        <>
            <div className='product-head'>
                <h3>Add New Role</h3>
            </div>

            <form onSubmit={handleSubmit}>
                <div className='add-role-body body-bg'>
                    <h3>Permissions</h3>

                    {Object.entries(permissions).map(([module, perms]) => (
                        <div key={module} className='permission-div mb-3'>
                            <h5 className='text-capitalize'>{module}:</h5>
                            {Object.keys(perms).map((perm) => (
                                <label key={perm} className="form-check form-check-inline text-capitalize" style={{ cursor: 'pointer' }}>
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={permissions[module][perm]}
                                        onChange={() => handlePermissionChange(module, perm)}
                                    />
                                    {perm}
                                </label>
                            ))}
                        </div>
                    ))}

                    <div className='role-input'>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label className="form-label">Role Name:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={roleName}
                                        onChange={(e) => setRoleName(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label className="form-label">Name:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label className="form-label">Email:</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label className="form-label">Password:</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="col-md-12 mb-3">
                                <label className='form-label'>Status <span>*</span></label>
                                <select
                                    className="form-select shadow-none"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                >
                                    <option value="">-- Select Status --</option>
                                    <option value="1">Active</option>
                                    <option value="0">Inactive</option>
                                </select>
                            </div>
                            <div className="col-md-4">
                                <div className='d-flex mt-3 gap-3'>
                                    <button type='submit' className='btn default-btn'>Submit</button>
                                    <button type="button" className='btn btn-closes' onClick={() => navigate(-1)}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </form>
        </>
    );
}

export default AddRole;
