import React,{useContext,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import {RestaurantsContext} from "../context/RestaurantsContext";
import RestaurantFinder from '../API/RestaurantFinder';
import StarRating from '../components/StarRating';
import Reviews from '../components/Reviews';
import AddReview from '../components/AddReview';

const RestaurantsDetailPage = () => {
    const {id}=useParams()
    const {selectedRestaurant,setSelectedRestaurant } = useContext(RestaurantsContext)
    const {reviews,setReviews } = useContext(RestaurantsContext)
    
    
    useEffect(() => {
        const fetchData = async ()=>{
            try {
                const res = await RestaurantFinder.get(`/api/v1/restaurants/${id}`);
                setSelectedRestaurant(res.data.data)
                setReviews(res.data.data.reviews)
                //console.log(res.data.data)
            } catch (error) {
                console.log(error)
            }
           
        }; 
        fetchData();
    },[id,setSelectedRestaurant,setReviews])

    return (
        <div>
            {selectedRestaurant && (
               <>
               <h1 className="text-center display-1">
                {selectedRestaurant.restaurant.name}
               </h1>
               <div className="text-center">
                   <StarRating rating={selectedRestaurant.restaurant.average_rating}/>
                   <span className="text-warning ml-1">
                    {selectedRestaurant.restaurant.count
                    ? `(${selectedRestaurant.restaurant.count})` 
                    : "(0)"}
                   </span>
               </div>
               <div className="mt-3">
                   <Reviews reviews={reviews}/>
               </div>
               <AddReview/>
               </> 
            )}
        </div>
    )
            }

export default RestaurantsDetailPage
