import { useDispatch, useSelector } from "react-redux";
import FoodItems from "./FoodItems";
import { addItem, clearCart, discardItem, removeItem } from "../utils/cartSlice";

const Cart = () => {


    const cartItems = useSelector((store)=> store.cart.items);
    console.log({...cartItems});


    const dispatch = useDispatch();

    const handleRemove = (item) => {
        dispatch(removeItem(item.card.info.id));
    }

    const handleAdd = (item) => {
        dispatch(addItem(item))
    }

    const handleCart = () => {
        dispatch(clearCart());
    }

    const handleDiscardItem = (item) => {
        dispatch(discardItem(item.card.info.id))
    }

    let totalPrice = 0;
    cartItems.forEach((item)=> {
        const itemPrice = item.card.info.price / 100 || item.card.info.defaultPrice / 100;
        totalPrice += itemPrice*item.quantity;
    })

    return (
        <>
        
        <div className="cart-head">
         <h2>Items - {cartItems.length}</h2>
         <h2>Total Price : ₹{totalPrice}</h2>
         <button className="remove-btn" onClick={()=>handleCart()} >🧹 Clear </button>
         {/* <button className="checkout">Checkout</button> */}
        </div>
        
        <div className="cartItems-container">

    
           
            {cartItems.map((item)=> (

    
                    <div className="foodItems" key={item.card.info.id}>
                <FoodItems Itemdata = {item.card.info} />


              <div className="cart-buttons">
                  <span className="remove-item-btn" onClick={()=>handleRemove(item)}>-</span>
                     <span>{item.quantity}</span>
                  <span className="add-item-btn" onClick={()=>handleAdd(item)} >+</span>
                </div>
     

                </div>
                
            ))} 
        </div>
        </>
    )
}

export default Cart;