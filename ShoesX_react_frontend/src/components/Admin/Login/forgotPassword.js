import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../Assets/scss/Login.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

export function ForgotPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);


    // Static forgot password - always succeeds
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const url = `${process.env.REACT_APP_URL}/forgot-password`;
            const response = await axios.post(url, { email });
            console.log(response);

            if (response.status === 200) {
                toast.success(response.data.message);
                setIsSubmitted(true);
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data || 'Password change failed');
        }

    };

    const handleBackToLogin = () => {
        navigate('/login');
    };

    return (
        <div className='d-flex'>
            <div className='login-side'>
                <div className='container'>
                    <p className='login-title'>Reset <br />Password</p>
                    <p className='login-txt'>
                        Don't worry! It happens to the best of us.
                        Enter your email address and we'll send you a link
                        to reset your password and get back to shopping.
                    </p>
                </div>
            </div>

            <div className='login-main'>
                <h2 className='d-md-none d-block'>Forgot Password</h2>
                <div className='container d-flex justify-content-center align-items-center'>
                    {!isSubmitted ? (
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email" className="login-type mt-3">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    className='input-type'
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email address"
                                />

                                <button
                                    type="submit"
                                    className='signin-btn mt-3'>
                                    Send Reset Link
                                </button>

                                <div className="text-center mt-3">
                                    <span className="text-muted">Remember your password? </span>
                                    <button
                                        type="button"
                                        className="btn btn-link p-0"
                                        onClick={handleBackToLogin}
                                    >
                                        Back to Login
                                    </button>
                                </div>
                            </div>
                        </form>
                    ) : (
                        <div className="text-center">
                            <div className="mb-4">
                                <i className="fas fa-check-circle text-success" style={{ fontSize: '3rem' }}></i>
                            </div>
                            <h4>Check Your Email</h4>
                            <p className="text-muted">
                                We've sent a password reset link to <strong>{email}</strong>
                            </p>
                            {/* <p className="text-muted small">
                                (This is a demo - no actual email will be sent)
                            </p> */}
                            <button
                                type="button"
                                className='signin-btn mt-3'
                                onClick={handleBackToLogin}
                            >
                                Back to Login
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <ToastContainer />
        </div>
    );
} 