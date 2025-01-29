import React, { useRef } from 'react'
import { useState, useEffect } from 'react'
import Movie from '../components/Movie';
import { useSearchParams, useLoaderData } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

const Movies = () => {
  
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [genres, setGenres] = useState([]);
  const [term, setTerm] = useState('');
  const [count, setCount] = useState(1);

  /* search params */
  const [searchParams, setSearchParams] = useSearchParams();

// fetch movies
  useEffect(()=> {
    fetch(!term ? `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&include_adult=false&page=${count}&${searchParams}`
     : `https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&include_adult=true&page=${count}&query=${term}`)
    .then(res=> res.json())
    .then((data)=> {
      setMovies(data.results);
      setLoading(false);
    })
  }, [count, term, searchParams])

  // fetch genres
  useEffect(()=> {
    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US`)
    .then(res=> res.json())
    .then((data)=> {
      setGenres(data.genres);
    })
  }, [])

  const movieElements = movies.length !== 0 && movies.map((movie)=> {
    return <Movie key={movie.id} movie={movie} genres={genres} count={count}/>
  })


  /* Change Movies Page Function*/
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
    {movies.length !== 0 &&
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

      {/* loading screen */}
      { loading && 
      <div className='loading-element'>
        <span>.</span>
        <span>.</span>
        <span>.</span>
      </div> }
 
    {movies.length !== 0 &&
    <section className="movies-section">
      {/* Movie Filters */}
      <div className="movie-filters">
      <select onChange={(e)=> genNewSearchParams(e.target.value)}>
        <option value="" hidden>Genres</option>
        <option value="All popular">All popular</option>
        <option value="action">Action</option>
        <option value="animation">Animation</option>
        <option value="comedy">Comedy</option>
        <option value="crime">Crime</option>
        <option value="crime">Drama</option>
        <option value="horror">Horror</option>
        <option value="music">Music</option>
        <option value="mystery">Mystery</option>
        <option value="romance">Romance</option>
        <option value="war">War</option>
      </select>
      </div>

      {/* movies cards */}
      <div className="cards" ref={cardsSection}>
        {movies && movieElements}
      </div>

      {/* next and previous page buttons*/}
      <div className="change-page-btns">
      <button onClick={()=> changePage('prev')} className="prevpage">Prev</button>
      <button onClick={()=> changePage('next')} className="nextpage">Next</button>
      </div>
    </section>}
    </>
  )
}

export default Movies