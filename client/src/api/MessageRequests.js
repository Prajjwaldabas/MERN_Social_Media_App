import axios from 'axios'


const API = axios.create({ baseURL: 'https://mern-social-media-app-server-9yz2.onrender.com' });

export const getMessages = (id) => API.get(`/message/${id}`);

export const addMessage = (data) => API.post('/message/', data);