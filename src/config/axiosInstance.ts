import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api';

export const axiosInstance = axios.create({
    baseURL: BASE_URL
})