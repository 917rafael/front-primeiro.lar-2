import axios from "axios";

const api = axios.create({
  baseURL: "https://backend-pl-2b7q.onrender.com"
})
export default api;