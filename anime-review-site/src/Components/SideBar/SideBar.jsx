import React from "react";
import { useGlobalContext } from "../GlobalState/GlobalState";
import { Link } from 'react-router-dom';
import "./SideBar.css";

const SideBar = () => {
  const { currentState } = useGlobalContext();
  const popularAnime = currentState.popularAnime;

  //sorting anime by popularity
  popularAnime.sort((a, b) => {
    //sorting in descending order of thier score
    return b.score - a.score;
  });
  const top5Anime = popularAnime.slice(0, 5);


  return (
    <div className="sidebar-container">
      <div className="title">
        <h1>Top 5 Anime Right Now</h1>
      </div>
      <div className="top-5-anime">
        {popularAnime.length > 4
          ? top5Anime.map((item) => {
              return (
                <Link to={`/anime/${item.mal_id}`} key={item.mal_id}>
                  <img
                    src={item.images.jpg.large_image_url}
                    alt="anime Image"
                  />
                  <h5 className="title">{item.title}</h5>
                </Link>
              );
            })
          : ""}
      </div>
    </div>
  );
};

export default SideBar;
