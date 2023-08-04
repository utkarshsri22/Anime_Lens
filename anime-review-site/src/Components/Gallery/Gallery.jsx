import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../GlobalState/GlobalState";
import { useParams } from "react-router-dom";
import './Gallery.css'

const Gallery = () => {
  const { id } = useParams();

  const { currentState, fetchAnimePictures } = useGlobalContext();
  const { pictures } = currentState;
  // seeting default index as 0
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetchAnimePictures(id);
  }, [id]);

  return (
    <div className="images-container">
      <div className="back-button">
        <a href="/">
          <i className="fas fa-arrow-left"></i>
          Back to Home
        </a>
      </div>
      <div className="Main-header-img">
        <img src={pictures[index]?.jpg.image_url} alt="focused image" />
      </div>
      <div className="images-list">
        {pictures.map((picture, ind) => {
          return (
            <div
              className="images-container"
              onClick={() => {
                setIndex(ind);
              }}
              key={ind}
            >
              <img
                src={picture?.jpg.image_url}
                alt="anime image"
                style={{
                  border:
                  ind === index ? "3px solid #27AE60" : "3px solid #e5e7eb",
                  filter: ind === index ? "grayscale(0)" : "grayscale(60%)",
                  transform: ind === index ? "scale(1.1)" : "scale(1)",
                  transition: "all 0.5s ease-in-out",
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Gallery;
