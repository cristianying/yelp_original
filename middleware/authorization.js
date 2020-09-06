const jwt = require("jsonwebtoken");
require("dotenv").config();


module.exports = async (req,res,next) =>{

    try {
        const jwtToken = req.header("token");
        //console.log("Token from auth server: ",jwtToken);
        

        if (!jwtToken){
            return res.status(403).json("not authorized");
        }
        
        const payload= jwt.verify(jwtToken, process.env.jwtSecret);
        req.user = payload.user;

        //console.log("from Authorized: ",req.body);

        next();

    } catch (error) {
        console.log(error)
        return res.status(403).json("Not Authorized");
    }


}