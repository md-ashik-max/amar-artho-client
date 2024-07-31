import { useContext, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { AuthContext } from '../../providers/AuthProvider';
import { useNavigate } from 'react-router-dom';

const CashIn = () => {
    const [amount, setAmount] = useState('');
    const { user } = useContext(AuthContext);
    const [agentMobile, setAgentMobile] = useState('');
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const cashInDetails = {
            userMobile: user?.mobile,
            amount: parseInt(amount),
            agentMobile,
            userName: user?.name,
            balance: user?.balance,
            date: new Date(),
            type: "Cash In",
            status:"unaccepted"
        }

        try {
            const response = await axiosSecure.post('/cashIn', cashInDetails);

            navigate("/dashboard/home");
            Swal.fire({
                icon: 'success',
                title: 'Cash In Request Success!',
                text: response.data.message,
            });
        } catch (error) {
            console.error('Error cashing in:', error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response ? error.response.data.error : 'Something went wrong!',
            });
        }
    };

    return (
        <div className='max-w-3xl mx-auto h-screen flex justify-center items-center'>
            <div className="w-full p-8 bg-white rounded-lg shadow-lg">
                <div className='w-full'>
                    <div className="flex flex-col justify-center items-center mb-6">
                        <img src="https://i.ibb.co/QfpSRGd/icons8-taka-64.png" alt="" />
                        <p className="text-xl font-bold">Amar Artho</p>
                    </div>
                    <h2 className="text-2xl font-bold text-center">Cash In</h2>
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
                            <label className="block text-gray-700">Agent Number</label>
                            <input
                                type="text"
                                value={agentMobile}
                                onChange={(e) => setAgentMobile(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-lg"
                                placeholder="Enter agent number"
                                required
                            />
                        </div>
                        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
                            Cash In
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CashIn;
