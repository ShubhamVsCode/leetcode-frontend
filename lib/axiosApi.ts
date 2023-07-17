import axios from "axios"

export const AXIOS_API = axios.create({
    // baseURL: 'http://localhost:4000/api',
    baseURL: 'https://leetcode-server-production.up.railway.app/api',
});
