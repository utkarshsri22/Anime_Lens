import React, { useEffect, useState } from "react";
import AnimeItem from '../AnimeItem/AnimeItem';
import { useParams } from "react-router-dom";

const FetchComponent = () => {

    const { id } = useParams();

    const [anime, setAnime] = useState({});
    const [animeCharacterList, setAnimeCharacterList] = useState([]);

    const getAnimeDetails = async () => {
        try {
            const response = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
            const data = await response.json();
            setAnime(data?.data);
        }
        catch (err) {
            console.log(err);
        }
    };
    const getAnimeCharacters = async (id) => {
        const response = await fetch(
            `https://api.jikan.moe/v4/anime/${id}/characters`
        );

        const data = await response.json();
        setAnimeCharacterList(data?.data);
    };

    useEffect(() => {
        getAnimeDetails();
        getAnimeCharacters(id);
    }, []);



    useEffect(() => {

    }, [anime, animeCharacterList]);


    return (
        Boolean(Object.keys(anime).length && animeCharacterList?.length) && <div>
            <AnimeItem anime={anime} animeCharacterList={animeCharacterList} />
        </div>
    )
}

export default FetchComponent;
