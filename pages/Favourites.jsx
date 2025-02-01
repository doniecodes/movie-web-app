import React from 'react'
import { useLoaderData } from 'react-router-dom'
import { authRequired } from '../data/utils';
import { Link } from 'react-router-dom';

export async function loader ({request}) {
  await authRequired(request);
}

const Favourites = () => {
  const favourites = JSON.parse(localStorage.getItem("movies")) || [];
  console.log(favourites)


  const favouriteElements = favourites.length!== 0 ? favourites.map((fav)=> {
    return <Link key={fav.id} to={`/movies/${fav.id}`}>
    <div className="card">
      <div className="image-div">
        <img src={`https://image.tmdb.org/t/p/original/${fav.poster_path}`} alt={fav.title} className='card-img'/>
        <p>{fav.vote_average.toFixed(1)}</p>
      </div>
      <div className="card-details">
        <h2 className="card-title">{fav.title}</h2>
        <p className='year-and-genre'>{/* {releaseDate}  */}| <span>{/* {genreNames} */}</span> </p>
      </div>
    </div>
</Link>
  }) : null;
  
  return (
    <>
    <section className="favourites-section">
      <h2 className="heading-3">Your Favourite Movies and Tv Shows</h2>
      <div className="favourite-cards">
        {favouriteElements}
      </div>
    </section>
    </>
  )
}

export default Favourites