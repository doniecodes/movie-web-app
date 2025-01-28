import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import {FaHeart} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import {FaPlay} from 'react-icons/fa'
import { Link } from 'react-router-dom'

const ShowPreview = () => {
    let {id} = useParams();
    const [show, setShow] = useState(null);
    const [trailerVideo, setTrailerVideo] = useState(null);
    const [trailerUrl, setTrailerUrl] = useState(null);
    const [recommended, setRecommended] = useState(null);
    const navigate = useNavigate();

    useEffect(()=> {
        fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US`)
        .then(res=> res.json())
        .then((data)=> {
        setShow(data);
    })
    }, [id])

    // ScrollIntoView everytime a tv show page is opened
    const showPreviewRef = useRef(null);
    useEffect(()=> {
      showPreviewRef.current.scrollIntoView({
        behaviour: "smooth",
      });
    }, [id])

    /* Back to shows button */
    const backToShows = ()=> {
        navigate(-1)
    }

    const handleTrailerVideo = async ()=> {
        const response = await fetch(`https://api.themoviedb.org/3/tv/${id}/videos?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US`)
        if(!response.ok){
            console.error("could not find a video for this movie");
        }
        const data = await response.json();
        const key = data.results.length !== 0 && data.results[0].key;
        data.results.length !== 0 && setTrailerVideo(data.results[0]);
        setTrailerUrl(`https://www.youtube.com/embed/${key}?autoplay=0&controls=0`);
    }
    
    // CLOSE TRAILER BUTTON
    const handleCloseTrailer = ()=> {
        setTrailerVideo(null);
    }

        // RECOMMENDED SHOWS
        const showName = show !== null ? show.name.split(' ')[0] : "";
        useEffect(()=> {
            fetch(`https://api.themoviedb.org/3/search/tv?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&include_adult=false&query=${showName}`)
            .then(res=> res.json())
            .then((data)=> {
                setRecommended(data.results);
            })
        }, [show]);
        
        // Removing the current movie from showing on recommendations
        const recommendedExist = recommended !== null && recommended;
        const similarShows = recommendedExist && recommended.filter((reco)=> reco.name !== show.name).slice(0, 5);

  return (
    <>
        <section className="movie-preview-section" ref={showPreviewRef}>
            {
                show !== null &&
                <div className="preview-div">
                <div className="gradient-div">
                <div className="gradient"></div>
                    <img src={`https://image.tmdb.org/t/p/original/${show.backdrop_path}`} alt={show.title} className='preview-img'/>
                </div>
                <button className="backButton" onClick={backToShows}>&larr; Back</button>
                <div className="preview-absolute">
                    <div className="preview-movie-name-div">
                    <h2 className="preview-movie-name">
                        {show.name}
                    </h2>
                    <span className='preview-ratings'><span className='star'><FaStar /></span> {show.vote_average}/10</span>
                    </div>
                    <p className="movie-preview-details">
                        <span className='release-date'>{show.last_air_date}</span> 
                        <span className='genre'></span> 
                        <span className='runtime'>{show.status}</span> 
                    </p>
                    <p className="preview-text">
                        {show.overview}
                    </p>
                    <div className="preview-btns">
                        <button className='watch-now-btn'
                        onClick={handleTrailerVideo}>
                            <span><FaPlay /></span>Watch Now</button>
                        <button className='add-to-favourites-btn'><FaHeart/></button>
                    </div>
                </div>
            </div>
            }
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
                    recommended !== null && similarShows.map((similar)=> {
                        return <Link to={`/shows/${similar.id}`} key={similar.id}>
                    <div className="card">
                      <div className="image-div">
                        <img src={`https://image.tmdb.org/t/p/original/${similar.poster_path}`} alt="" className='card-img'/>
                        <p>{similar.vote_average.toFixed(1)}</p>
                      </div>
                      <div className="card-details">
                        <h2 className="card-title">{similar.name}</h2>
                        <p className='year-and-genre'>{similar.first_air_date} | <span>{/* {genreNames} */}</span></p>
                      </div>
                    </div>
                </Link>
                })
                }
            </div>
        </section>
        </>
  )
}

export default ShowPreview