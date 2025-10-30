import axios from "axios";

export const api = axios.create({
  baseURL: "https://localhost:5011/api", // backend adresi
  headers: {
    "Content-Type": "application/json",
  },
});
