import Shimmer from "./Shimmer";
import { MENU_Images } from "../utils/constants";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import { useState } from "react";
import { MENU_Images } from "../utils/constants";
import { addItem} from "../utils/cartSlice";
import { useDispatch} from "react-redux";

const RestaurantMenu = () => {


    const {resId} = useParams();

    //"Custom Hook"
    const resInfo = useRestaurantMenu(resId);

    if(resInfo == null){ return <Shimmer />; }

    console.log(resInfo);
    
    //extra added
    const {name, cuisines , costForTwoMessage , areaName , city , avgRating, totalRatingsString} = resInfo?.cards[0]?.card?.card?.info;

    //after || this is for mobile view data
    const {itemCards,title} = resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card || resInfo?.cards[3]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card;
    
    // console.log(itemCards);

    //for coupon
    const {offers} = resInfo?.cards[1]?.card?.card?.gridElements?.infoWithStyle;


    
    //--------Redux--------------
    const dispatch = useDispatch();

    const addFoodItem = (item) => {
       dispatch(addItem(item));
    }


  return (
    <div className="RestaurantMenu-items">
     
      <div className="Restaurant-Details">
        <div className="Details-A">
          <h1>{name}</h1>
          <h5>{cuisines.join(", ")}</h5>
          <h5>{areaName} , {city}</h5>

          <h4>{resInfo?.cards[0]?.card?.card?.info?.feeDetails?.message}</h4>
        </div>

        <div className="Details-B">
          <div className="right-side">
            <p className="avgRating"> {avgRating} ☆ </p> 
          </div>
         
         <p className="Review">{totalRatingsString}</p>
        </div>
        
      </div>


       <div className="RestaurantOffer-container">   
          {offers.map((item)=>(
          <div className="RestaurantOffer-outercontainer">
            <div className="RestaurantOffer-innercontainer">
              <div className="offerBox"> 
                <p className="offereader">
                  <img src={MENU_Images + item.info.offerLogo} className="RestaurantOfferIcon"/>
                  {item.info.header}
                {item.info.offerTag}
                </p> 

                <p className="offerBody">
                 {item.info.couponCode} | {item.info.description}
                </p>
              </div>
              </div>
          </div>
          ))}
          
      </div> 
      

      {/* <hr className="horizontal-line" /> */}
     
        <div className="Recomm-items"></div>

           <h1>{title}</h1>
           
          {itemCards.map((item) => (
            <div key={item.card.info.id} className="">
              <div className="container-A">
                
                <div className="item-body">

                  <div className="item-title">{item?.card?.info?.name} - {" Rs."} </div>
                  <div className="rate"> {item?.card?.info?.price/100 || item?.card?.info?.defaultPrice/100} </div>
                  <div className="description"> {item?.card?.info?.description} </div>
                  <p></p>
                </div>

               <div className="item-pic">
                 <img src={MENU_Images + item?.card?.info?.imageId} />

                <button className="add-btn" onClick={()=>addFoodItem(item)}> ADD </button>
                  
                 
                </div>
               </div>
            </div>
           
          ))}

    </div>
  )
}

export default RestaurantMenu