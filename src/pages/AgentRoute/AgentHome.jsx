
import { FaWallet, FaDollarSign, FaHistory, FaBalanceScale } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AgentHome = () => {

    return (
        <div className="container mx-auto p-4 py-32 h-screen">
            <div className='flex items-center justify-center'>
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                    <FaWallet className="mr-2" /> Agent Dashboard
                </h2>
            </div>
            <div className="text-center">
                <div className="flex flex-col md:flex-row gap-8 justify-center items-center mb-12 shadow-xl rounded-xl pb-12">
                    <Link to="/dashboard/manageCashIn">
                        <div className="w-52 h-40 border-2 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300 flex flex-col items-center justify-center bg-gradient-to-r from-green-400 to-blue-500 text-white">
                            <FaDollarSign size={40} /> 
                            <h3 className="mt-4 text-xl font-semibold">Manage Cash In</h3>
                        </div>
                    </Link>
                    <Link to="/dashboard/">
                        <div className="w-52 h-40 border-2 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300 flex flex-col items-center justify-center bg-gradient-to-r from-red-400 to-pink-500 text-white">
                            <FaHistory size={40} />
                            <h3 className="mt-4 text-xl font-semibold">Transaction History</h3>
                        </div>
                    </Link>
                    <Link to="/dashboard/">
                        <div className="w-52 h-40 border-2 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300 flex flex-col items-center justify-center bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                            <FaBalanceScale size={40} />
                            <h3 className="mt-4 text-xl font-semibold">Balance</h3>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AgentHome;
