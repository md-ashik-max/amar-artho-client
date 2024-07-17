import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

const Navbar = () => {
    const { user, setUser } = useContext(AuthContext);
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
        <div className="bg-base-100 p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                {user && (
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center gap-4">
                            <div>
                                <img src={user.photo} alt="User" className="w-14 h-14 rounded-full" />
                            </div>
                            <div>
                                <p className="text-xl font-bold">{user.name}</p>
                                <div className="flex items-center border-2 rounded-3xl p-2 w-44 space-x-2 text-gray-700 cursor-pointer" onClick={toggleBalance}>
                                    {showBalance ? (
                                        <span>{user.balance} Taka</span>
                                    ) : (
                                        <p>Check Balance</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <div className="flex items-center space-x-4">
                    {user && (
                        <button onClick={handleLogout} className="btn btn-danger">
                            Logout
                        </button>
                    )}
                    <Link to="/"><img src="https://i.ibb.co/QfpSRGd/icons8-taka-64.png" alt="" /></Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
