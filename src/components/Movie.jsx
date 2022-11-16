import React, { useState } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { UserAuth } from '../context/AuthContext'
import { db } from '../firebase'
import { setDoc, doc, arrayUnion, updateDoc } from 'firebase/firestore'


const Movie = ({ movie, id }) => {
    const [like, setLike] = useState(false)
    const [saved, setSaved] = useState(false)
    const { user } = UserAuth();

const imgBaseUrl = 'https://image.tmdb.org/t/p/w500'

    const userRef = doc(db, 'users', `${user?.email}`);
    // const userRef = user.email
    const saveMovie = async () => {
      if (user?.email) {
        setLike(!like);
        setSaved(true);
        await updateDoc(userRef, {
          savedFavorMovies: arrayUnion({
            id: movie.id,
            name: movie.name || movie.title,
            img: movie.backdrop_path,
          }),
        });
      } else {
        alert('Please log in to save a movie');
      }
    };

  return (
    <div key={id} className='w-[160px] sm:w-[200px] md:w-[240] lg:w-[280] inline-block cursor-pointer relative p-2 row ' >
        <img className='w-full h-auto block rowImg' src={`${imgBaseUrl}/${movie?.backdrop_path && movie.backdrop_path }`} alt="/" />
        <div className='text-white absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100'>
            <p className='text-xs md:text-sm font-bold flex justify-center items-center h-full'>{ movie?.title || movie?.name }</p>
            <p onClick={saveMovie}>{like ? <FaHeart className='absolute top-4 left-4 text-gray-300 '/> : <FaRegHeart className='absolute top-4 left-4 text-gray-300' /> }</p>
        </div>
    </div>
  )
}



export default Movie