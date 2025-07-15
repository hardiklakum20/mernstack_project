import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../Assets/scss/Login.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

export function ResetPassword() {
    const navigate = useNavigate();
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { token } = useParams();



    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const url = `${process.env.REACT_APP_URL}/reset-password/${token}`;

            const response = await axios.post(url, { newPassword, confirmPassword });
            console.log(response);

            if (response.status === 200) {
                toast.success(response.data);
                setTimeout(() => {
                    navigate('/login');
                }, 1500)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data || 'Password change failed');
        }
    }


    const handleCancel = () => {
        navigate('/');
    };

    return (
        <div className='d-flex'>
            <div className='login-side'>
                <div className='container'>
                    <p className='login-title'>Reset <br />Password</p>
                    <p className='login-txt'>
                        Keep your account secure by updating your password regularly.
                        Choose a strong password that you haven't used before
                        and make sure to remember it for future logins.
                    </p>
                </div>
            </div>

            <div className='login-main'>
                <h2 className='d-md-none d-block'>Reset Password</h2>
                <div className='container d-flex justify-content-center align-items-center'>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="newPassword" className="login-type mt-3">New Password</label>
                            <input
                                type={showNewPassword ? "text" : "password"}
                                id="newPassword"
                                name="newPassword"
                                className='input-type'
                                placeholder="Enter new password"
                                onChange={(e) => setNewPassword(e.target.value)}
                            />

                            <div className="flex items-center mt-1">
                                <input
                                    type="checkbox"
                                    id="showNewPassword"
                                    checked={showNewPassword}
                                    onChange={() => setShowNewPassword(!showNewPassword)}
                                    className="mr-2"
                                />
                                <label htmlFor="showNewPassword" className="text-sm ms-2 mt-2">Show New Password</label>
                            </div>

                            <label htmlFor="confirmPassword" className="login-type mt-3">Confirm New Password</label>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                id="confirmPassword"
                                name="confirmPassword"
                                className='input-type'
                                placeholder="Confirm new password"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />

                            <div className="flex items-center mt-1">
                                <input
                                    type="checkbox"
                                    id="showConfirmPassword"
                                    checked={showConfirmPassword}
                                    onChange={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="mr-2"
                                />
                                <label htmlFor="showConfirmPassword" className="text-sm ms-2 mt-2">Show Confirm Password</label>
                            </div>

                            <div className="">
                                <button
                                    type="submit"
                                    className='signin-btn me-2'>
                                    Change Password
                                </button>
                                <button
                                    type="button"
                                    className='btn btn-outline-secondary mt-3'
                                    onClick={handleCancel}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
} 