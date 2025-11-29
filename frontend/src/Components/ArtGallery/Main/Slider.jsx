import React, { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import axios from "axios"; 
import './Slider.css'; // 👈 custom styles

function Slider() {
  const [index, setIndex] = useState(0);
  const [Art, setArts] = useState([]);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  async function FetchArts() {
    try {
      const response = await axios.get("https://artify-art-sale-platform.onrender.com/artwork/getart", {
        withCredentials: true 
      });
      setArts(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    FetchArts();   
  }, []);

  return (
    <div className="slider-container">
      <h1 className="slider-heading">🎨 Suggested Artwork</h1>
      <Carousel activeIndex={index} onSelect={handleSelect} className="custom-carousel">
        {Art && Art.map((art, idx) => (
          <Carousel.Item key={idx}>
            <img
              className="d-block w-100 carousel-img"
              src={art.image.url}
              alt={`Slide ${idx + 1}`}
            />
            <Carousel.Caption className="caption-box">
              <h3 className="caption-title">{art.title}</h3>
              <p className="caption-desc">{art.description}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default Slider;
