import { Link } from "react-router-dom";
import useAdmin from "../../../hooks/useAdmin";



const Home = () => {
    const [isAdmin] = useAdmin();
    return (
        <div className="min-h-screen flex justify-center items-center">
            {isAdmin ? <h1>This is admin home</h1> :
                <div className="md:flex gap-8 text-center">
                    <Link to="/dashboard/cashIn">
                        <div className="w-52 h-40 border-2 rounded-xl">
                            <h3>Cash In</h3>
                        </div>
                    </Link>
                    <Link to="/dashboard/cashOut">
                        <div className="w-52 h-40 border-2 rounded-xl">
                            <h3>Cash Out</h3>
                        </div>
                    </Link>
                    <Link to="/dashboard/sendMoney">
                        <div className="w-52 h-40 border-2 rounded-xl">
                            <h3>Send Money</h3>
                        </div>
                    </Link>
                </div>
            }


        </div>
    );
};

export default Home;