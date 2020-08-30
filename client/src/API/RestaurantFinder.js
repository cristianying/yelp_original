import axios from "axios";

export default axios.create({

    baseURL: process.env.POSTG_URL || "http://localhost:4001",
}) 

