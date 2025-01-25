import React from 'react'
import { Link } from 'react-router-dom'
import {FaExclamationTriangle} from 'react-icons/fa'

const NotFoundPage = () => {
  return (
    <>
    <section className="error-wrapper">
    <FaExclamationTriangle className='mx-auto text-7xl'/>
    <p className="error-text">The page you are looking for is not here</p>
    <p className="go-back-text">
      <Link to="/">Go to Homepage</Link>
    </p>
    </section>
    </>
  )
}

export default NotFoundPage