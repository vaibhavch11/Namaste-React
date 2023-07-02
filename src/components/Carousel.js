import React from 'react'
import { Carousel_img } from '../utils/constants'

const Carousel = ({carouselData}) => {
  return (
    <div className='carousel-container'>
        <img className="carousel-img" alt="carousel-logo" src={Carousel_img + carouselData.data.creativeId }/>
          {/* <h3>{resData.data.name}</h3>
          <h5>{resData.data.cuisines.join(" , ")}</h5> */}

    </div>
  )
}

export default Carousel