import RestaurantCard from "./RestaurantCard";
import resObj from "../utils/mockData";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import Carousel from "./Carousel";
import useOnlineStatus from "../utils/useOnlineStatus";


const Body = () => {

  const [listOfRestaurants,setListOfRestaurants] = useState([]);
  const [filterRestaurant,setFilterRestaurant] = useState([]);

  const [carousel,setCarousel] = useState([]);

  // initionly we have to update out filterRestaurant in detching part while using useEffect.
  // we are avoid using setListOfRestaurants, instead of that we are using setFilterRestaurant to render our data.

  const [searchText,setSearchText] = useState("");
  

  useEffect(()=>{
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=29.9423253&lng=78.07232479999999&page_type=DESKTOP_WEB_LISTING");
    const json = await data.json();

    setListOfRestaurants(json?.data?.cards[2]?.data?.data?.cards);
    setFilterRestaurant(json?.data?.cards[2]?.data?.data?.cards);
    setCarousel(json?.data?.cards[0]?.data?.data?.cards);
 
  }

  const onlineStatus = useOnlineStatus();
  if(onlineStatus === false) return (<h1>Looks Like you're Offline !!</h1>);
  

    return listOfRestaurants.length === 0 ? <Shimmer/> : (
       <div className="body">
         
         <div className="carousel-Body">
              {carousel.map((item)=> (
                <div key={item.data.id}>
                  <Carousel carouselData={item}/>
                </div>

                
              ))}
           </div>


           <div className="filter">

            {/* filter the restaurant card & update the UI*/}
              <div className="search">
                <input type="text" className="search-box" placeholder="Enter Restaurant Name" value={searchText} onChange={(e)=>{setSearchText(e.target.value)}}/>
                <button className="search-button" onClick={()=>{
                  const filterRestaurant = listOfRestaurants.filter((res)=> res.data.name.toLowerCase().includes(searchText.toLowerCase()));
                  setFilterRestaurant(filterRestaurant);
                }}>Search</button>
              </div>

               <button className="filter-btn" onClick={()=>{
                const filterList = listOfRestaurants.filter((res) => res.data.avgRating > 4);
                setFilterRestaurant(filterList);
               }}>Rating: 4.0+</button>
           </div>

           <div className="res-container">
              {filterRestaurant.map((restaurant)=> (
                <Link className="card-link" key={restaurant.data.id} to={"restaurant/" + restaurant.data.id} >
                  <RestaurantCard  resData={restaurant}/>
                </Link>
              ))}
           </div>
       </div>
    )
}

export default Body;