import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5285/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const loginUser = async (username, password) => {
  const response = await api.post("/auth/login", { username, password });
  return response.data; 
};

export const registerUser = async (username, email, password, role = "User", phoneNo) => {
  const response = await api.post("/auth/register", {
    username,
    email,
    password,
    role,
    phoneNo,
  });
  return response.data;
};

export const getSalesReps = async () => {
  const response = await api.get("/salesreps");
  return response.data;
};

export const getSalesRep = async (id) => {
  const response = await api.get(`/salesreps/${id}`);
  return response.data;
};

export const createSalesRep = async (data) => {
  const response = await api.post("/salesreps", data);
  return response.data;
};

export const updateSalesRep = async (id, data) => {
  const response = await api.put(`/salesreps/${id}`, data);
  return response.data;
};

export const deleteSalesRep = async (id) => {
  const response = await api.delete(`/salesreps/${id}`);
  return response.data;
};

export const getSales = async (params) => {
  const response = await api.get("/sales", { params });
  return response.data;
};

export default api;
