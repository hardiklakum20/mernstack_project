import React, { useEffect, useState } from 'react';
import ProfileImg from '../../Assets/Images/profile.jpg';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function Profile() {
    const navigate = useNavigate();
    const [profile, setProfile] = useState({
        name: '',
        username: '',
        email: '',
        role: ''
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                // Prefer name, email, role from token, fallback to static if missing
                const name = decoded.name || '';
                const email = decoded.email || '';
                const role = decoded.role || '';
                // Username: if available, else use email prefix
                let username = decoded.username || '';
                if (!username && email) {
                    username = email.split('@')[0];
                }
                setProfile({ name, username, email, role });
            } catch (e) {
                // Invalid token, fallback to static
                setProfile({
                    name: 'John Doe',
                    username: 'johndoe',
                    email: 'john.doe@shoesx.com',
                    role: 'Administrator'
                });
            }
        } else {
            setProfile({
                name: 'John Doe',
                username: 'johndoe',
                email: 'john.doe@shoesx.com',
                role: 'Administrator'
            });
        }
    }, []);

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
                        <h4>{profile.name}</h4>
                        <p>{profile.username}</p>
                        <p>{profile.email}</p>
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
                                value={profile.username}
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
                                value={profile.role}
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
                                value={profile.email}
                                readOnly
                            />
                        </div>
                    </div>
                </div>
                {/* <div className="col-md-6">
                    <button className='btn default-btn'>Update Profile</button>
                </div> */}
            </div>
        </>
    );
}

export default Profile;
