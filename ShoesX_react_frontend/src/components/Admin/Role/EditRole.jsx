import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditRole() {
    const { state } = useLocation();
    const navigate = useNavigate();

    console.log(state, 'edit user');

    const [roleName, setRoleName] = useState(state.roleName);
    const [name, setName] = useState(state.name);
    const [email, setEmail] = useState(state.email);
    const [password, setPassword] = useState(state.password);
    const [status, setStatus] = useState(state.status);
    const defaultPermissions = {
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
        bids: { all: false, view: false, edit: false, add: false, delete: false },
    };
    const [permissions, setPermissions] = useState(defaultPermissions);

    useEffect(() => {
        if (state.permissions) {
            const updatedPermissions = {};

            for (const section in defaultPermissions) {
                const perms = state.permissions[section] || {};

                const updated = {
                    view: !!perms.view,
                    edit: !!perms.edit,
                    add: !!perms.add,
                    delete: !!perms.delete,
                };

                updated.all = updated.view && updated.edit && updated.add && updated.delete;

                updatedPermissions[section] = updated;
            }

            setPermissions(updatedPermissions);
        }
    }, [state.permissions]);

    const handleSelectAll = (section, checked) => {
        setPermissions((prev) => ({
            ...prev,
            [section]: {
                all: checked,
                view: checked,
                edit: checked,
                add: checked,
                delete: checked,
            },
        }));
    };

    const handleCheckboxChange = (section, key, checked) => {
        const updatedSection = {
            ...permissions[section],
            [key]: checked,
        };
        updatedSection.all =
            updatedSection.view && updatedSection.edit && updatedSection.add && updatedSection.delete;

        setPermissions((prev) => ({
            ...prev,
            [section]: updatedSection,
        }));
    };

    const handleEdit = async () => {
        try {

            const url = `${import.meta.env.VITE_REACT_APP_URL}/edit-user/${state._id}`;

            const response = await axios.put(url, { roleName, name, email, password, status, permissions });
            console.log(response, 'put res');

            if (response.status === 200) {
                toast.success(response.data);
                setTimeout(() => {
                    navigate('/role');
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
                <h3>Edit Role</h3>
            </div>

            <div className='add-role-body body-bg'>
                <h3>Permissions</h3>

                {Object.keys(permissions).map((section) => (
                    <div key={section} className='permission-div'>
                        <h5>{section.charAt(0).toUpperCase() + section.slice(1)}:</h5>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                checked={permissions[section].all}
                                onChange={(e) => handleSelectAll(section, e.target.checked)}
                                id={`all-${section}`}
                            />
                            <label className="form-check-label" htmlFor={`all-${section}`}>
                                All
                            </label>
                        </div>
                        {['view', 'edit', 'add', 'delete'].map((perm) => (
                            <div key={perm} className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={permissions[section][perm]}
                                    onChange={(e) =>
                                        handleCheckboxChange(section, perm, e.target.checked)
                                    }
                                    id={`${perm}-${section}`}
                                />
                                <label className="form-check-label" htmlFor={`${perm}-${section}`}>
                                    {perm.charAt(0).toUpperCase() + perm.slice(1)}
                                </label>
                            </div>
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
                                {/* <option value="">-- Select Status --</option> */}
                                <option value="1">Active</option>
                                <option value="0">Inactive</option>
                            </select>
                        </div>
                        <div className="col-md-4">
                            <div className='d-flex mt-3 gap-3'>
                                <button className='btn default-btn' onClick={handleEdit}>Submit</button>
                                <button type="button" className='btn btn-closes' onClick={() => navigate(-1)}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </>
    );
}

export default EditRole;