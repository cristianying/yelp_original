import axios from "axios";
require('dotenv').config();


const connectURL=process.env.POSTG_URL || "http://localhost:4001";
console.log(process.env.POSTG_URL);

export default axios.create({

    baseURL: "",
}) 

