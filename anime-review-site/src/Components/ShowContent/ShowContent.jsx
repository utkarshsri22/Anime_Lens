
import React from 'react'
import './ShowContent.css'
import SideBar from '../SideBar/SideBar';
import { Link } from 'react-router-dom';

const ShowContent = ({ contentList }) => {

  return (
    <div className='container'>
      <div className="anime-content">
        {
          contentList?.map((item) => {
            return <Link className='popular-anime-links' to={`/anime/${item.mal_id}`} key={item.mal_id}>
              <img className='popular-anime-images' src={item.images.jpg.large_image_url} alt="cover-image" />
              <h4 className='anime-title'>{item.title}</h4>
            </Link>
          })
        }
      </div>
      <SideBar />
    </div>
  )
}

export default ShowContent;