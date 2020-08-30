import React, {useState,useEffect} from 'react'
import { useParams, useHistory } from 'react-router-dom'
import RestaurantFinder from '../API/RestaurantFinder';

const UpdateRestaurant = () => {
    //useParams gets the ID in the URL
    const {id} = useParams();
    const [name,setName] = useState("");
    const [location,setLocation] = useState("");
    const [priceRange,setPriceRange] = useState("");
    let history = useHistory()

    //not using context because if you go directly to the URL
    //without going first to the homepage it will throw an error
    //but by getting it from the server directly it will be ok
    //more info video  4:15:20
    useEffect(() => {
        
        const fetchData = async () => {
            const res =await RestaurantFinder.get(`/${id}`);
            setName(res.data.data.restaurant.name);
            setLocation(res.data.data.restaurant.location);
            setPriceRange(res.data.data.restaurant.price_range);
        }
        fetchData();
    }, [id,setName,setLocation,setPriceRange])
    
    const handleSubmit = async (e) =>{
        e.preventDefault()

        await RestaurantFinder.put(`/${id}`,{
            name,
            location,
            price_range: priceRange
        });
        history.push("/");
    }
    return (
        <div>
            <form action="" >
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        id="name" 
                        className="form-control" 
                        type="text"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="location">location</label>
                    <input 
                        value={location} 
                        onChange={(e) => setLocation(e.target.value)} 
                        id="location" 
                        className="form-control" 
                        type="text"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="price_range">Price Range</label>
                    <input 
                        value={priceRange} 
                        onChange={(e) => setPriceRange(e.target.value)} 
                        id="price_range" 
                        className="form-control" 
                        type="number"/>
                </div>
                <button type="submit" onClick={handleSubmit} className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default UpdateRestaurant
