import { useEffect, useState } from "react"
import Shimmer from "./Shimmer";
import { MENU_Images } from "../utils/constants";
import { useParams } from "react-router-dom";
import { MENU_API_URL } from "../utils/constants";

const RestaurantMenu = () => {

    const [resInfo, setResInfo] = useState(null);

    const {resId} = useParams();

    useEffect(()=>{
       fetchData();
    },[]);

    const fetchData = async () => {
        const data = await fetch(MENU_API_URL + resId );
        const json = await data.json();
        setResInfo(json.data);
    }

    if(resInfo == null){
        return <Shimmer />;
    }
    
    //extra added
    const {name, cuisines , costForTwoMessage , areaName , city , avgRating} = resInfo?.cards[0]?.card?.card?.info;

    const {itemCards} = resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card.card;
    console.log(itemCards);
    

  return (
    <div className="RestaurantMenu-items">
     
      <div className="Restaurant-Details">
        <div className="Details-A">
          <h1>{name}</h1>
          <h5>{cuisines.join(", ")}</h5>
          <h5>{areaName} , {city}</h5>
        </div>

        <div className="Details-B">
         <h4 > {avgRating} ☆ </h4> 
        </div>
        
      </div>
      <hr className="horizontal-line" />
     

          {itemCards.map((item) => (
            <div key={item.card.info.id} className="Recomm-items">
              <div className="container-A">
                  <h3>{item.card.info.name} - {" Rs."}
                  {item.card.info.price/100}</h3>
                  <p>{item.card.info.description}</p>
              </div>

              <div className="container-B">
                <img src={MENU_Images + item?.card?.info?.imageId} />
              </div>

            </div>
           
          ))}

    </div>
  )
}

export default RestaurantMenu