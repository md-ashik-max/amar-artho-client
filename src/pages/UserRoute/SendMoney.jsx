import { useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const SendMoney = () => {
    const [amount, setAmount] = useState('');
    const [pin, setPin] = useState('');
    const [recipient, setRecipient] = useState('');
    const axiosSecure = useAxiosSecure();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosSecure.post('/api/send-money', { amount, pin, recipient });
            console.log(response.data);
        } catch (error) {
            console.error('Error sending money:', error);
        }
    };

    return (
        <div className='max-w-3xl mx-auto h-screen flex justify-center items-center'>
            <div className="w-full p-4 bg-white rounded-lg shadow-lg">
                <div className="flex flex-col justify-center items-center mb-6">
                    <img src="https://i.ibb.co/QfpSRGd/icons8-taka-64.png" alt="" />
                    <p className="text-xl font-bold">Amar Artho</p>
                </div>
                <h2 className="text-2xl font-bold text-center">Send Money</h2>
                <form onSubmit={handleSubmit} className="mt-4">
                    <div className="mb-4">
                        <label className="block text-gray-700">Recipient</label>
                        <input
                            type="text"
                            value={recipient}
                            onChange={(e) => setRecipient(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            placeholder="Enter recipient"
                            required
                        />
                    </div>
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
                        <label className="block text-gray-700">Pin</label>
                        <input
                            type="password"
                            value={pin}
                            onChange={(e) => setPin(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            placeholder="Enter pin"
                            required
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
                        Send Money
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SendMoney;

