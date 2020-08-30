import React,{useEffect,useContext} from 'react'
import RestaurantFinder from "../API/RestaurantFinder"
import { RestaurantsContext } from '../context/RestaurantsContext'
import { useHistory } from 'react-router-dom'
import StarRating from './StarRating'


const RestaurantList = () => {
    //desctructuring from context 
    const {restaurants,setRestaurants} = useContext(RestaurantsContext)

    let history = useHistory();

useEffect( ()=> {
    //watch video at 3:32:00, which explains why it needs fetchData
    const fetchData = async ()=> {
        try {
            const responce = await RestaurantFinder.get("/");
            setRestaurants(responce.data.data.restaurant);
            //console.log(restaurant);
        } catch (error) {
            
        }
    }
    fetchData();
},[setRestaurants]);


const renderRating = (restaurant) =>{
    if(!restaurant.count){
        return <span className="text-warning">0 Reviews</span>
    }
    return(
        <>
            <StarRating rating = {restaurant.id}/>
            <span className="text-warning ml-1">({restaurant.count})</span>
        </>

    )
    
}




const handleDelete = async (e,id) =>{
    e.stopPropagation();
    try {
        await RestaurantFinder.delete(`/${id}`);
        setRestaurants(restaurants.filter(restaurant => {
            return restaurant.id !== id
        }))
    } catch (error) {
        console.log(error);
        
    }
}

const handleUpdate = (e,id) => {
    e.stopPropagation();
    history.push(`/restaurants/${id}/update`)
};

const handleRestaurantSelect = (id) =>{
    history.push(`/restaurants/${id}`);
}
    return (
        <div className="list-group">
            <table className="table table-hover table-dark">
               <thead>
                   <tr className="bg-primary">
                        <th scope="col">Restaurant</th>
                        <th scope="col">Location</th>
                        <th scope="col">Price Range</th>
                        <th scope="col">Ratings</th>
                        <th scope="col">Edit</th>   
                        <th scope="col">Delete</th>
                   </tr>
               </thead> 
            <tbody>
                {restaurants && //if restaurant has data run below code
                    restaurants.map(restaurant =>{
                    return(
                    <tr onClick={()=>handleRestaurantSelect(restaurant.id)} key={restaurant.id} >
                        <td>{restaurant.name}</td>
                        <td>{restaurant.location}</td>
                        <td>{"$".repeat(restaurant.price_range)}</td>
                        <td>{renderRating(restaurant)}</td>
                        <td>
                            <button onClick={ (e) => handleUpdate(e,restaurant.id)} className="btn btn-warning">Update</button>
                        </td>
                        <td>
                            <button onClick={ (e)=>handleDelete(e,restaurant.id)} className="btn btn-danger">Delete</button>
                        </td>

                        
                    </tr>
                    )
                })}
                {/* <tr>
                   <td>Mcdonalds</td>
                   <td>NY</td> 
                   <td>$$</td> 
                   <td>Ratings</td>  
                   <td><button className="btn btn-warning">Updates</button></td> 
                   <td><button className="btn btn-danger">Delete</button></td> 
                </tr> */}
            </tbody>
            </table>
        </div>
    )
}

export default RestaurantList
