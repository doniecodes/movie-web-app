import React from 'react'
import { Outlet } from 'react-router-dom'
import {NavLink, Link} from 'react-router-dom'
import {FaHeart, FaHome, FaUser} from 'react-icons/fa'
import { IoTrendingUp } from "react-icons/io5";
import { RiMovie2Fill } from "react-icons/ri";
import { BsPeopleFill } from "react-icons/bs";
import { BsFillTvFill  } from "react-icons/bs";



const MainOutlet = () => {

    const linkStyles = ({isActive})=> {
        return isActive ? {
            color: "white",
            opacity : "100%"
        } : null
    }

  return (
    <>
    <div className="container">

        <div className="main-display">
            <div className="sidebar">
                <p className="logo">TMFLIX</p>
                <nav className="sidebar-nav">
                    <NavLink className="nav-link"
                    style={linkStyles} to="/">
                    <span><FaHome /></span>Home
                    </NavLink>
                    <NavLink className="nav-link"
                    style={linkStyles} to="/trending">
                        <span><IoTrendingUp /></span>Trending
                    </NavLink>
                    <NavLink className="nav-link"
                     style={linkStyles} to="/movies">
                        <span><RiMovie2Fill /></span>Movies
                    </NavLink>
                    <NavLink className="nav-link"
                     style={linkStyles} to="/shows">
                        <span><BsFillTvFill /></span>Shows   
                    </NavLink>
                    <NavLink className="nav-link"
                    style={linkStyles} to="/actors">
                        <span><BsPeopleFill /></span>Actors
                    </NavLink>
                    <NavLink className="nav-link"
                    style={linkStyles} to="/favourites">
                        <span><FaHeart /></span>Favourites
                    </NavLink>
                </nav>

                {/* sign up button */}
                <Link to="signup" className='sign-up-btn'><span><FaUser /></span>Sign Up</Link>

                {/* tmdb attribution */}
                <img src="../images/tmdb.svg" alt="" className='tmdb-svg'/>
            </div>
        </div>

        <div className='outlet'>
        <Outlet />
        </div>
    </div>
    </>
  )
}

export default MainOutlet