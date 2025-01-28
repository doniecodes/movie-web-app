import React from 'react'
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

const TvShows = () => {
  const [tvShows, setTvShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [term, setTerm] = useState('');
  const [genres, setGenres] = useState([]);
  const [count, setCount] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();

  // fetch TV Shows
  useEffect(()=> {
    fetch(!term ? `https://api.themoviedb.org/3/discover/tv?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&include_adult=true&page=${count}&${searchParams}`
    : `https://api.themoviedb.org/3/search/tv?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&include_adult=true&page=${count}&query=${term}`)
    .then(res=> res.json())
    .then((data)=> {
      setTvShows(data.results);
      setLoading(false);
    })
  }, [count, term, searchParams])

  // fetch tv shows genres
  useEffect(()=> {
    fetch(`https://api.themoviedb.org/3/genre/tv/list?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US`)
    .then(res=> res.json())
    .then((data)=> {
      setGenres(data.genres);
    })
    }, [])

    const cardsSection = useRef(null);
      const changePage = (text)=> {
        if(text === 'next'){
          setCount(count + 1);
          cardsSection.current.scrollIntoView({
            behaviour: "smooth",
          });
        }
        else if(text === 'prev' && count !== 1){
          setCount(count - 1);
        }
      }

    /* Form Search */
    const handleSubmit = (e)=> {
      e.preventDefault();
    }

    const genNewSearchParams = (text)=> {
      if(text === 'All popular'){
        setSearchParams({})
      }
      genres.map((gen)=> { 
        if(gen.name.toLowerCase() === text.toLowerCase()){
          setSearchParams({with_genres: `${gen.id}`});
        }
      })
    }

  return (
    <>
    {tvShows.length !== 0 &&
    <header>
      <form action="" onSubmit={handleSubmit}>
          <input className='header-input'
          type="text"
          name="search"
          value={term}
          onChange={(e)=> setTerm(e.target.value)}/>
          <button className='header-btn'><FaSearch /></button>
      </form>
  </header>}

      { loading && 
      <div className='loading-element'>
        <span>.</span>
        <span>.</span>
        <span>.</span>
      </div> }

      { tvShows.length !== 0 &&
      <div className="movie-filters">
      <select onChange={(e)=> genNewSearchParams(e.target.value)}>
        <option value="" hidden>Genres</option>
        <option value="All popular">All popular</option>
        <option value="action & adventure">Action</option>
        <option value="animation">Animation</option>
        <option value="comedy">Comedy</option>
        <option value="drama">Drama</option>
        <option value="documentary">Documentary</option>
        <option value="family">Family</option>
        <option value="kids">Kids</option>
        <option value="mystery">Mystery</option>
        <option value="news">News</option>
        <option value="reality">Reality</option>
        <option value="soap">Soap</option>
        <option value="talk">Talk</option>
      </select>
      </div> }

     <section className="shows-section">
      <div className="cards" ref={cardsSection}>
        {
        tvShows.map((show)=> {
         const genreNames = genres.map((genre)=> {
              if(genre.id === show.genre_ids[1]){
                return (genre.name);
              }
          });
          const releaseDate = show.first_air_date.split('-')[0]

          return <Link to={`/shows/${show.id}`} key={show.id}>
              <div className="card">
                <div className="image-div">
                  <img src={`https://image.tmdb.org/t/p/original/${show.poster_path}`} alt="" className='card-img'/>
                  <p>{show.vote_average.toFixed(1)}</p>
                </div>
                <div className="card-details">
                  <h2 className="card-title">{show.name}</h2>
                  <p className='year-and-genre'>{releaseDate} | <span>{genreNames}</span> </p>
                </div>
              </div>
          </Link>
      })
      }
      </div>

      {/* next and previous page buttons*/}
      {tvShows.length !== 0 &&
      <div className="change-page-btns">
      <button onClick={()=> changePage('prev')} className="prevpage">Prev</button>
      <button onClick={()=> changePage('next')} className="nextpage">Next</button>
      </div>
      }
     </section>
    </>
  )
}

export default TvShows