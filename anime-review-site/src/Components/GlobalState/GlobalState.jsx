import React, { useContext, useEffect, useState } from "react";
import { createContext, useReducer } from "react";

//created a global context
const GloballyAvailableState = createContext();

const API_Url = "https://api.jikan.moe/v4";


//will load as soon as index.js get loaded
const GlobalState = ({ children }) => {

  const reducer = (state, action) => {
    switch (action.type) {
      case "Load_Popular_Anime":
        return { ...state, popularAnime: action.payload, loading: false };
      case "Load_Upcoming_Anime":
        return { ...state, upcomingAnime: action.payload, loading: false };
      case "Load_Airing_Anime":
        return { ...state, airingAnime: action.payload, loading: false };
      case "Load_Anime_Pictures":
        return { ...state, pictures: action.payload, loading: false };
      case "User_Searching":
        return { ...state, searchResults: action.payload, loading: false };
      case "Loading":
        return { ...state, loading: true };
      default:
        return state;
    }
  };

  const InitialState = {
    popularAnime: [],
    upcomingAnime: [],
    airingAnime: [],
    pictures: [],
    isSearch: false,
    searchResults: [],
    loading: false,
  };

  const [currentState, dispatch] = useReducer(reducer, InitialState);
  const [userSearch, setUserSearch] = useState("");

  const onInputChange = (event) => {
    if (event.target.value.length === 0) {
      InitialState.isSearch = false;
    }
    setUserSearch(event.target.value);
  };

  const onUserSubmit = () => {
    if (userSearch.length > 0) {
      InitialState.isSearch = true;
      SearchAnime(userSearch);
    } else {
      InitialState.isSearch = false;
      alert("Search box cannot be empty!");
    }
  };

  const fetchPolpularAnime = async () => {
    dispatch({ type: "Loading" });
    const response = await fetch(API_Url + "/top/anime?filter=bypopularity");
    const { data } = await response.json();
    dispatch({ type: "Load_Popular_Anime", payload: data });
  };

  const fetchUpcomingAnime = async () => {
    dispatch({ type: "Loading" });
    const response = await fetch(API_Url + "/top/anime?filter=upcoming");
    const data = await response.json();
    dispatch({ type: "Load_Upcoming_Anime", payload: data.data });
  };

  const fetchAiringAnime = async () => {
    dispatch({ type: "Loading" });
    const response = await fetch(API_Url + "/top/anime?filter=airing");
    const data = await response.json();
    dispatch({ type: "Load_Airing_Anime", payload: data.data });
  };

  const SearchAnime = async (serachItem) => {
    dispatch({ type: "Loading" });
    const response = await fetch(
      `https://api.jikan.moe/v4/anime?q=${serachItem}&order_by=popularity&sort=asc&sfw`
    );
    const data = await response.json();
    dispatch({ type: "User_Searching", payload: data.data });
  };

  const fetchAnimePictures = async (animeID) => {
    dispatch({ type: "Loading" });
    const response = await fetch(
      `https://api.jikan.moe/v4/characters/${animeID}/pictures`
    );
    const data = await response.json();
    dispatch({ type: "Load_Anime_Pictures", payload: data.data });
  };

  useEffect(() => {
    //for loading some data for very first time user visit the page
    fetchPolpularAnime();
  }, []);

  return (
    <GloballyAvailableState.Provider
      value={{
        currentState,
        fetchAiringAnime,
        fetchAnimePictures,
        fetchPolpularAnime,
        fetchUpcomingAnime,
        SearchAnime,
        onInputChange,
        onUserSubmit,
        userSearch
      }}
    >
      {children}
    </GloballyAvailableState.Provider>
  );
};

export default GlobalState;

//exporting the global context
const useGlobalContext = () => {
  return useContext(GloballyAvailableState);
}

export { useGlobalContext };
