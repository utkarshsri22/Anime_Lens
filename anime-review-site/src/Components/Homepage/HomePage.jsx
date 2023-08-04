import React, { useState } from 'react'
import { useGlobalContext } from '../GlobalState/GlobalState';
import ShowContent from '../ShowContent/ShowContent';
import './HomePage.css';
const HomePage = () => {

    const {
        currentState,
        fetchAiringAnime,
        fetchUpcomingAnime,
        onInputChange,
        onUserSubmit,
        userSearch } = useGlobalContext();

    const { searchResults, popularAnime, upcomingAnime, airingAnime } = currentState;

    const [typeOfAnime, setTypeOfAnime] = useState('popular');

    //as a tags
    const ChangeComponent = () => {
        switch (typeOfAnime) {
            case 'popular':
                return <ShowContent contentList={popularAnime} />
            case 'airing':
                return <ShowContent contentList={airingAnime} />
            case 'upcoming':
                return <ShowContent contentList={upcomingAnime} />
            case 'searching':
                return <ShowContent contentList={searchResults} />
            default:
                return <ShowContent contentList={popularAnime} />
        }

    }
    return (
        <div className='homepage-container'>
            <header>
                <div className='logoContainer'>
                    <h1>
                        {typeOfAnime === 'popular' ? 'Popular Anime' : typeOfAnime === 'airing' ? 'Airing Anime' : 'Upcoming Anime'}
                    </h1>

                </div>

                <div className='search-container'>
                    <div className='popular-filter'>
                        <button onClick={() => {
                            setTypeOfAnime('popular');
                        }}>
                            Popular
                            <i className="fas fa-fire"></i>
                        </button>
                    </div>
                    <div className='search-form' >
                        <div className='userInput'>
                            <input type='text' placeholder='Search your favourite Anime' value={userSearch} onChange={onInputChange} />
                            <button onClick={() => {
                                setTypeOfAnime('searching');
                                onUserSubmit()
                            }}>Search</button>
                        </div>
                    </div>
                    <div className='airing-filter'>
                        <button onClick={() => {
                            setTypeOfAnime('airing');
                            fetchAiringAnime();
                        }}>
                            Airing
                        </button>

                    </div>
                    <div className='upcoming-filter'>
                        <button onClick={() => {
                            setTypeOfAnime('upcoming');
                            fetchUpcomingAnime();
                        }}>
                            UpComing
                        </button>
                    </div>
                </div>
            </header>
            {/* for changing the loading component */}
            <ChangeComponent />
        </div>
    )
}

export default HomePage;