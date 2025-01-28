import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import {FaHeart} from 'react-icons/fa'
import {FaPlay} from 'react-icons/fa'
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom'


const MoviePreview = () => {
    const location = useLocation();
    let {id} = useParams();
    const [movie, setMovie] = useState(null);
    const [trailerUrl, setTrailerUrl] = useState("");
    const [trailerVideo, setTrailerVideo] = useState(null);
    const [credits, setCredits] = useState([]);
    const [recommended, setRecommended] = useState(null);
    const [genres, setGenres] = useState([]);
    const navigate = useNavigate();

    useEffect(()=> {
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US`)
        .then(res=> res.json())
        .then((data)=> {
        setMovie(data);
    })
    }, [id])

    // ScrollIntoView everytime a movie page is opened
    const moviePreviewRef = useRef(null);
    useEffect(()=> {
      moviePreviewRef.current.scrollIntoView({
        behaviour: "smooth",
      });
    }, [id])

    /* Trailer Video function */
    const handleTrailerVideo = async ()=> {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US`)
        if(!response.ok){
            console.error("could not find a video for this movie");
        }
        const data = await response.json();
        const key = data.results[0].key;
        setTrailerVideo(data.results[0]);
        setTrailerUrl(`https://www.youtube.com/embed/${key}?autoplay=0&controls=0`);
    }
    
    // Go BACK BTN FUNCTION
    const handleGoBack = ()=> {
        navigate(-1)
    }

    // Close Trailer Button
    const handleCloseTrailer = ()=> {
        setTrailerVideo(null);
    }

      // fetch genres
      useEffect(()=> {
        fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US`)
        .then(res=> res.json())
        .then((data)=> {
          setGenres(data.genres);
        })
      }, [id, movie])

      const genreNames = movie !== null ? genres.map((genre)=> {
        if(genre.id === movie.genres[0].id){
            return (genre.name)
        }
    }) : null;

    // CAST
    const movieName = movie !== null ? movie.title.split(' ')[0] : "";
    useEffect(()=> {
        fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&include_adult=false&query=${movieName}`)
        .then(res=> res.json())
        .then((data)=> {
            console.log(data)
            setCredits(data.cast);
        })
    }, [movie, id]);

    // RECOMMENDED MOVIES
    useEffect(()=> {
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&include_adult=false&query=${movieName}`)
        .then(res=> res.json())
        .then((data)=> {
            setRecommended(data.results);
        })
    }, [movie, id]);
    
    // Removing the current movie from showing on recommendations
    const recommendedExist = recommended !== null && recommended;
    const similarMovies = recommendedExist && recommended.filter((similar)=> similar.title !== movie.title).slice(0, 5);

    const handleToFavourites = (movieId)=> {
        /* fetch(`https://api.themoviedb.org/3/account/${movieId}/favorite`, {
            
            method : 'POST',
            headers : {
                accept: 'application/json',
                'content-type': 'application/json'
            }
        }) */
    }

  return (
    <>
    <section className="movie-preview-section" ref={moviePreviewRef}>
        
        {movie !== null &&
        <div className="preview-div">
        <div className="gradient-div">
        <div className="gradient"></div>
            <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt={movie.title} className='preview-img'/>
        </div>
        <button className="backButton"
        onClick={handleGoBack}>
        &larr; Back</button>
        <div className="preview-absolute">
            <div className="preview-movie-name-div">
            <h2 className="preview-movie-name">
                {movie.title}
            </h2>
            <span className='preview-ratings'><span className='star'><FaStar /></span> {movie.vote_average}/10</span>
            </div>
            <p className="movie-preview-details">
                <span className='release-date'>{}</span> 
                <span className='release-date'>{movie.release_date}</span> 
                {genres.length !== 0 ? <span className='genre'>{genreNames}</span> : null} 
                <span className='runtime'>{movie.runtime} minutes</span> 
            </p>
            <p className="preview-text">
                {movie.overview}
            </p>
            {movie !== null &&
            <div className="preview-btns">
                <button onClick={handleTrailerVideo} className='watch-now-btn'><span><FaPlay /></span>Play Trailer</button>
                <button onClick={()=> handleToFavourites(movie.id)} className='add-to-favourites-btn'><FaHeart/></button>
            </div>}
        </div>
    </div>}
    </section>

    {/* Trailer Video Embedded */}
    {trailerVideo &&
        <section className="iframe-section">
            <button onClick={handleCloseTrailer} className="close-trailer-btn">X</button>
        <iframe className='iframe-movie'
        src={trailerUrl}>
            
        </iframe>
        </section>
    }

    {/* Recommendations */}
    <section className='recommendations-section'>
        <h2 className="heading-2">
                Recommendations
            </h2>
        <div className="recommendations">
            {
                recommended !== null && similarMovies.map((movie)=> {
                    return <Link key={movie.id} to={`/movies/${movie.id}`}>
                    <div className="card">
                      <div className="image-div">
                        <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={movie.title} className='card-img'/>
                        <p>{movie.vote_average.toFixed(1)}</p>
                      </div>
                      <div className="card-details">
                        <h2 className="card-title">{movie.title}</h2>
                        <p className='year-and-genre'>{movie.release_date.split("-")[0]}</p>
                      </div>
                    </div>
                </Link>
                })
            }
        </div>
    </section>

    <section className="cast-section">
        <h2 className="heading-2">Cast</h2>
        <div className="cast-cards-container">
            {/* <button className="handle left-handle">&#8249;</button> */}
            <div className="cast-cards">
            {credits.map((credit)=> {
                return <Link to={`/actors/${credit.id}`} key={crypto.randomUUID()} className="cast-image-div">
                <img src={`https://image.tmdb.org/t/p/original/${credit.profile_path}`} alt={credit.name} className='cast-image'/>
                <h4 className="cast-name">{credit.name}</h4>
            </Link>
            })}
            </div>
            {/* <button className="handle right-handle">&#8250;</button> */}
        </div>
    </section>

    </>
  )
}

export default MoviePreview