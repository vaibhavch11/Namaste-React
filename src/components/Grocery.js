import React, { useState } from 'react'


const Section = ({title,desc})=> {

  const [isVisible,setIsVisible] = useState(false);
  return(
     <div>
        <h3>{title}</h3>
        <button>show</button>
        {isVisible && <p>{desc}</p>}
     </div>
  )
}

const Grocery = () => {
  return (
    <div>
      <h6>Grocery</h6>

      <Section title={"About Grocery"} desc = {"On the other hand....."}/>

      <Section title={"Grocery contact"} desc = {"On the other hand....."}/>

      <Section title={"Grocery team"} desc = {"On the other hand....."}/>
    </div>
  )
}

export default Grocery