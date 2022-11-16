import axios from 'axios'
import React, { useState, useEffect } from 'react'
import ApiRequests from '../ApiRequests'

const Banner = () => {
    const [movie, setMovie] = useState([])

    useEffect(() => {
    const fetchApi = async () => {
        const { data } = await axios.get(ApiRequests.fetchNetflixOriginals)
            setMovie(data.results[Math.floor(Math.random() * data.results.length -1 )])
        }
        fetchApi();
    }, [])
    
    const truncate = (str, n) => {
      return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    // console.log(movie)
  return (
    <div className='w-full h-[550px] text-white'>
      <div className="w-full h-full">
        <div className="w-full h-[550px] absolute bg-gradient-to-r from-black "></div>
        <img className='w-full h-full object-cover' src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}` } alt={'/'}/>
        
        <div className='absolute w-full top-[20%] p-4 md:p-8'>
          <h1 className='text-white mb-8 text-4xl'>{movie?.name}</h1>
          <button className='bg-gray-300 text-2xl rounded text-black border-gray-300 px-5 py-2 mr-4 hover:bg-gray-400'>Play Now</button>
          <button className='bg-red-700 text-2xl rounded border-gray-300 px-5 py-2 hover:bg-red-600'>Watch Later</button>
          <p className='sm:my-4 md:my-6 lg:my-8 '>Released: <span className='text-gray-400  ' >{movie?.first_air_date}</span></p>
          <p className="text-white w-full md:max-w[70%] lg:max-w[60%] xl:max-w-[50%]">{truncate(movie?.overview, 150)} </p>
        </div>

      </div>
    </div>
  )
}

export default Banner

