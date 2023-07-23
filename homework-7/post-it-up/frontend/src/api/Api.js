import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // Replace with your backend URL
});

export const fetchPosts = () => api.get("/posts");
export const fetchSinglePost = (postId) => api.get(`/posts/${postId}`);

export const addPost = (postData) => api.post("/posts", postData);
export const addComment = async (postId, commentData) => {
  try {
    const response = await api.post(`/posts/${postId}/comments`, commentData);
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};

export const deleteComment = async (postId, commentId) => {
  try {
    const response = await api.delete(`/posts/${postId}/comments/${commentId}`);
    return response;
  } catch (err) {
    console.log(err.message);
  }
};
