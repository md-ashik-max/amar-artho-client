import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaLock, FaEnvelope } from 'react-icons/fa';
import Swal from 'sweetalert2';

const Login = () => {
    const [formData, setFormData] = useState({
        emailOrMobile: '',
        pin: '',
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/users/login', formData);
            if (res.data) {
                localStorage.setItem('token', res.data.token);
                Swal.fire({
                    title: 'Success!',
                    text: 'Login successful!',
                    icon: 'success',
                }).then(() => {
                    navigate('/dashboard/home'); // Redirect to home page
                });
            }
        } catch (err) {
            const message = err.response?.data?.error || 'Login failed. Please try again.';
            Swal.fire({
                title: 'Error!',
                text: message,
                icon: 'error',
            });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500">
            <div className="p-6 max-w-md w-full bg-white rounded-lg shadow-xl">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-control mb-4 relative">
                        <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                        <input
                            type="text"
                            name="emailOrMobile"
                            value={formData.emailOrMobile}
                            onChange={handleChange}
                            className="input input-bordered w-full pl-10"
                            placeholder="Email or Mobile"
                            required
                        />
                    </div>
                    <div className="form-control mb-4 relative">
                        <FaLock className="absolute left-3 top-3 text-gray-400" />
                        <input
                            type="password"
                            name="pin"
                            value={formData.pin}
                            onChange={handleChange}
                            className="input input-bordered w-full pl-10"
                            placeholder="PIN"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary w-full"
                    >
                        Login
                    </button>
                </form>
                <p className="mt-4 text-center text-gray-600">
                    Do not have an account? <a href="/register" className="text-blue-500 hover:underline">Register</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
