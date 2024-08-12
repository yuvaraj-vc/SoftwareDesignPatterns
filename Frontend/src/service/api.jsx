import axios from "axios";

const baseURL = 'http://localhost:8080'

const axiosInstance = axios.create({
    baseURL,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

const SignUp = (name, email, password,role) => axiosInstance.post('api/v1/auth/register', { name, email, password,role });

export {axiosInstance,SignUp}