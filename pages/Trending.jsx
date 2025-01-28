import React from 'react'
import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom';

const Trending = () => {
  const [trending, setTrending] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [term, setTerm] = useState("");
  const [list, setList] = useState("tv");
  const [listRoute, setListRoute] = useState("shows");
  const [loading, setLoading] = useState(true);

  /* Fetch now playing  */
  useEffect(()=> {
      fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&include_adult=false&page=1`)
      .then(res=> res.json())
      .then((data)=> {
        setNowPlaying(data.results);
        setLoading(false)
      })
    }, [term])

  /* Fetch Trendingg  */
  useEffect(()=> {
      fetch(`https://api.themoviedb.org/3/trending/${list}/day?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&include_adult=false&page=1`)
      .then(res=> res.json())
      .then((data)=> {
        setTrending(data.results);
      })
    }, [list, term])

  /* Fetch Upcoming  */
  useEffect(()=> {
      fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&include_adult=false&page=1`)
      .then(res=> res.json())
      .then((data)=> {
        setUpcoming(data.results);
      })
    }, [term])

    /* Handle List Change */
    const handleListChange = (text)=> {
      if(text === "Tv Shows"){
        setList("tv");
        setListRoute("shows")
      } else if(text === "Movies"){
        setList("movie")
        setListRoute("movies")
      }
    }

    const linkStyle = ({isActive})=> {
      return {
        backgroundColor: isActive ? "hsl(189, 68%, 18%)" : "initial",
      }
    }


  return (
    <>
    {/* <h1>Trending on TMFLIX</h1> */}
     { nowPlaying.length !== 0 &&
      <section className='showcase-section'>
        <div className="showcase-toggle-div">
        <h2 className="heading-3">Now Playing</h2>
        </div>
        <div className="showcase-cards">
            { nowPlaying.map((movie)=> {
                    return <Link key={movie.id} to={`/movies/${movie.id}`}>
                    <div className="showcase-card">
                      <div className="image-div">
                        <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={movie.title} className='card-img'/>
                        <p>{movie.vote_average.toFixed(1)}</p>
                      </div>
                    </div>
                </Link>
                })
            }
        </div>
    </section> }

     { trending.length !== 0 && 
      <section className='showcase-section'>
        <div className="showcase-toggle-div">
        <h2 className="heading-3">Trending</h2>
        <div className="showcase-toggle">
          <NavLink style={linkStyle}
           className="toggle-item"
          onClick={(e)=> handleListChange(e.target.innerText)}>Tv Shows</NavLink>
          <NavLink style={linkStyle}
           className="toggle-item"
          onClick={(e)=> handleListChange(e.target.innerText)}>Movies</NavLink>
        </div>
        </div>
        <div className="showcase-cards">
            { trending.map((movie)=> {
                    return <Link key={movie.id} to={`/${listRoute}/${movie.id}`}>
                    <div className="showcase-card">
                      <div className="image-div">
                        <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={movie.title} className='card-img'/>
                        <p>{movie.vote_average.toFixed(1)}</p>
                      </div>
                    </div>
                </Link>
                })
            }
        </div>
    </section> }

    { upcoming.length !== 0 &&
      <section className='showcase-section'>
        <div className="showcase-toggle-div">
        <h2 className="heading-3">Top Rated Movies</h2>
        </div>
        <div className="showcase-cards">
            { upcoming.map((movie)=> {
                    return <Link key={movie.id} to={`/movies/${movie.id}`}>
                    <div className="showcase-card">
                      <div className="image-div">
                        <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={movie.title} className='card-img'/>
                        <p>{movie.vote_average.toFixed(1)}</p>
                      </div>
                    </div>
                </Link>
                })
            }
        </div>
    </section> }
    
    {/* loading screen */}
    { loading && 
      <div className='loading-element'>
        <span>.</span>
        <span>.</span>
        <span>.</span>
      </div> }
    </>
  )
}

export default Trending