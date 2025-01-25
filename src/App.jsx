import React from 'react';
import { useState, useEffect } from 'react';
import './index.css';
import { Route, Router,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
  } from 'react-router-dom';

import Home from '../pages/Home';
import MainOutlet from '../pages/MainOutlet'
import NotFoundPage from '../pages/NotFoundPage';
import TvShows from '../pages/TvShows';
import Movies from '../pages/Movies';
import Trending from '../pages/Trending';
import Actors from '../pages/Actors';
import Favourites from '../pages/Favourites';
import MoviePreview from '../pages/MoviePreview';
import ShowPreview from '../pages/ShowPreview';
import ActorPreview from '../pages/ActorPreview';

    
    const router = createBrowserRouter(
      createRoutesFromElements(
        <Route path="/" element={<MainOutlet />}>
          <Route index element={<Home />} />

          <Route path="/movies/" element={<Movies />} />
          <Route path="/movies/:id" element={<MoviePreview />} />

          <Route path="/trending" element={<Trending />} />

          <Route path="/shows" element={<TvShows />} />
          <Route path="/shows/:id" element={<ShowPreview />} />

          <Route path="/actors" element={<Actors />} />
          <Route path="/actors/:id" element={<ActorPreview />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      )
    )

function App() {
  return (
    <>
    <RouterProvider router={router} />
    </>
  )
}

export default App