import axios from 'axios';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../providers/AuthProvider';

const useAxiosSecure = () => {
    const { logout } = useContext(AuthContext);

    const axiosSecure = axios.create({
        baseURL: 'http://localhost:5000',
    });

    useEffect(() => {
        axiosSecure.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem('token');
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        axiosSecure.interceptors.response.use(
            (response) => response,
            async (error) => {
                if (error.response.status === 401) {
                    await logout(); 
                }
                return Promise.reject(error);
            }
        );
    }, [logout ,axiosSecure]);

    return axiosSecure;
};

export default useAxiosSecure;
