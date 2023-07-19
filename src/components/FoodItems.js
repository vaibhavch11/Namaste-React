import { CDN_URL } from "../utils/constants";

const FoodItems = ({Itemdata}) => {


     
    // console.log(Itemdata);
    return (
        <>
        <div className="cart-items" >
            <div className="logo-section"> 
              <img className="res-logo" alt="res-logo" src={CDN_URL + Itemdata.imageId }/>
            </div>

            <div className="details-section">
              <h3>{Itemdata.name}</h3>
             <h5 >{Itemdata.category}</h5>
            </div>

            <div>
            <h4>Price : ₹{Itemdata.price/100 || Itemdata.defaultPrice/100} </h4> 
  

            </div>

         
         
     </div>


     
     </>
    )
}

export default FoodItems;