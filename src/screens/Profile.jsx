import React from 'react'
import MySavedFavorMovies from '../components/MySavedFavorMovies'
import PlansScreen from './PlansScreen'

const Profile = () => {
  return (
    <>
    <div className='w-full h-[550px] '>
        <img className='absolute hidden sm:block w-full h-[550px] object-cover' src='https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg'
            alt="/" />
        <div className='bg-black/60 fixed top-0 left-0 w-full h-[600px]'></div>
        <PlansScreen />
      </div>
    <MySavedFavorMovies />
    </>
  )
}

export default Profile
