import React from 'react'
import { useRouteError } from 'react-router-dom';
import { Link } from 'react-router-dom';

const ErrorLoader = () => {
    const error = useRouteError()

  return (
    <>
        <div className='error-element'>
            <h1>Error: {error.message}</h1>
            <p><span>{error.status}</span>, <span>{error.statusText}</span></p>
            <Link to="/" className="error-link">Go to Homepage</Link>
        </div>
    </>
  )
}

export default ErrorLoader