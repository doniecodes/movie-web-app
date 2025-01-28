import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

const Actors = () => {
  const [actors, setActors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [term, setTerm] = useState("");
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
    
    const handleSubmit = (e)=> {
        e.preventDefault();
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

    <section className='actors-section'>
      <div className="cards" ref={cardsSection}>
      {
        actors.map((actor)=> {

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