import React from 'react'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';

const ActorPreview = () => {
    const params = useParams();
    const [actorDetails, setActorDetails] = useState([]);
    const [actorMoreDetails, setActorMoreDetails] = useState([]);

      /* fetch movies */
      useEffect(()=> {
        fetch(`https://api.themoviedb.org/3/person/${params.id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&include_adult=true`)
        .then(res=> res.json())
        .then((data)=> {
          setActorDetails(data)
        })
      }, [params.id])

      /* Single Actor Details */
      useEffect(()=> {
          fetch(`https://api.themoviedb.org/3/person/popular?api_key=${import.meta.env.VITE_TMDB_API_KEY}`)
        .then(res=> res.json())
        .then((data)=> {
          return data.results.map((dat)=> {
            if(dat.id === actorDetails.id){
              setActorMoreDetails(dat);
            }
          })
        })
      }, [actorDetails.id])

      const biographyText = actorDetails.length !== 0 && actorDetails.biography.split('').length > 300 ? actorDetails.biography.slice(0, 300) : actorDetails.biography;
      
  return (
    <>
    { actorDetails &&
     <section className="actor-preview-section">
     <div className="bio-image-div">
       <img src={`https://image.tmdb.org/t/p/original/${actorDetails.profile_path}`} alt="" width="280"/>
        <h2 className="bio-name">{actorDetails.name}</h2>
      </div>
      <div className="biography-content">
       <span className="bio-place">{actorDetails.place_of_birth}</span>
         <div className="bio-details">
           <p><span>Birthday : </span> {actorDetails.birthday}</p>
           <p><span>Department :</span> {actorDetails.known_for_department}</p>
           <p><span>Popularity :</span> {actorDetails.popularity}</p>
           <p>{biographyText}</p>
         </div>
     </div>
   </section>}

    { actorMoreDetails.length !== 0 ?
      <section className='known-for-section'>
      <h2 className="heading-2">
              Known for these movies
          </h2>
      <div className="cards">
      { actorMoreDetails && actorMoreDetails.known_for.map((movie)=> {  
        return <Link key={movie.id} to={movie.media_type !== "tv" ? `/movies/${movie.id}` : `/actors/${params.id}`}>       <div className="card">
                  <div className="image-div">
                    <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={movie.title} className='card-img'/>
                      <p>{movie.vote_average.toFixed(1)}</p>
                    </div>
                    <div className="card-details">
                      <h2 className="card-title">{movie.media_type !== "tv" ? movie.title : movie.name}</h2>
                      <p className='year-and-genre'>{movie.media_type !== "tv" ? movie.release_date : movie.first_air_date} </p>
                    </div>
                  </div>
              </Link>
            })  
          }  
      </div>
  </section> : null }
    </>
  )
}

export default ActorPreview
