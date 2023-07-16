import { useDispatch, useSelector } from "react-redux";
import FoodItems from "./FoodItems";
import { clearCart, removeItem } from "../utils/cartSlice";

const Cart = () => {


    const cartItems = useSelector((store)=> store.cart.items);
    console.log({...cartItems});


    const dispatch = useDispatch();

    const handleRemove = (item) => {
        dispatch(removeItem(item));
    }

    const handleCart = () => {
        dispatch(clearCart());
    }

    let totalPrice = 0;
    cartItems.forEach((item)=> {
        totalPrice += item.card.info.price/100 || item.card.info.defaultPrice/100;
    })

    return (
        <>
         <h1>Cart - {cartItems.length}</h1>
         <h2>Total Price : ₹{totalPrice}</h2>
         <button className="remove-btn" onClick={()=>handleCart()} >🧹 Clear </button>
        <div className="res-container">
           
            {cartItems.map((item)=> (
                <div className="foodItems" key={item.card.info.id}>
                <FoodItems Itemdata = {item.card.info} />
                <button className="remove-btn" onClick={()=>handleRemove()} >remove 🗑️</button>
                </div>
            ))} 
        </div>
        </>
    )
}

export default Cart;