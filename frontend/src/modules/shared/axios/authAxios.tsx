import axios from "axios";

const authAxios = axios.create({
  baseURL: "http://localhost:8080/api",
});

axios.interceptors.request.use(
  async function (options) {
    const token = "123456";

    if (token) {
      options.headers["Authorization"] = `Bearer ${token}`;
    }

    return options;
  },
  function (error) {
    console.log("Request error", error);
    return Promise.reject(error);
  }
);

export default authAxios;
