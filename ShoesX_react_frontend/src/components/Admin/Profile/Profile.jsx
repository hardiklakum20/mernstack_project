import React from 'react';
import ProfileImg from '../../Assets/Images/profile.jpg';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const navigate = useNavigate();

    // Static admin data
    const admin = {
        name: "John Doe",
        username: "johndoe",
        email: "john.doe@shoesx.com",
        role: "Administrator"
    };

    return (
        <>
            <div className='product-head'>
                <h3>Profile</h3>
                <button
                    className='btn'
                    id='add-category-btn'
                    onClick={() => navigate('/change-password')}
                >
                    Change Password
                </button>
            </div>
            <div className='profile-body body-bg'>
                <div className='profile-content'>
                    <img src={ProfileImg} alt="profile" className='img-fluid' />
                    <div>
                        <h4>{admin.name}</h4>
                        <p>{admin.username}</p>
                        <p>{admin.email}</p>
                    </div>
                </div>
            </div>
            <div className='profile-info body-bg'>
                <h4>Personal Information</h4>
                <div className="row">
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">User Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                value={admin.username}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label htmlFor="role" className="form-label">Role Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="role"
                                value={admin.role}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                value={admin.email}
                                readOnly
                            />
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <button className='btn default-btn'>Update Profile</button>
                </div>
            </div>
        </>
    );
}

export default Profile;
