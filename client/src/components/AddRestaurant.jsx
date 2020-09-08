import React, {useState, useContext} from 'react'
import RestaurantFinder from "../API/RestaurantFinder"
import {RestaurantsContext} from "../context/RestaurantsContext"
import {Button} from '@material-ui/core';

const AddRestaurant = () => {

    const {addRestaurants} = useContext(RestaurantsContext);
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [price_range, setPriceRange] = useState("Price Range");

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {

            // const body = { 
            //     name,
            //     location,
            //     price_range };
            //     const myHeaders = new Headers();

            //     myHeaders.append("Content-Type", "application/json");
            //     myHeaders.append("token", localStorage.token);
            // console.log("FROM ADD RESTAURANT token:",localStorage.token)
            // console.log("FROM ADD RESTAURANT myHeaders:",myHeaders)
            
            // const responce = await fetch("http://localhost:4001/api/v1/restaurants",{
            //     method: "POST",
            //     headers: myHeaders,
            //     body: JSON.stringify(body)
            // }); 

            const responce = await RestaurantFinder.post("/api/v1/restaurants", 
                { 
                    name,
                    location,
                    price_range 
                },

                {  
                headers: {token: localStorage.token},
                });
            
              
            //const parseRes= await responce.json();
            //console.log("hellooo:",parseRes)

            // console.log("hellooo:",parseRes.data.restaurant)
            // addRestaurants(parseRes.data.restaurant);
            addRestaurants(responce.data.data.restaurant);
            //console.log("1: ",responce.data.data.restaurant )
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="mb-4">
            <form action="">
                <div className="form-row">
                    <div className="col-4">
                        <input 
                            value={name} 
                            onChange={e=>setName(e.target.value)} 
                            type="text" 
                            className="form-control" 
                            placeholder="name"
                        />
                    </div> 
                    <div className="col-4">
                        <input 
                            value={location} 
                            onChange={(e)=>setLocation(e.target.value)}
                            type="text" 
                            className="form-control" 
                            placeholder="location"
                        />
                    </div> 
                    <div className="col-2">
                        <select 
                            value={price_range} 
                            onChange={(e)=>setPriceRange(e.target.value)}
                            className="custom-select mr-sm-2"
                        >
                            <option disabled>Price Range </option>
                            <option value="1">$</option>
                            <option value="2">$$</option> 
                            <option value="3">$$$</option>
                            <option value="4">$$$$</option>
                        </select>
                    </div>
                    <Button onClick={handleSubmit} color="primary" variant="contained">Add</Button>  
                    {/* <button onClick={handleSubmit} type="submit" className="btn btn-primary">Add</button>   */}
                </div>   

            </form>
        </div>
    )
}

export default AddRestaurant
