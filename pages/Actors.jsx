import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom';

const Actors = () => {
  const [actors, setActors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [term, setTerm] = useState("");
  const [actorDetails, setActorDetails] = useState([]);
  const [count, setCount] = useState(1);

  useEffect(()=> {
      fetch(!term ? `https://api.themoviedb.org/3/person/popular?api_key=${import.meta.env.VITE_TMDB_API_KEY}&page=${count}`
        : `https://api.themoviedb.org/3/search/person?query=${term}&api_key=${import.meta.env.VITE_TMDB_API_KEY}&page=${count}`
      )
      .then(res=> res.json())
      .then((data)=> {
        setActors(data.results);
        setLoading(false);
      })
    }, [count, term])

    // Actor Details
  useEffect(()=> {
      actors.map((actor)=> {
        fetch(`https://api.themoviedb.org/3/person/${actor.id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`)
      .then(res=> res.json())
      .then((data)=> {
        setActorDetails((prevState)=> {
          return [...prevState, data]
        })
      })
      })
    }, [actors])

    const inputSearch = (e)=> {
        setTerm(e);
      }
    
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

  return (
    <>
    {actors.length !== 0 &&
    <header>
    <form action="">
        <input className='header-input'
        type="text"
        name="search"
        value={term}
        onChange={(e)=> inputSearch(e.target.value)}/>
        <button className='header-btn'>Search</button>
    </form>
  </header>}

    {/* loading screen */}
    {loading && <h2 className='px-8 py-8'>Loading....</h2>}

    <section className='actors-section'>
      <div className="cards" ref={cardsSection}>
      {
        actors.map((actor)=> {
          // actors birthDay

          return <Link to={`/actors/${actor.id}`} key={actor.id}>
          <div className="card">
            <div className="image-div">
              <img src={`https://image.tmdb.org/t/p/original/${actor.profile_path}`} alt="" className='card-img'/>
            </div>
            <div className="card-details">
              <h2 className="card-title">{actor.name}</h2>
              <p className='year-and-genre'> | <span>{actor.known_for_department}</span> </p>
            </div>
          </div>
      </Link>
        })
      }
      </div>

       {/* next and previous page buttons*/}
       {actors.length !== 0 &&
      <div className="change-page-btns">
      <button onClick={()=> changePage('prev')} className="prevpage">Prev</button>
      <button onClick={()=> changePage('next')} className="nextpage">Next</button>
      </div>}
    </section>
    </>
  )
}

export default Actors