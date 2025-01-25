import React from 'react'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';

const ActorPreview = () => {
    const {id} = useParams();
    const [actorDetails, setActorDetails] = useState(null);

      /* fetch movies */
      useEffect(()=> {
        fetch(`https://api.themoviedb.org/3/person/popular?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&include_adult=true`)
        .then(res=> res.json())
        .then((data)=> {
          data.results.map((detail)=> {
            if(detail.id === id){
              setActorMovies(detail);
            }
          })
        })
      }, [id])

      console.log(actorDetails);

      
  return (
    <>
    <section className="actor-preview-section">

      <div className="biography">
        <img src="../images/pic4.jpg" alt="" width="250" height="300"/>
        <div className="bio-content">
          <h2 className="bio-name">Cecilia Cheung</h2>
          <span className="bio-place">Hong Kong, British Crown Colony</span>
          <div className="bio-details">
            <p><span>Born:</span> 19-08-1982</p>
            <p><span>Department:</span> Acting</p>
            <p><span>Popularity:</span> 106.704</p>
          </div>
        </div>
      </div>

      <div className="actor-movies">
        <h3 className="card-title">Known For</h3>
        <div className="cards">
        {
          actorDetails !== null &&
          actorDetails.known_for.map((movie)=> {
            return <Link key={movie.id} to={`/movies/${movie.id}`}>
            <div className="card">
             <div className="image-div">
               <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={movie.title} className='card-img'/>
               <p>{movie.vote_average}</p>
             </div>
             <div className="card-details">
               <h2 className="card-title">{movie.title}</h2>
               <p className='year-and-genre'>{movie.release_date} | <span>{/* {genreNames} */}</span> </p>
              </div>
             </div>
           </Link>
          })
        }
        </div>
      </div>

    </section>
    </>
  )
}

export default ActorPreview