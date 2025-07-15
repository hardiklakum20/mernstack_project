import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../Assets/scss/Login.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

export function Signup() {
    const [showPassword, setShowPassword] = useState(false);
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const url = 'http://localhost:8080/api/register';

            if (!name || !email || !password) {
                toast.error("Please fill all required fields.");
                return;
            }

            const response = await axios.post(url, { name, email, password });
            console.log(response);

            if (response.status === 200) {
                toast.success(response.data);
                setTimeout(() => {
                    navigate('/login');
                }, 1500)
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data || 'Registration failed');
        }
    }

    return (
        <div className='d-flex'>
            <div className='login-side'>
                <div className='container'>
                    <p className='login-title'>Join <br />ShoesX</p>
                    <p className='login-txt'>
                        Create your account and start your journey with ShoesX.
                        Get access to exclusive deals, personalized recommendations,
                        and a seamless shopping experience. Join our community today!
                    </p>
                </div>
            </div>

            <div className='login-main'>
                <h2 className='d-md-none d-block'>Create Account</h2>
                <div className='container d-flex justify-content-center align-items-center'>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <div className="row">
                                <div className="col-md-12">
                                    <label htmlFor="firstName" className="login-type mt-3">Name</label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        className='input-type'
                                        placeholder="Enter first name"
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                            </div>

                            <label htmlFor="email" className="login-type mt-3">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className='input-type'
                                placeholder="Enter email address"
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <label htmlFor="password" className="login-type mt-3">Password</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                className='input-type'
                                placeholder="Enter password"
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <div className="flex items-center mt-1">
                                <input
                                    type="checkbox"
                                    id="showPassword"
                                    checked={showPassword}
                                    onChange={() => setShowPassword(!showPassword)}
                                    className="mr-2"
                                />
                                <label htmlFor="showPassword" className="text-sm ms-2 mt-2">Show Password</label>
                            </div>

                            <button
                                type="submit"
                                className='signin-btn mt-3'>
                                Create Account
                            </button>

                            <div className="text-center mt-3">
                                <span className="text-muted">Already have an account? </span>
                                <button
                                    type="button"
                                    className="btn btn-link p-0"
                                    onClick={() => navigate('/login')}
                                >
                                    Login here
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