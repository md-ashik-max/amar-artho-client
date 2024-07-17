import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import useAdmin from "../../hooks/useAdmin";
import { CgLogOut } from "react-icons/cg";
import { FaUser } from "react-icons/fa";

const Navbar = () => {
    const { user, setUser } = useContext(AuthContext);
    const [isAdmin] = useAdmin();
    const [showBalance, setShowBalance] = useState(false);
    const navigate = useNavigate();

    const toggleBalance = () => {
        setShowBalance(!showBalance);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setUser(null);
        navigate("/");
    };

    return (
        <div className="bg-base-100 p-4 shadow-md fixed z-50 w-full">
            <div className="container mx-auto flex justify-between items-center">
                {user && (
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center justify-between">
                            <div>
                                {user.photo ? <img src={user.photo} alt="User" className="w-14 h-14 rounded-full" />
                                    :
                                    <img src="https://i.ibb.co/r7njFLL/amar-Artho-profile.png" className="w-14 h-14 rounded-full" alt="" />}
                            </div>
                            <div className="ml-4">
                                <p className="text-xl font-bold">{user.name}</p>
                                <div className="flex items-center border-2 rounded-3xl p-2 w-44 space-x-2 text-gray-700 cursor-pointer" onClick={toggleBalance}>
                                    {showBalance ? (
                                        <>
                                            <div className="flex justify-between w-full">
                                                <div>
                                                   <p className="ml-2">{user.balance} Taka</p>
                                                </div>
                                                <div>
                                                    <img src="https://i.ibb.co/pzhLQMP/icons8-taka-64-1.png" alt="Taka" className="w-6 h-6 rounded-full" />
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="flex gap-4">
                                                <div>
                                                    <img src="https://i.ibb.co/pzhLQMP/icons8-taka-64-1.png" alt="Taka" className="w-6 h-6 rounded-full" />

                                                </div>
                                                <div>
                                                    <p>Check Balance</p>
                                                </div>
                                            </div>

                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <div className="flex items-center space-x-4">

                    <div className="drawer drawer-end">
                        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                        <div className="drawer-content">
                            {/* Page content here */}
                            <label htmlFor="my-drawer-4" className="drawer-button"><img src="https://i.ibb.co/QfpSRGd/icons8-taka-64.png" alt="" /></label>
                        </div>
                        <div className="drawer-side">
                            <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>

                            {isAdmin ?
                                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                                    {/* Sidebar content here */}
                                    <div className="flex flex-col justify-center items-center mb-6">
                                    <img src="https://i.ibb.co/QfpSRGd/icons8-taka-64.png" alt="" />
                                        <p className="text-xl font-bold">Amar Artho</p>
                                    </div>
                                    <li><Link to="/dashboard/manageUsers"><button className="btn flex items-center font-bold bg-transparent hover:text-[#0677A1]"><FaUser/> Manage User</button></Link></li>
                                    <li>  {user && (
                                        <li> <button onClick={handleLogout} className="flex items-center text-black font-bold hover:text-red-600">Log Out <CgLogOut className="text-xl font-bold"></CgLogOut></button></li>
                                    )}</li>

                                </ul>
                                :
                                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                                    {/* Sidebar content here */}
                                    <li>  {user && (
                                        <button onClick={handleLogout} className="btn btn-danger">
                                            Logout
                                        </button>
                                    )}</li>
                                    <li><a>Sidebar Item 2</a></li>
                                </ul>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
