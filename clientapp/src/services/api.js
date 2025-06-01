import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5285/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const loginUser = async (username, password) => {
  try {
    const response = await api.post("/auth/login", { username, password });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

export const registerUser = async (
  username,
  email,
  password,
  role = "User",
  phoneNo
) => {
  try {
    const response = await api.post("/auth/register", {
      username,
      email,
      password,
      role,
      phoneNo,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Signup failed");
  }
};

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

export const getSalesReps = async (token) => {
  try {
    const response = await api.get('/salesreps', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch sales reps"
    );
  }
};

export const getSalesRep = async (id, token) => {
  try {
    const response = await api.get(`/salesreps/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch sales rep"
    );
  }
};

export const updateSalesRep = async (id, data, token) => {
  try {
    const response = await api.put(`/salesreps/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to update sales rep"
    );
  }
};

export const createSalesRep = async (data, token) => {
  try {
    const response = await api.post('/salesreps', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating sales rep:", error);
    throw error;
  }
};

export const deleteSalesRep = async (id, token) => {
  try {
    const response = await api.delete(`/salesreps/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to delete sales rep:", error);
    throw error;
  }
};

export const getSales = async (params, token) => {
  try {
    const response = await api.get('/sales', {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch sales data:", error);
    throw error;
  }
};

export default api;
