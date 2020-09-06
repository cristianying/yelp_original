import React, {  useState,useEffect } from 'react';

import {BrowserRouter as Router, Switch, Route,Redirect} from "react-router-dom";
import Home from "./routes/Home";
import UpdatePage from "./routes/UpdatePage";
import RestaurantsDetailPage from "./routes/RestaurantsDetailPage";
import { RestaurantsContextProvider } from './context/RestaurantsContext';
import Login from "./routes/Login";
import Register from "./routes/Register";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RestaurantFinder from './API/RestaurantFinder';
toast.configure();



const App = () => {
    const [mounted, setMounted] = useState(false)
    const [isAuthenticated, setIsAuthenticated]=useState(false);

    const isAuth = async() =>{

        try {
            //console.log("localStorage.token: ", !!localStorage.token);
            
            if(localStorage.token){
                
                const res = await RestaurantFinder.get("/auth/is-verify", {
                    headers: {token: localStorage.token}
                   })

            //console.log("new json: " ,res )

            const parseRes = await res.data;

            parseRes === true ? setIsAuthenticated(true):
            setIsAuthenticated(false);
            
        }
        setMounted(true)
        } catch (error) {
            console.error(error.message);
        }
    }

// if(!mounted){
//     //console.log("!mounted")
//     isAuth();
// }

useEffect(() => {

    isAuth();
},[])

    const setAuth = (boolean) =>{
        setIsAuthenticated(boolean);
    }

    

if(mounted){
    return( 
   
    <RestaurantsContextProvider>

    <div className="container">
        <Router>
            <Switch>
                
                {/* <Route exact path='/' component={Home}/> */}
                {/* <Route exact path='/restaurants/:id/update' component={UpdatePage}/> */}
                {/* <Route exact path='/restaurants/:id' component={RestaurantsDetailPage}/> */}
                
                {/* why we use render: video 11:45 */}
                <Route 
                    exact path='/login' 
                    render= {props => 
                        !isAuthenticated ? (
                            <Login {...props} setAuth={setAuth}/>
                        ) : (
                            <Redirect to ="/" />
                            )
                        }/>

                <Route 
                    exact path='/register' 
                    render= {props => 
                        !isAuthenticated ? (
                            <Register {...props} setAuth={setAuth}/>
                        ) : (
                            <Redirect to ="/login" />
                            )
                        }/>
                <Route 
                    exact path='/' 
                    render={props => 
                        isAuthenticated ? (
                            <Home {...props} setAuth={setAuth}/>
                        ) : (
                            <Redirect to="/login"/>
                            )
                        }/>
                <Route 
                    exact path='/restaurants/:id' 
                    render={props => 
                        isAuthenticated ? (
                            <RestaurantsDetailPage {...props} setAuth={setAuth}/>
                        ) : (
                            <Redirect to="/login"/>
                            )
                        }/>


                <Route 
                    exact path='/restaurants/:id/update' 
                    render={props => 
                        isAuthenticated ? (
                            <UpdatePage {...props} setAuth={setAuth}/>
                        ) : (
                            <Redirect to="/login"/>
                            )
                        }/>
            </Switch>
        </Router>
    
 
    </div>
    </RestaurantsContextProvider>
     
    
            )
        } else {

            return(
                <></>
                )}
}

export default App;