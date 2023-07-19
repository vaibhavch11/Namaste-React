import { useState, useContext } from "react";
import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";

const Header = () => {

   const [btnName, setBtnName] = useState("Login");

   const onlineStatus = useOnlineStatus();

   const {user} = useContext(UserContext);

   //redux- to render changes in components
   const cartItems = useSelector((store) => store.cart.items);
   console.log(cartItems);

    return (
      <div className="header">
         <div className="logo-container">
            <Link to="/">
              <img className="logo" src={LOGO_URL} />
            </Link>
            
         </div>
         <div className="nav-items">
            <ul >
               <li>Online Status : {onlineStatus ? "🟢" : "🔴"}  </li>
               <li><Link to="/">Home</Link></li>
               <li><Link to="/about" >About Us</Link></li>
               <li><Link to="/contact" >Contact</Link></li>
               <li><Link to="/grocery" >Grocery</Link></li>
               <li><Link to="/cart"> Cart :<b className="cart-num"><span className="cart-count">{cartItems.length}</span></b></Link></li>
               <button onClick={()=>{
                  btnName === "Login" ? setBtnName("Logout") : setBtnName("Login");
               }}>{btnName}</button>
            </ul>
         </div>
      </div>
    )
 }

 export default Header;