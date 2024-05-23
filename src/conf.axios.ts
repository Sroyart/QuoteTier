import axios from "axios";

const axiosCONFIG = axios.create({
  baseURL: "http://localhost:8080/api",
  timeout: 1000,
});

axiosCONFIG.defaults.headers.post["Content-Type"] = "application/json";

export default axiosCONFIG;
