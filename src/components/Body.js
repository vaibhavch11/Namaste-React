import RestaurantCard from "./RestaurantCard";
import resObj from "../utils/mockData";
import { useEffect, useState , useContext} from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
// import UserContext from "../utils/UserContext";
import { Carousel_img } from '../utils/constants'


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
    const data = await fetch("https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=30.3164945&lng=78.03219179999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
                                                     
    const json = await data.json();

    console.log(json);
    
    setListOfRestaurants(json?.data?.cards[5]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    setFilterRestaurant(json?.data?.cards[5]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    setCarousel(json?.data?.cards[0]?.card?.card?.gridElements?.infoWithStyle?.info);
 
  }

  const sortRestaurantsByPrice = () => {
    const sortedList = [...filterRestaurant].sort(
      (a, b) => a.info.costForTwo.match(/\d+/g) - b.info.costForTwo.match(/\d+/g)
    );
    setFilterRestaurant(sortedList);
  };
   
  console.log(filterRestaurant);

  const sortRestaurantsByTime = () => {
    const sortedList = [...filterRestaurant].sort(
      (a, b) => a.info.sla.deliveryTime - b.info.sla.deliveryTime
    );
    setFilterRestaurant(sortedList);
  };

  // const sortRestaurantsByPureVeg = () => {
  //   const filterList = listOfRestaurants.filter((res) => res.data.veg == true);
  //   setFilterRestaurant(filterList);
  // };


  const onlineStatus = useOnlineStatus();
  if(onlineStatus === false) return (<h1>Looks Like you're Offline !!</h1>);
  
  if(listOfRestaurants.length === 0) return( <Shimmer/> );

    return (
       <div className="body">
         
         {/* carousel-Body */}

         <div className="carousel-box">
         {/* RestaurantOffer-container */}
         <div className=" carouselOuter-Box">

         {carousel.map((item)=> (
          <div className="carouselInner-Box" key={item.id} >
            <img className="carousel-img" alt="carousel-logo" src={Carousel_img + item.imageId }/>
         </div>
         ))}                

</div>
         </div>
         



           <div className="filter">

            {/* filter the restaurant card & update the UI*/}
              <div className="search">
                <input type="text" className="search-box" placeholder="Enter Restaurant Name" value={searchText} onChange={(e)=>{setSearchText(e.target.value)}}/>
                <button className="search-button" onClick={()=>{
                  const filterRestaurant = listOfRestaurants.filter((res)=> res.info.name.toLowerCase().includes(searchText.toLowerCase()));
                  setFilterRestaurant(filterRestaurant);
                }}>Search</button>
              </div>


               <button className="filter-btn" onClick={()=>{
                const filterList = listOfRestaurants.filter((res) => res.info.avgRating > 4);
                setFilterRestaurant(filterList);
               }}>Rating: 4.0+</button>

              
              <button className="filter-btn" onClick={()=>sortRestaurantsByTime()}>
                  Delivery Time
              </button>

              <button className="filter-btn" onClick={()=>sortRestaurantsByPrice()}>
                     Sort by Price: Low To High
              </button>

              {/* <button className="filter-btn veg" onClick={()=>sortRestaurantsByPureVeg()}>
                    Pure Veg
              </button> */}
           </div>

           <div className="res-container">
              {filterRestaurant.map((restaurant)=> (
                <Link className="card-link" key={restaurant.info.id} to={"restaurant/" + restaurant.info.id} >
                  <RestaurantCard  resData={restaurant}/>
                </Link>
              ))}
           </div>
       </div>
    )
}

export default Body;