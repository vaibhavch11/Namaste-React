import { CDN_URL } from "../utils/constants";

const RestaurantCard = ({resData}) => {
    return (
       <div className="res-card" style={{backgroundColor:"#FEFEFF" }}>
          <img className="res-logo" alt="res-logo" src={CDN_URL + resData.data.cloudinaryImageId }/>
           <h3>{resData.data.name}</h3>
           <h5>{resData.data.cuisines.join(" , ")}</h5>

           <div className="extra-info">
             <h6 className="rating"> {resData.data.avgRating} ☆ </h6> 
             <h6>{resData.data.deliveryTime} MINS</h6> 
             <h6>{resData.data.costForTwoString} </h6>
           </div>

       </div>
    )
}

export default RestaurantCard;