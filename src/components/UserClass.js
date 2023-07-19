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
                <div className="about-img">
                <img className="avatar-img" src={this.state.userInfo.avatar_url} />
                </div>

                <div className="about-content">
                    
                <h3> I'm a tech enthusiast 👻, and i love designing websites.</h3>
                <h3>Let's connect! I'm passionate about creating valuable content on Data Structures and Algorithms, as well as web development. Looking forward to exchanging knowledge and ideas with like-minded professionals."</h3>
                  <h2>Name : {this.state.userInfo.name}</h2>
                  <h3>Location : {this.state.userInfo.location}</h3>
                </div>


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