import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';

const Home = () => {
  const [number, setNumber] = useState(31562)
  const [images, setImages] = useState([])

  useEffect(()=> {
          fetch(`https://api.themoviedb.org/3/collection/${number}/images?api_key=${import.meta.env.VITE_TMDB_API_KEY}`)
          .then(res=> res.json())
          .then((data)=> {
            console.log(data)
              setImages(data);
          })
      }, [number]);

  return (
    <>
    <section className="home-section">
{/*     {images.length !== 0 &&
      <div className="home-showcase-images">
      {images.posters.map((image)=> {
        return <div key={crypto.randomUUID()}
              className="showcase-image-div">
              <img src={`https://image.tmdb.org/t/p/original/${image.file_path}`} className='showcase-image'/>
          </div>
      })}
  </div>} */}

      <div className="home-content">
        <h1 className='heading-1'>Movies and TV Shows here</h1>
        <p className="text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo reiciendis velit doloremque magnam expedita quis. Modi rerum esse, voluptatem repudiandae accusantium numquam excepturi illo, non aliquid nobis quam officiis molestiae reiciendis distinctio fugit illum recusandae sint. Et natus, illum incidunt magnam fugit odio maiores assumenda magni a, inventore, dolores consectetur.</p>
        <div className="home-links">
          <Link to="/movies" className="home-link">Explore Movies</Link>
          <Link to="/signup" className="home-link">Sign Up</Link>
        </div>
      </div>
    </section>
    </>
  )
}

export default Home