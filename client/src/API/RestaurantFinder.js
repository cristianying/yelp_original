import axios from "axios";

export default axios.create({

    baseURL: process.env.DATABASE_URL.anchor("/api/v1/restaurants") || "http://localhost:4001/api/v1/restaurants",
}) 

