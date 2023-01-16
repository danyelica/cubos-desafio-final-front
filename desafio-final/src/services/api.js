import axios from "axios";

export default axios.create({
  baseURL: "https://back-desafio-final-dany.up.railway.app",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
