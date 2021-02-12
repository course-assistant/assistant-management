import axios from 'axios'

export default function request(config) {
    let instance = axios.create({
        baseURL: 'http://127.0.0.1:8686/',
        timeout: 5000
    });
    return instance(config);
}