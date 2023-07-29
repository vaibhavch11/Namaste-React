import UserContext from "../utils/UserContext";
import { CDN_URL } from "../utils/constants";
import { useContext } from "react";

const RestaurantCard = ({resData}) => {


  const setBg = (resData) => {
    if (resData.info.avgRating >= 4) {
      return "greenbg";
    } else if (resData.info.avgRating >= 3) {
      return "orangebg";
    } else if (resData.info.avgRating >= 2) {
      return "yellowbg";
    } else if (resData.info.avgRating >= 1) {
      return "redbg";
    } else {
      return "greybg";
    }
  };

  // const {user} = useContext(UserContext);
    return (
       <div className="res-card" style={{backgroundColor:"#FEFEFF" }}>
          <img className="res-logo" alt="res-logo" src={CDN_URL + resData.info.cloudinaryImageId }/>
           <h3>{resData.info.name}</h3>
           <h5 className="cuisines">{resData.info.cuisines.join(" , ")}</h5>

           <div className="extra-info">
             <h6 className= {setBg(resData)} > ☆ {resData.info.avgRating}  </h6> 
             <h6>{resData.info.sla.deliveryTime} MINS</h6> 
             <h6>{resData.info.costForTwo} </h6>
           </div>
           {/* <h6>{user.name}</h6> */}

       </div>
    )
}

export default RestaurantCard;