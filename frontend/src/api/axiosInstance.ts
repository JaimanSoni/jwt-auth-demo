import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3001/v1",
  withCredentials: true,
});

export default instance;
