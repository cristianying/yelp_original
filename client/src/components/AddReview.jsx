import React, {useState,useContext} from 'react'
import RestaurantFinder from '../API/RestaurantFinder'
import { useParams } from 'react-router-dom'
import {RestaurantsContext} from "../context/RestaurantsContext"

const AddReview = () => {
    //useparams get id from current URL
    const {id}=useParams();

    const {addReviews} = useContext(RestaurantsContext);
    const [name,setName] = useState("")
    const [reviewText,setReviewText] = useState("")
    const [rating, setRating] = useState("Rating")
    //const {selectedRestaurant,setSelectedRestaurant } = useContext(RestaurantsContext)

    
    const handleSubmitReview = async (e) => {
        e.preventDefault()
        if(name && reviewText && rating){
        try {
               const responce = await RestaurantFinder.post(`/api/v1/restaurants/${id}/addReview`,{
                name,
                review: reviewText,
                rating
            })

            addReviews(responce.data.data.review);
            
            
        } catch (error) {
            console.log(error)
        }
    } else {} 
        
    }
    return (
        <div className="mb-2">
            <form action="">
                <div className="form-row">
                    <div className="form-group col-8">
                        <label htmlFor="name">Name</label>
                        <input 
                            value={name}
                            onChange={e => setName(e.target.value)}
                            id="name" 
                            placeholder="name" 
                            className="form-control"/>
                    </div>
                    <div className="form-group col-4">
                        <label htmlFor="rating">Rating</label>
                        <select 
                            value={rating}
                            onChange={e => setRating(e.target.value)}
                            id="rating" 
                            className="custom-select">
                            <option disabled>Rating</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="Review">Review</label>
                    <textarea
                        value={reviewText}
                        onChange={e => setReviewText(e.target.value)} 
                        id="review" 
                        className="form-control"></textarea>
                </div>
                <button onClick={handleSubmitReview} className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default AddReview
