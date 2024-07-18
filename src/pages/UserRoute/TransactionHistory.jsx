import { useContext, useEffect, useState } from 'react';
import { FaHistory } from 'react-icons/fa';
import { AuthContext } from '../../providers/AuthProvider';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const TransactionHistory = () => {
    const { user } = useContext(AuthContext);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                };
                const response = await axiosSecure.get(`/transactions/history/${user?.mobile}`, config);

                // Ensure the response data is an array
                if (Array.isArray(response.data)) {
                    setTransactions(response.data);
                } else {
                    setError('Unexpected response format');
                }
            } catch (error) {
                setError(error.response?.data?.error || 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, [user, axiosSecure]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="container mx-auto p-4 pt-32 h-screen">
            <h2 className="text-3xl font-extrabold mb-6 flex items-center text-indigo-600"><FaHistory className="mr-2" /> Transaction History</h2>
            <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-6">
                <table className="min-w-full bg-white rounded-lg">
                    <thead>
                        <tr className="bg-indigo-600 text-white">
                            <th className="py-2 px-4 text-left">Type</th>
                            <th className="py-2 px-4 text-left">Amount</th>
                            <th className="py-2 px-4 text-left">Fee</th>
                            <th className="py-2 px-4 text-left">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map(transaction => (
                            <tr key={transaction._id} className="even:bg-indigo-50">
                                <td className="border-t px-4 py-2">{transaction.type}</td>
                                <td className="border-t px-4 py-2">{transaction.amount} Taka</td>
                                <td className="border-t px-4 py-2">{transaction.fee} Taka</td>
                                <td className="border-t px-4 py-2">{new Date(transaction.date).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TransactionHistory;
