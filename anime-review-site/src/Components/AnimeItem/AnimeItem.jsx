import React, { useEffect, useState } from "react";
import "./AnimeItem.css";
import { Link } from "react-router-dom";

const AnimeItem = ({ anime, animeCharacterList }) => {
  const [showDesc, setShowDesc] = useState(false);

  const onHandleShowDesc = () => {
    setShowDesc(!showDesc);
  };

  let {
    title,
    images,
    rank,
    score,
    scored_by,
    rating,
    source,
    status,
    aired,
    season,
    synopsis,
    duration,
    popularity,
    trailer,
  } = anime;

  const { day, month, year } = aired?.prop?.from;

  return (
    <div>
      <div className="complete-info-div">
        <div className="anime-container">
          <h1 className="title">{title}</h1>
          <div className="content">
            <div className="image-content">
              <img src={images?.jpg.large_image_url} alt="anime cover image" />
            </div>
            <div className="details">
              <p>
                <span className="marker">Aired</span> :{" "}
                <span>{day + "/" + month + "/" + year}</span>
              </p>
              <p>
                <span className="marker">Rating</span> : <span>{rating}</span>
              </p>
              <p>
                <span className="marker">Rank</span> : <span>{rank}</span>
              </p>
              <p>
                <span className="marker">Score</span> : <span>{score}</span>
              </p>
              <p>
                <span className="marker">Scored By</span> :{" "}
                <span>{scored_by}</span>
              </p>
              <p>
                <span className="marker">Popularity</span> :{" "}
                <span>{popularity}</span>
              </p>
              <p>
                <span className="marker">Status</span> : <span>{status}</span>
              </p>
              <p>
                <span className="marker">Source</span> : <span>{source}</span>
              </p>
              <p>
                <span className="marker">Season</span> : <span>{season}</span>
              </p>
              <p>
                <span className="marker">Duration</span> :{" "}
                <span>{duration}</span>
              </p>
            </div>
          </div>
          <div className="description">
            {showDesc ? synopsis : synopsis.substring(0, 450) + "..."}
            <button onClick={onHandleShowDesc}>
              {showDesc ? "Show less" : "Show more"}
            </button>
          </div>
        </div>
      </div>
      <div className="anime-trailer">
        {anime?.trailer?.url ? (
          <iframe
            src={trailer.embed_url}
            width="900"
            height="450"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <h2>Trailer is not availaible</h2>
        )}
      </div>
      <div className="characters-list">
        {animeCharacterList &&
          animeCharacterList?.map((character, index) => {
            const { role } = character;
            const { images, name, mal_id } = character.character;
            return (
              <Link
                to={`/character/${mal_id}`}
                key={index}
                alt="character-image"
              >
                <div className="character">
                  <img src={images.jpg.image_url} />
                  <h3>{name}</h3>
                  <p>{role}</p>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default AnimeItem;
