import axios from "axios";
require('dotenv').config();

export default axios.create({

    baseURL: process.env.POSTG_URL || "http://localhost:4001",
}) 

