import { useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';


const CashIn = () => {
    const [amount, setAmount] = useState('');
    const [agentNumber, setAgentNumber] = useState('');
    const axiosSecure = useAxiosSecure();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosSecure.post('/api/cash-in', { amount, agentNumber });
            console.log(response.data);
        } catch (error) {
            console.error('Error cashing in:', error);
        }
    };

    return (
        <div className='max-w-3xl mx-auto h-screen flex justify-center items-center'>
            <div className="w-full p-6 bg-white rounded-lg shadow-lg">
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
                                value={agentNumber}
                                onChange={(e) => setAgentNumber(e.target.value)}
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
