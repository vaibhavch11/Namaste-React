import RestaurantCard from "./RestaurantCard";
import resObj from "../utils/mockData";
import { useEffect, useState , useContext} from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import Carousel from "./Carousel";
import useOnlineStatus from "../utils/useOnlineStatus";
// import UserContext from "../utils/UserContext";


const Body = () => {

  const [listOfRestaurants,setListOfRestaurants] = useState([]);
  const [filterRestaurant,setFilterRestaurant] = useState([]);

  const [carousel,setCarousel] = useState([]);

  // initionly we have to update out filterRestaurant in detching part while using useEffect.
  // we are avoid using setListOfRestaurants, instead of that we are using setFilterRestaurant to render our data.

  const [searchText,setSearchText] = useState("");

  //getting data from App.js. making our context-API data dynamic
  // const {user, setUser} = useContext(UserContext);
  

  useEffect(()=>{
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=30.3164945&lng=78.03219179999999&page_type=DESKTOP_WEB_LISTING");
    const json = await data.json();
    
    setListOfRestaurants(json?.data?.cards[2]?.data?.data?.cards);
    setFilterRestaurant(json?.data?.cards[2]?.data?.data?.cards);
    setCarousel(json?.data?.cards[0]?.data?.data?.cards);
 
  }

  const sortRestaurantsByPrice = () => {
    const sortedList = [...filterRestaurant].sort(
      (a, b) => a.data.costForTwo - b.data.costForTwo
    );
    setFilterRestaurant(sortedList);
  };
   
  console.log(filterRestaurant);

  const sortRestaurantsByTime = () => {
    const sortedList = [...filterRestaurant].sort(
      (a, b) => a.data.deliveryTime - b.data.deliveryTime
    );
    setFilterRestaurant(sortedList);
  };

  const sortRestaurantsByPureVeg = () => {
    const filterList = listOfRestaurants.filter((res) => res.data.veg == true);
    setFilterRestaurant(filterList);
  };

  const sortRestaurantsByNonVeg = () => {
    const filterList = listOfRestaurants.filter((res) => res.data.veg == false);
    setFilterRestaurant(filterList);
  };

  const onlineStatus = useOnlineStatus();
  if(onlineStatus === false) return (<h1>Looks Like you're Offline !!</h1>);
  
  if(listOfRestaurants.length === 0) return( <Shimmer/> );

    return (
       <div className="body">
         
         <div className="carousel-Body">

              {carousel.map((item)=> (
                <div key={item.data.id} >
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

              
              <button className="filter-btn" onClick={()=>sortRestaurantsByTime()}>
                  Delivery Time
              </button>

              <button className="filter-btn" onClick={()=>sortRestaurantsByPrice()}>
                     Sort by Price: Low To High
              </button>

              <button className="filter-btn veg" onClick={()=>sortRestaurantsByPureVeg()}>
                    Pure Veg
              </button>

              <button className="filter-btn non-veg" onClick={()=>sortRestaurantsByNonVeg()}>
                    Non Veg
              </button>
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