import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

const Movie = ({movie, genres, count}) => {
    /* Movie Genres */
    let genreNames = genres.map((genre)=> {
        if(genre.id === movie.genre_ids[0]){
            return (genre.name)
        }
    });
    
    const releaseDate = movie.release_date.split('-')[0];

  return (
    <>
    <Link to={`/movies/${movie.id}`}>
        <div className="card">
          <div className="image-div">
            <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={movie.title} className='card-img'/>
            <p>{movie.vote_average.toFixed(1)}</p>
          </div>
          <div className="card-details">
            <h2 className="card-title">{movie.title}</h2>
            <p className='year-and-genre'>{releaseDate} | <span>{genreNames}</span> </p>
          </div>
        </div>
    </Link>
    </>
  )
}

export default Movie