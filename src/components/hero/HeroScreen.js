import React, { useMemo } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { getHeroById } from '../../selectors/getHeroById';

export const HeroScreen = () => {

  const {heroId} = useParams();
  const navigate = useNavigate();

  const hero = useMemo( () => getHeroById(heroId), [heroId])

  if (!hero) {
    return <Navigate to='/' />
  }

  const imagePath = `/assets/${hero.id}.jpg`;

  const handleReturn = () => {
    navigate(-1);

  }

  return (
    <div className='row mt-5'>
      <div className='col-4'>
        <img src={imagePath} alt={heroId} className="img-thumbnail animate__animated animate__fadeInLeft"/>
      </div>
      <div className='col-8'>
        <h3> {hero.superhero} </h3>
        <ul className='list-group list-group-flush'>
          <li className='list-group-item'> <b>Alter ego: </b> {hero.alter_ego} </li>
          <li className='list-group-item'> <b>Publisher: </b> {hero.publisher} </li>
          <li className='list-group-item'> <b>Alter ego: </b> {hero.alter_ego} </li>
        </ul>

        <h5 className='mt-3'>Characteres</h5>
        <p> {hero.characters} </p>

        <button
          className='btn btn-outline-info'
          onClick={handleReturn}
        >
          Regrear
        </button>
      </div>
    </div>
  )
}
