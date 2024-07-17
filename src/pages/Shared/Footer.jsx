
import { FaHome, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/dashboard/home">
                    <div className="footer-item flex items-center mx-6">
                        <FaHome className="text-xl mr-2" />
                        <span className="text-sm">Home</span>
                    </div>
                </Link>
                <div className="footer-item flex items-center mx-6">
                    <FaEnvelope className="text-xl mr-2" />
                    <span className="text-sm">Inbox</span>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
