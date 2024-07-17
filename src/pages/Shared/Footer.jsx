
import { FaHome, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="footer-item flex items-center mx-6">
                    <FaHome className="text-xl mr-2" />
                    <span className="text-sm">Home</span>
                </div>
                <div className="footer-item flex items-center mx-6">
                    <FaEnvelope className="text-xl mr-2" />
                    <span className="text-sm">Inbox</span>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
