import React , {lazy , Suspense, useState} from "react";
import ReactDOM from "react-dom/client";
import Header from "./src/components/Header";
import Body from "./src/components/Body";
import { createBrowserRouter , RouterProvider, Outlet } from "react-router-dom";
// import About from "./src/components/About";
import Contact from "./src/components/Contact";
import Error from "./src/components/Error";
import RestaurantMenu from "./src/components/RestaurantMenu";
import UserContext from "./src/utils/UserContext";
//import Grocery from "./src/components/Grocery";


//2 Bundles , this is how we optimize our app.
const Grocery = lazy(()=>import("./src/components/Grocery"));
const About = lazy(()=>import(("./src/components/About")));

const AppLayout = () => {

   const [user,setUser] = useState({
      name : "Vaibhav Chauhan",
      email : "vaibhavchauhan12@gmail.com"
   })
   //here we are overwriting the default values.
   return (
     <>
      <UserContext.Provider value={{user: user, setUser : setUser}}> 
       <Header />
         <Outlet /> 
      </UserContext.Provider>
      </>
   )
};

//Note that we want our header to be fixed at top, so whenever our route got change our header should be sticked
//at top. so, for that we are going to use "children routes".

const appRouter = createBrowserRouter([
   {
      path : "/",
      element : <AppLayout />,
      children : [
         {
            path : "/",
            element : <Body />
         },
         {
            path : "/about",
            element : <Suspense fallback={<h1>Loading...</h1>}><About /></Suspense>
         },
         {
            path : "/contact",
            element : <Contact />
         },
         {
            path : "/grocery",
            element : <Suspense fallback={<h1>Loading...</h1>}><Grocery /></Suspense> 
         },
         {
            path : "/restaurant/:resId",
            element : <RestaurantMenu />
         }
      ],
      errorElement : <Error />,
   },
   
])

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);






//----------------------EPISODE 2 & 3------------------------
//React Element using core React
// const heading = React.createElement("h1", {id : "heading"}, "Namaste React");

//React Element using JSX
// const heading = (<h1 className="head">Namaste React</h1>);

// //React Functional Component
// const HeadingComponent = () => (
//     <React.Fragment>
//        <div className="container1">
//           <h1 >Namaste React Functional Component</h1>
//        </div>
//        <div className="container1">
//           <h1 >Namaste React Functional Component</h1>
//        </div>
//     </React.Fragment>
// )

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<HeadingComponent />);