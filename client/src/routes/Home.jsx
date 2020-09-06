import React, {  useState,useEffect,useContext } from 'react'
import { toast } from 'react-toastify'
import Header from '../components/Header'
import AddRestaurant from '../components/AddRestaurant'
import RestaurantList from '../components/RestaurantList'
import { RestaurantsContext } from '../context/RestaurantsContext'
import RestaurantFinder from "../API/RestaurantFinder"

const Home = ({setAuth}) => {
    
    const [name, setName]=useState("");
    const {restaurants,setRestaurants} = useContext(RestaurantsContext);

    // const getName = async () =>{
    //     try {
    //         const res = await fetch("http://localhost:4001/dashboard",{
    //             method: "GET",
    //             headers: {token: localStorage.token}

    //         });

    //         const parseRes = await res.json();
    //         console.log(parseRes);

    //         setName(parseRes.user_name);
    //     } catch (err) {
    //         console.error(err.message);
    //     }
    // }
    



    const logout = (e) => {
        e.preventDefault()

        try {
            localStorage.removeItem("token");
            setAuth(false);
            toast.success("Logout successfully");
          } catch (err) {
            console.error(err.message);
          }
    }
    
    useEffect(()=>{
        const fetchData = async ()=> {
        
            try {
                const responce = await RestaurantFinder.get("/api/v1/restaurants", {
                
                    headers: {token: localStorage.token}
               });
    
               //console.log("new json: " ,responce )
               if(responce.data.data.restaurant[0].restaurant_id !== null){
                setRestaurants(responce.data.data.restaurant);
               }
                
                setName(responce.data.data.restaurant[0].user_name);
                
                //console.log("first value", responce.data.data.restaurant[0].user_name);
            } catch (error) {
                console.log(error);
            }
        }

        fetchData()
        //getName()
    },[setRestaurants])

    
    return (
        <div>
            <h1>Welcome {name}</h1>
            <Header/>
            <AddRestaurant/>
            <RestaurantList restaurants={restaurants}/>
            <button className="btn btn-primary" onClick={e=>logout(e)}>Logout</button>
        </div>
    )
    
}

export default Home
