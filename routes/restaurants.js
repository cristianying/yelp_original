const router = require("express").Router();
const db =require("../db/index.js");

const authorization = require("../middleware/authorization");

//get all restaurnts
router.get("/",authorization, async (req,res) => { 

    
    try{
        //const results= await db.query("select * from restaurants");
        //console.log("get all restaurants user: ", req.user);
        //console.log("from user from restaurnts get:",req.user.id);
        const restaurantRatingsData= await db.query(
            "select restaurants.restaurant_id,name,user_name,location,price_range,users.user_id, count,average_rating from restaurants left join (select restaurant_id, COUNT(*) as count, TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.restaurant_id=reviews.restaurant_id right join users on users.user_id=restaurants.user_id WHERE users.user_id=$1;",
            [req.user.id]);
        
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
router.get("/:restid",async (req,res)=>{
    //console.log(req.params.restid);
    
    try{
        const restaurant= await db.query(
            //$1, $2, $3.... replaces the next strings after the comma
            //this prevent sql injections
            "select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.restaurant_id=reviews.restaurant_id where restaurants.restaurant_id=$1;", [req.params.restid]
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
        console.log(err);
    }




});


//create a restaurant
router.post("/",authorization, async (req,res) => { 

    //req.body is give thanks to the middleware of express
    //it attaches the json from the request
    //console.log(req.body);
    // console.log("from user from create rest post:",req.user.id);
    // console.log("from body from create rest post:",req.body);
    try{
        
        const results= await db.query(
            //$1, $2, $3.... replaces the next strings after the comma
            //this prevent sql injections
            "INSERT INTO restaurants (user_id, name, location, price_range) values ($1, $2, $3,$4) returning *" ,
            [req.user.id, req.body.name, req.body.location, req.body.price_range]
            );
        //console.log(results);

        res.status(201).json({
            status: "Success",
            data: {
                restaurant: results.rows[0],
            },
        });

        //console.log("from server: ",req.body.name);
    } catch (err){
        console.log(err);
    }
});

//update retaurant

router.put("/:id",async(req,res)=>{
    try{
        const results= await db.query(
            //$1, $2, $3.... replaces the next strings after the comma
            //this prevent sql injections
            "UPDATE restaurants SET name=$1, location=$2, price_range =$3 where restaurant_id=$4 returning *" ,
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

router.delete("/:id", async(req,res)=>{
    try{
        const results= await db.query(

            "DELETE FROM restaurants where restaurant_id=$1" ,
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

router.post("/:id/addReview", async(req,res)=>{
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

module.exports= router;