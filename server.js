require("dotenv").config();

const db =require("./db/index.js");
const cors=require("cors");
const express =require("express");
//morgan is a middleware
const morgan = require ("morgan");
const app= express();
const path = require("path");
const PORT = process.env.PORT || 4001;

app.use(cors());
app.use(express.json());//req.body




//app.use(express.static(path.join(__dirname, "client/build")));
if (process.env.NODE_ENV === "production") {
    //server static content
    //npm run build
    app.use(express.static(path.join(__dirname, "client/build")));
  }

//reigster and login routes
  app.use("/auth", require("./routes/jwtAuth"));


  // restaurants routes
  app.use("/api/v1/restaurants", require("./routes/restaurants"));
  

//listen to the global variable in .env file, if not available listen to 3001
//const port= process.env.PORT || 3001;

app.listen(PORT,()=>{
    console.log(`server listening to ${PORT}`);
});