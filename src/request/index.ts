import axios from 'axios';
const service = axios.create({
    baseURL: 'https://www.fastmock.site/mock/bf1fcb3c2e2945669c2c8d0ecb8009b8/api',
    timeout: 5000,
    headers: {
        "Content-Type": "application/json;charset=utf-8"
    }
})
service.interceptors.request.use((config) => {
    config.headers = config.headers || {}
    if (localStorage.getItem("token")) {
        config.headers.token = localStorage.getItem("token") || ""
    }
    return config;
})
service.interceptors.response.use((res) => {
    const code: number = res.data.data.code;
    const tmpCode: number = res.data.code;
    if (code == 200 || tmpCode == 200) {
        return Promise.resolve(res);
    }
    return Promise.reject(res);
}, (err) => {
    console.log(err);
})
export default service;