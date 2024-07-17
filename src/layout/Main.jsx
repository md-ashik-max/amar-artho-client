import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../pages/Shared/Navbar";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../providers/AuthProvider";

const Main = () => {
    const { user, setUser } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const res = await axios.get('http://localhost:5000/users/me', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setUser(res.data);
                } catch (err) {
                    console.error('Error fetching user:', err);
                    navigate('/');
                } finally {
                    setLoading(false);
                }
            } else {
                console.warn('No token found, redirecting to login');
                navigate('/');
                setLoading(false);
            }
        };
        fetchUser();
    }, [navigate, setUser]);

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    );
};

export default Main;
