import { useState } from "react";
import { Link } from "react-router-dom";


const Navbar = () => {
    const user = {
        photo: 'https://i.ibb.co/FJ9rcJR/IMG-20231130-WA0018-modified.png',
        name: 'Ashikur Rahman',
        balance: 1000
    };
    const [showBalance, setShowBalance] = useState(false);

    const toggleBalance = () => {
        setShowBalance(!showBalance);
    }
    return (
        <div className="bg-base-100 p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <div className="flex items-center gap-4">
                        <div>
                            <img src={user.photo} alt="User" className="w-14 h-14 rounded-full" />
                        </div>
                        <div>
                            <p className="text-xl font-bold">{user.name}</p>
                            <div className="flex items-center border-2 rounded-3xl p-2 w-44 space-x-2 text-gray-700 cursor-pointer" onClick={toggleBalance}>
                                {showBalance ? (
                                    <>
                                        <div className="flex gap-10">
                                            <div>
                                                <span className="ml-2">{user.balance} Taka</span>


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
                <Link to="/"><img src="https://i.ibb.co/QfpSRGd/icons8-taka-64.png" alt="" /></Link>
                <div>
                    <Link to="/register"><button>Register</button></Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;