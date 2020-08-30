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
app.use(express.json());
//app.use(express.static(path.join(__dirname, "client/build")));
if (process.env.NODE_ENV === "production") {
    //server static content
    //npm run build
    app.use(express.static(path.join(__dirname, "client/build")));
  }

//get all restaurnts
app.get("/api/v1/restaurants", async (req,res) => { 
    try{
        //const results= await db.query("select * from restaurants");

        const restaurantRatingsData= await db.query(
            "select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id=reviews.restaurant_id;");
        
        //console.log("results",results);
        //console.log("Ratings",restaurantRatingsData);
        
        res.status(200).json({
            status: "Success",
            results: restaurantRatingsData.rows.length,
            data: {
                restaurant: restaurantRatingsData.rows,
            },
        });
    } catch (err){
        console.log(err);
    }
});

//get a restaurant
app.get("/api/v1/restaurants/:restid",async (req,res)=>{
    //console.log(req.params.restid);
    
    try{
        const restaurant= await db.query(
            //$1, $2, $3.... replaces the next strings after the comma
            //this prevent sql injections
            "select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id=reviews.restaurant_id where id=$1;", [req.params.restid]
            );

        const reviews= await db.query(
            //$1, $2, $3.... replaces the next strings after the comma
            //this prevent sql injections
            "select * from reviews where restaurant_id=$1", [req.params.restid]
            );


        //console.log(results);
        res.status(200).json({
            status: "Success",
            data: {
                restaurant: restaurant.rows[0],
                reviews: reviews.rows
            },
        });
    } catch (err){
        console.log("whyy");
    }




});


//create a restaurant

app.post("/api/v1/restaurants",async(req,res)=>{
    //req.body is give thanks to the middleware of express
    //it attaches the json from the request
    //console.log(req.body);
    try{
        const results= await db.query(
            //$1, $2, $3.... replaces the next strings after the comma
            //this prevent sql injections
            "INSERT INTO restaurants (name,location, price_range) values ($1, $2, $3) returning *" ,
            [req.body.name, req.body.location, req.body.price_range]
            );
        //console.log(results);
        res.status(201).json({
            status: "Success",
            data: {
                restaurant: results.rows[0],
            },
        });
        //console.log(results);
    } catch (err){
        console.log(err);
    }
});

//update retaurant

app.put("/api/v1/restaurants/:id",async(req,res)=>{
    try{
        const results= await db.query(
            //$1, $2, $3.... replaces the next strings after the comma
            //this prevent sql injections
            "UPDATE restaurants SET name=$1, location=$2, price_range =$3 where id=$4 returning *" ,
            [req.body.name, req.body.location, req.body.price_range, req.params.id]
            );
        //console.log(results);
        res.status(200).json({
            status: "Success",
            data: {
                restaurant: results.rows[0],
            },
        });
        //console.log(results);
    } catch (err){
        console.log(err);
    }
});


//delete restaurant

app.delete("/api/v1/restaurants/:id", async(req,res)=>{
    try{
        const results= await db.query(

            "DELETE FROM restaurants where id=$1" ,
            [req.params.id]
            );
        //console.log(results);
        res.status(204).json({
            status: "Success",
        });
        //console.log(results);
    } catch (err){
        console.log(err);
    }
});

app.post("/api/v1/restaurants/:id/addReview", async(req,res)=>{
    try{
        const results = await db.query(

            "INSERT INTO reviews (restaurant_id, name, review, rating) values ($1, $2, $3, $4) returning *;",
            [req.params.id, req.body.name, req.body.review,req.body.rating]
            );
        //console.log(results);
        res.status(201).json({
            status: "Success",
            data: {
                review: results.rows[0]
            }
        });
        //console.log(results);
    } catch (err){
        console.log(err);
    }
});

//listen to the global variable in .env file, if not available listen to 3001
//const port= process.env.PORT || 3001;

app.listen(PORT,()=>{
    console.log(`server listening to ${PORT}`);
});