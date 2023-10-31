import axios from 'axios'


const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
  
    return req;
  });

export const getTimelinePosts= (id)=> API.get(`/posts/${id}/timeline`);
export const likePost=(id, userId)=>API.put(`posts/${id}/like`, {userId: userId})
export const deletePost = (id,userId) => API.delete(`posts/${id}/delete`, { params: { userId: userId }} )


export const addComment = (userId, postId, content,parentComment) => API.post("comments/", {  userId, postId,content,parentComment });
export const getComments = (postId) => API.get(`/comments/${postId}`);


