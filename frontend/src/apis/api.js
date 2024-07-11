
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api'; // Replace with your backend API base URL
const userId = localStorage.getItem("userId");
const token = localStorage.getItem("accessToken");
const API_ENDPOINTS = {
  createContent: `${API_BASE_URL}/createContent`,
  updateContent: `${API_BASE_URL}/updateContent`,
  deleteContent: `${API_BASE_URL}/deleteContent/`,
  getContentForUser: `${API_BASE_URL}/getContentForUser/${userId}`,
};

export const createContent = async (content) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axios.post(API_ENDPOINTS.createContent, { content,userId }, { headers });
};

export const updateContent = async (contentId, content) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return (await axios.put(API_ENDPOINTS.updateContent, { contentId, content }, { headers })).data;
};

export const deleteContent = async (contentId) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axios.delete(`${API_ENDPOINTS.deleteContent}${contentId}`, { headers });
};

export const getContentForUser = async () => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axios.get(API_ENDPOINTS.getContentForUser, { headers });
};
