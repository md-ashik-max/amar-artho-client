import { useContext, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';

const SendMoney = () => {
    const [amount, setAmount] = useState('');
    const [pin, setPin] = useState('');
    const { user } = useContext(AuthContext);
    const [receiverMobile, setReceiverMobile] = useState('');
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const sendMoneyDetails = {
            receiverMobile,
            amount: parseInt(amount),
            pin,
            userName: user?.name,
            balance: user?.balance,
            date: new Date(),
            type: "Send Money",
        }
        
        try {
            const token = localStorage.getItem('token');
            const response = await axiosSecure.post('/transactions/send', sendMoneyDetails, {
                headers: { Authorization: `Bearer ${token}` }
            });
            navigate("/dashboard/home");

            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: response.data.message,
            });
        } catch (error) {
            console.error('Error sending money:', error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response ? error.response.data.error : 'Something went wrong!',
            });
        }
    };

    return (
        <div className='max-w-3xl mx-auto h-screen flex justify-center items-center'>
            <div className="w-full p-4 bg-white rounded-lg shadow-lg">
                <div className='w-full'>
                    <div className="flex flex-col justify-center items-center mb-6">
                        <img src="https://i.ibb.co/QfpSRGd/icons8-taka-64.png" alt="" />
                        <p className="text-xl font-bold">Amar Artho</p>
                    </div>
                    <h2 className="text-2xl font-bold text-center">Send Money</h2>
                    <form onSubmit={handleSubmit} className="mt-4">
                        <div className="mb-4">
                            <label className="block text-gray-700">Amount</label>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-lg"
                                placeholder="Enter amount"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Receiver Mobile</label>
                            <input
                                type="text"
                                value={receiverMobile}
                                onChange={(e) => setReceiverMobile(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-lg"
                                placeholder="Enter receiver mobile"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">PIN</label>
                            <input
                                type="password"
                                value={pin}
                                onChange={(e) => setPin(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-lg"
                                placeholder="Enter your PIN"
                                required
                            />
                        </div>
                        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
                            Send Money
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SendMoney;
