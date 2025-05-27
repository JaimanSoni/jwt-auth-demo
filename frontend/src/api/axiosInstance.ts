import axios from "axios";

const NODE_ENV = import.meta.env.VITE_NODE_ENV;
const instance = axios.create({
  baseURL:
    NODE_ENV === "development"
      ? import.meta.env.VITE_DEV_SERVER_URL
      : import.meta.env.VITE_PROD_SERVER_URL,
  withCredentials: true,
});

export default instance;
