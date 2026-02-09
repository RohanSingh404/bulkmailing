import axios from "axios";

const API = axios.create({
  baseURL:
    window.location.hostname === "localhost"
      ? "http://localhost:3100"
      : "https://massswapsomailer-m3hql91c0-rohansinghiitian6395-4082s-projects.vercel.app",
});

export default API;
