import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../Assets/scss/Login.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

export function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);


    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const url = 'http://localhost:8080/api/login';

            if (!email || !password) {
                toast.error("Please fill all required fields.");
                return;
            }

            const response = await axios.post(url, { email, password });
            console.log(response, 'res');

            if (response.status === 200) {
                toast.success(response.data.message);
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('name', response.data.existingUser.username);
                setTimeout(() => {
                    navigate('/');
                }, 1500)
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data || 'Login failed');
        }
    }

    return (
        <div className='d-flex'>
            <div className='login-side'>
                <div className='container'>
                    <p className='login-title'>Welcome to <br />ShoesX</p>
                    <p className='login-txt'>
                        Discover a world of style, comfort, and performance with ShoesX.
                        From casual sneakers to elegant formal wear and high-performance sports shoes,
                        we have the perfect pair for every occasion. Step up your shoe game with ShoesX!
                    </p>
                </div>
            </div>

            <div className='login-main'>
                <h2 className='d-md-none d-block'>Welcome to ShoesX</h2>
                <div className='container d-flex justify-content-center align-items-center'>
                    <form onSubmit={handleLogin}>
                        <div>
                            <label htmlFor="email" className="login-type mt-3">Email</label>
                            <input
                                type="email"
                                id="email"
                                className='input-type'
                                placeholder="Enter any email"
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <label htmlFor="password" className="login-type mt-3">Password</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                className='input-type'
                                placeholder="Enter any password"
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <div className="flex items-center mt-1">
                                <input
                                    type="checkbox"
                                    id="showPassword"
                                    className="mr-2"
                                    onChange={() => setShowPassword(!showPassword)}
                                />
                                <label htmlFor="showPassword" className="text-sm ms-2 mt-2">Show Password</label>
                            </div>
                            <button
                                type="submit"
                                className='signin-btn mt-3'>
                                Login
                            </button>

                            <div className="text-center mt-3">
                                <button
                                    type="button"
                                    className="btn btn-link p-0 me-3"
                                    onClick={() => navigate('/forgot-password')}
                                >
                                    Forgot Password?
                                </button>
                                <span className="text-muted">Don't have an account? </span>
                                <button
                                    type="button"
                                    className="btn btn-link p-0"
                                    onClick={() => navigate('/signup')}
                                >
                                    Sign up here
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