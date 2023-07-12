import { CDN_URL } from "../utils/constants";

const FoodItems = ({Itemdata}) => {


     
    // console.log(Itemdata);
    return (
        <>
        <div className="res-card" >
        <img className="res-logo" alt="res-logo" src={CDN_URL + Itemdata.imageId }/>
         <h3>{Itemdata.name}</h3>

         <h5 >{Itemdata.category}</h5>
         <h4>Price : ₹{Itemdata.price/100} </h4> 
         
     </div>

     
     </>
    )
}

export default FoodItems;