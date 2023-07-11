import UserContext from "../utils/UserContext";
import User from "./User";
import UserClass from "./UserClass";
import React from "react";

class About extends React.Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
  }

  render(){
    return(
      <div className="About-us">
        <h1>About Page !!</h1>

       
        <UserClass name={"Child 1"} location={"Haridwar"}/>
        <UserContext.Consumer>
          {({user})=><h3>{user.name} - {user.email}</h3>}
        </UserContext.Consumer>
      </div>
    )
  }
}

// const About = () => {
//     return (
//         <div>
//           <h1>About Page !!</h1>
//           {/* <User /> */}
//           <UserClass name={"Vaibhav (class)"} location={"Haridwar"}/>
//         </div>
//     )
// }

export default About;