import { Link } from "react-router-dom";


const Navbar = () => {
    return (
        <nav className="bg-base-100 p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-xl font-bold">AmarArtho</Link>
                <div className="flex space-x-4">
                    <Link to="/dashboard" className="btn btn-primary">Dashboard</Link>
                    <Link to="/send-money" className="btn btn-primary">Send Money</Link>
                    <Link to="/cash-out" className="btn btn-primary">Cash Out</Link>
                    <Link to="/balance-inquiry" className="btn btn-primary">Balance Inquiry</Link>
                    <Link to="/transaction-history" className="btn btn-primary">Transaction History</Link>
                    <Link to="/login" className="btn btn-secondary">Login</Link>
                    <Link to="/register" className="btn btn-secondary">Register</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;