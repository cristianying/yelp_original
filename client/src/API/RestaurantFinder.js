import axios from "axios";

export default axios.create({

    baseURL: process.env.DATABASE_URL || "http://localhost:4001",
}) 

