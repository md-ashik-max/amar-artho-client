import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaLock, FaPhone } from 'react-icons/fa';

const Login = () => {
    const [formData, setFormData] = useState({
        mobile: '',
        pin: '',
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
            const res = await axios.post('/api/users/login', formData);
            if (res.data) {
                // Save the token to local storage or context state
                navigate('/');
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500">
            <div className="p-6 max-w-md w-full bg-white rounded-lg shadow-xl">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>
                <form onSubmit={handleSubmit}>
                <div className="mb-4 relative">
                        <FaPhone className="absolute left-3 top-3 text-gray-400" />
                        <input
                            type="text"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                            className="w-full p-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="Mobile"
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
