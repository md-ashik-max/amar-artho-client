
import { Link } from "react-router-dom";
import { FaMoneyBillWave, FaMoneyCheckAlt, FaPaperPlane } from "react-icons/fa";
import useAdmin from "../../../hooks/useAdmin";
import Banner from "./Banner/Banner";
import useAgent from "../../../hooks/useAgent";
import AgentHome from "../../AgentRoute/AgentHome";

const Home = () => {
    const [isAdmin] = useAdmin();
    const [isAgent] = useAgent();
    return (
        <div className="container mx-auto pt-40">
            {isAdmin ? (
                <div className="text-center h-screen text-3xl font-bold">This is admin home</div>
            ) :
            isAgent?(  <AgentHome/>)
            :
            (
                <div className="text-center">
                    <div className="flex flex-col md:flex-row gap-8 justify-center items-center mb-12 shadow-xl rounded-xl pb-12">
                        <Link to="/dashboard/cashIn">
                            <div className="w-52 h-40 border-2 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300 flex flex-col items-center justify-center bg-gradient-to-r from-green-400 to-blue-500 text-white">
                                <FaMoneyBillWave size={40} />
                                <h3 className="mt-4 text-xl font-semibold">Cash In</h3>
                            </div>
                        </Link>
                        <Link to="/dashboard/cashOut">
                            <div className="w-52 h-40 border-2 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300 flex flex-col items-center justify-center bg-gradient-to-r from-red-400 to-pink-500 text-white">
                                <FaMoneyCheckAlt size={40} />
                                <h3 className="mt-4 text-xl font-semibold">Cash Out</h3>
                            </div>
                        </Link>
                        <Link to="/dashboard/sendMoney">
                            <div className="w-52 h-40 border-2 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300 flex flex-col items-center justify-center bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                                <FaPaperPlane size={40} />
                                <h3 className="mt-4 text-xl font-semibold">Send Money</h3>
                            </div>
                        </Link>
                    </div>
                    <Banner />
                </div>
            )}
        </div>
    );
};

export default Home;
