import React from 'react'
import { useLoaderData } from 'react-router-dom'
import { authRequired } from '../data/utils';
import { getFavourites } from '../data/api';

export async function loader ({request}) {
  await authRequired(request);
  return await getFavourites();
}

const Favourites = () => {
const favourites = useLoaderData();

  return (
    <>
    <section className="favourites-section">
      <div>FAVOURITES</div>
    </section>
    </>
  )
}

export default Favourites