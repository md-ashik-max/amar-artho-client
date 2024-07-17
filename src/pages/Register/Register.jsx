import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaPhone, FaEnvelope } from 'react-icons/fa';
import Swal from 'sweetalert2'; // Import SweetAlert

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        pin: '',
        mobile: '',
        email: '',
        role: 'user',
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/users/register', formData);
            if (res.data) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Registration successful! Please login.',
                    icon: 'success',
                });
                navigate('/'); // Redirect to login page
            }
        } catch (err) {
            Swal.fire({
                title: 'Error!',
                text: err.response?.data?.error || 'Registration failed. Please try again.',
                icon: 'error',
            });
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600">
            <div className="p-6 max-w-md w-full bg-white rounded-lg shadow-xl">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create Account</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4 relative">
                        <FaUser className="absolute left-3 top-3 text-gray-400" />
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="Name"
                            required
                        />
                    </div>
                    <div className="mb-4 relative">
                        <FaLock className="absolute left-3 top-3 text-gray-400" />
                        <input
                            type="password"
                            name="pin"
                            value={formData.pin}
                            onChange={handleChange}
                            className="w-full p-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="PIN"
                            required
                        />
                    </div>
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
                    <div className="mb-4 relative">
                        <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="Email"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Role</label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="user">User</option>
                            <option value="agent">Agent</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                    >
                        Register
                    </button>
                </form>
                <div className='text-center my-6'>
                    <p>Already have an account? Please <span className='text-blue-600 font-black border-b-2'><Link to="/">Login</Link></span></p>
                </div>
            </div>
        </div>
    );
};

export default Register;
