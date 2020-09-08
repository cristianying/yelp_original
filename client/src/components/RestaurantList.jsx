import React,{useContext} from 'react'
import RestaurantFinder from "../API/RestaurantFinder"
import { RestaurantsContext } from '../context/RestaurantsContext'
import { useHistory } from 'react-router-dom'
import StarRating from './StarRating'


const RestaurantList = ({restaurants}) => {
    //desctructuring from context 
    const {setRestaurants} = useContext(RestaurantsContext)
    const {setSelectedRestaurant } = useContext(RestaurantsContext)

    let history = useHistory();

    
    
// useEffect( ()=> {
    //watch video at 3:32:00, which explains why it needs fetchData
    // const fetchData = async ()=> {

        
    //     try {
    //         const responce = await RestaurantFinder.get("/api/v1/restaurants", {
            
    //             headers: {token: localStorage.token}
    //        });

    //        //console.log("new json: " ,responce )
    //         setRestaurants(responce.data.data.restaurant);
            
    //         console.log(responce.data.data.restaurant);
    //     } catch (error) {
            
    //     }
    // }
    // fetchData();
// },[restaurants]);


const renderRating = (restaurant) =>{
    if(!restaurant.count){
        return <span className="text-warning">0 Reviews</span>
    }
    return(
        <>
            <StarRating rating = {restaurant.average_rating}/>
            <span className="text-warning ml-1">({restaurant.count})</span>
        </>

    )
    
}



const handleDelete = async (e,id) =>{
    e.stopPropagation();
    try {
        await RestaurantFinder.delete(`/api/v1/restaurants/${id}`);


        setRestaurants(restaurants.filter(restaurant => {
            return restaurant.restaurant_id !== id
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
    setSelectedRestaurant(null);
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
                {
                    restaurants.length !== 0 && 
                    restaurants[0].restaurant_id !== null && //if restaurant has data run below code
                    restaurants.map(restaurant =>{
                    return(
                    <tr onClick={()=>handleRestaurantSelect(restaurant.restaurant_id)} key={restaurant.restaurant_id} >
                        <td>{restaurant.name}</td>
                        <td>{restaurant.location}</td>
                        <td>{"$".repeat(restaurant.price_range)}</td>
                        <td>{renderRating(restaurant)}</td>
                        <td>
                            <button onClick={ (e) => handleUpdate(e,restaurant.restaurant_id)} className="btn btn-warning">Update</button>
                        </td>
                        <td>
                            <button onClick={ (e)=>handleDelete(e,restaurant.restaurant_id)} className="btn btn-danger">Delete</button>
                        </td>

                        
                    </tr>
                    )
                })}
                
            </tbody>
            </table>
        </div>
    )
}

export default RestaurantList
