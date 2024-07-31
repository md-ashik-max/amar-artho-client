import { useContext } from 'react';
import { FaCheck, FaMoneyCheck, FaTimes, FaRegThumbsUp } from 'react-icons/fa';
import { AuthContext } from '../../providers/AuthProvider';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const ManageCashIn = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const { data: allCashInRequest = [], isLoading: loading } = useQuery({
        queryKey: ['allCashInRequest'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/cashInRequest/${user?.mobile}`);
            return res.data;
        },
    });

    const handleAcceptRequest = (request) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to accept this request?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, accept it!',
            cancelButtonText: 'No, cancel!',
        }).then((result) => {
            if (result.isConfirmed) {
                const { _id, agentMobile, userMobile, amount } = request;
                axiosSecure.post('/cashIn/accept', { requestId: _id, agentMobile, userMobile, amount })
                    .then((res) => {
                        if (res.status === 200) {
                            queryClient.invalidateQueries(['allCashInRequest']);
                            Swal.fire('Accepted!', 'The request has been accepted.', 'success');
                        } else {
                            Swal.fire('Error!', 'Failed to accept the request.', 'error');
                        }
                    })
                    .catch((err) => {
                        console.error('Error accepting request:', err);
                        Swal.fire('Error!', 'Error occurred while processing the request.', 'error');
                    });
            }
        });
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="h-screen pt-32 container mx-auto">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
                <FaMoneyCheck className="mr-2" /> Manage Cash In Requests
            </h2>
            <div className="overflow-x-auto shadow-lg rounded-lg">
                <table className="min-w-full bg-white rounded-lg">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                User Mobile
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                Amount
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {allCashInRequest.map((request) => (
                            <tr key={request._id} className="border-b hover:bg-gray-100">
                                <td className="px-6 py-4 whitespace-nowrap">{request.userMobile}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{request.amount}</td>
                                <td className="px-6 py-4 whitespace-nowrap flex items-center">
                                    {request.status === 'accepted' ? (
                                        <FaCheck className="text-green-500 mr-2" />
                                    ) : (
                                        <FaTimes className="text-red-500 mr-2" />
                                    )}
                                    <span>{request.status}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {request.status === 'unaccepted' ? (
                                        <button
                                            onClick={() => handleAcceptRequest(request)}
                                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <FaRegThumbsUp className="mr-2" />
                                            Accept
                                        </button>
                                    ) : (
                                        <button
                                            className="bg-gray-400 text-white px-4 py-2 rounded flex items-center"
                                            disabled
                                        >
                                            <FaRegThumbsUp className="mr-2" />
                                            Accepted
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageCashIn;
