import axios from "axios";
const devUrl = "http://localhost:5001/api/";

const api = axios.create({
  baseURL: devUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
export default api;
