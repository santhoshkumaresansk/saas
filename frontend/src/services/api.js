import axios from "axios";

const API = axios.create({
  baseURL: "https://saas-5h5r.onrender.com",
});


API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
