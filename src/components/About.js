import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserClass from "./UserClass";
import React from "react";
import { faIndustry } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

class About extends React.Component{
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
    return(
      <>
      <div className="aboutContainer">
        <div className="aboutHeader">
          <div className="aboutHeaderInner">Hi. I'm {this.state.userInfo.name}</div>
          <div className="aboutHeaderBorder"></div>
        </div>
        <div className="aboutBody">
          <div className="aboutBodyLeft">
            <img className="avatar-img" src={this.state.userInfo.avatar_url} />
          </div>
          <div className="aboutBodyRight">
            <div className="aboutSection">
              I'm a tech enthusiast 👻, and i love designing websites.
            </div>
            <div>
              <div className="aboutSectionBodyHeading">More about me</div>
              <div>
                <ul className="aboutSectionBodyDesc">
                  <li>👀 I’m interested in web designing and developement</li>
                  <li>🌱 I’m currently learning React Js</li>
                  <li>⚡ Want to know more about Backend develepment</li>
                  <li>💞️ I’m looking to collaborate on web dev projects</li>
                  <li>📫 Reach me via : chauhanvaibhav1105@gmail.com</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="socialSection">
         <h3> Connect with me on :</h3>
          <div className="socialMedia-Links">
            <a href="https://www.linkedin.com/in/vaibhav-chauhan-022a571bb/" target="_blank">
              LinkedIn
            </a>
            <a href="https://twitter.com/vaibhavch11" target="_blank">
               Twitter
            </a>
            <a href="mailto:chauhanvaibhav1105@gmail.com" target="_blank">
             Gmail
            </a>
            
          </div>
        </div>
      </div>
      </>
    )
  }
}

export default About;