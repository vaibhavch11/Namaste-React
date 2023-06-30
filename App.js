import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./src/components/Header";
import Body from "./src/components/Body";
import { createBrowserRouter , RouterProvider, Outlet } from "react-router-dom";
import About from "./src/components/About";
import Contact from "./src/components/Contact";
import Error from "./src/components/Error";
import RestaurantMenu from "./src/components/RestaurantMenu";
/*
  Header
    - logo
    - nav items
   Body
    - search
    - Restaurant Container
       - Restaurant card
         - Image
         - Name of Res, rating,cuisine
   Footer
    - Links
    - Address
    - Contact
*/


const AppLayout = () => {
   return (
      <div className="app">
         <Header />
         <Outlet /> 
      </div>
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
            element : <About />
         },
         {
            path : "/contact",
            element : <Contact />
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