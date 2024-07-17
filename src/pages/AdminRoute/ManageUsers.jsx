import { FaTrashAlt, FaCheck, FaBan } from "react-icons/fa";
import useAllUser from "../../hooks/useAllUser";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from 'sweetalert2';

const ManageUsers = () => {
    const [allUser, isLoading, error, refetch] = useAllUser(); // Assuming useAllUser returns a refetch function
    const axiosSecure = useAxiosSecure();

    const handleApproveUser = async (userId) => {
        try {
            await axiosSecure.patch(`/users/approve/${userId}`);
            Swal.fire({
                icon: 'success',
                title: 'User Approved',
                text: 'The user has been approved successfully.',
            });
            refetch(); // Refresh the user list
        } catch (err) {
            console.error("Failed to approve user:", err);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to approve user.',
            });
        }
    };

    const handleBlockUser = async (userId) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });

        swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, block it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axiosSecure.patch(`/users/block/${userId}`);
                    swalWithBootstrapButtons.fire({
                        title: "Blocked!",
                        text: "The user has been blocked.",
                        icon: "success"
                    });
                    refetch(); // Refresh the user list
                } catch (err) {
                    console.error("Failed to block user:", err);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Failed to block user.',
                    });
                }
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelled",
                    text: "The user is safe :)",
                    icon: "error"
                });
            }
        });
    };

    const handleDeleteUser = async (userId) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });

        swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axiosSecure.delete(`/users/${userId}`);
                    swalWithBootstrapButtons.fire({
                        title: "Deleted!",
                        text: "The user has been deleted.",
                        icon: "success"
                    });
                    refetch(); // Refresh the user list
                } catch (err) {
                    console.error("Failed to delete user:", err);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Failed to delete user.',
                    });
                }
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelled",
                    text: "The user is safe :)",
                    icon: "error"
                });
            }
        });
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!allUser || allUser.length === 0) {
        return <div>No users found.</div>;
    }

    return (
        <div className="pt-52 container mx-auto h-screen">
            <div className="overflow-x-auto overflow-y-hidden my-8 rounded-t-2xl">
                <table className="table">
                    <thead className="bg-[#0677A1] text-white lg:text-lg">
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className="lg:text-xl">
                        {allUser.map((user, index) => (
                            <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.mobile}</td>
                                <td>
                                    {user?.role === 'admin' || user?.role === 'agent' ? (
                                        <span className="text-[#0677A1] text-[16px] font-bold">
                                            {user?.role === 'admin' ? 'Admin' : 'Agent'}
                                        </span>
                                    ) : (
                                        <span>User</span>
                                    )}
                                </td>
                                <td>
                                    {user.status === 'pending' && (
                                        <span className="text-yellow-500">Pending</span>
                                    )}
                                    {user.status === 'approved' && (
                                        <span className="text-green-500">Approved</span>
                                    )}
                                    {user.status === 'blocked' && (
                                        <span className="text-red-500">Blocked</span>
                                    )}
                                </td>
                                <td className="flex gap-3">
                                    {user.role !== 'admin' && (
                                        <>
                                            <button
                                                onClick={() => handleApproveUser(user._id)}
                                                className="btn border-[#4CAF50] text-[#4CAF50]"
                                                disabled={user.status === 'approved'}
                                            >
                                                <FaCheck />
                                            </button>
                                            <button
                                                onClick={() => handleBlockUser(user._id)}
                                                className="btn border-[#FFA500] text-[#FFA500]"
                                                disabled={user.status === 'blocked'}
                                            >
                                                <FaBan />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteUser(user._id)}
                                                className="btn border-[#B91C1C] text-[#B91C1C]"
                                            >
                                                <FaTrashAlt />
                                            </button>
                                        </>
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

export default ManageUsers;
