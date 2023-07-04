import React from "react";

class UserClass extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            userInfo : {
                name : "Dummy",
                location : "Default"
            }
        };
    }

    async componentDidMount(){
        const data = await fetch("https://api.github.com/users/vaibhavch11");
        const json = await data.json();

        this.setState({
            userInfo : json,
        })
        console.log(json);
    }

    render(){


        return (
            <div className="user-card">
             <img className="avatar-img" src={this.state.userInfo.avatar_url} />
             <h2>Name : {this.state.userInfo.name}</h2>
             <h3>Location : {this.state.userInfo.location}</h3>
             <h3> Contact : @vaibhavch11</h3>
            </div>
        );
    }
}

export default UserClass;


/*

------Mounting----

Constructor (dummy)
Render  (dummy)
    - <HTML Dummy>
Component Did Mount
    - <API Call>
    - <this.setState> //this will trigger update cycle

-----Update-----

Render (API data)
    - <HTML new API data>
Component Did update







*/