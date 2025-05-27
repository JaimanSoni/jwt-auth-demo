import axios from "axios";

const instance = axios.create({
  baseURL: "https://jwt-auth-starter.onrender.com/v1",
  // baseURL: "http://localhost:3001/v1",
  withCredentials: true,
});

export default instance;
