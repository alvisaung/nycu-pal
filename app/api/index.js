import axios from "axios";
const devUrl = "https://www.nycu-pal.com/api/";

const api = axios.create({
  baseURL: devUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
export default api;
