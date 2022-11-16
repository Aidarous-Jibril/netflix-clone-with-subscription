import React, { useState, useEffect } from 'react'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { AiFillDelete } from 'react-icons/ai'
import { db } from '../firebase';
import { updateDoc, doc, onSnapshot } from 'firebase/firestore';
import { UserAuth } from '../context/AuthContext';


const MyFavorMovies = () => {
    const [movies, setMovies] = useState([])

    const { user } = UserAuth();

    useEffect(() => {
        onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
          setMovies(doc.data()?.savedFavorMovies);
        });
    // eslint-disable-next-line
    }, [])
    
    const slideLeft = () => {
        var slider = document.getElementById('slider');
        slider.scrollLeft = slider.scrollLeft - 500;
      };

    const slideRight = () => {
      var slider = document.getElementById('slider');
      slider.scrollLeft = slider.scrollLeft + 500;
    };

    const deleteMovieHandler = async (passedID) => {
      const movieRef = doc(db, 'users', `${user?.email}`)
        try {
          const result = movies.filter((item) => item.id !== passedID)
          await updateDoc(movieRef, {
              savedFavorMovies: result
          })
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <>
         <h2 className='text-gray-200 text-3xl text-center font-bold md:text-4xl p-4 mt-28 my-12'> Watch Later Movies</h2>
         
            <div className='relative flex items-center group p-2 my-20'>
                <MdChevronLeft
                  onClick={slideLeft}
                    className='bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block'
                    size={40}
                />
                <div
                    id={'slider' }
                    className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative mx-8 md:mx-12'
                >
                    {movies?.map((movie, id) => (
                      <div key={id} className='w-[160px] sm:w-[200px] md:w-[240] lg:w-[280]  inline-block cursor-pointer relative ' >
                        <img className='w-full h-auto block' src={`https://image.tmdb.org/t/p/w500/${movie?.img}` } alt="/" />
                        <div className='text-white absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100'>
                            <p className='text-xs md:text-sm font-bold flex justify-center items-center h-full'>{ movie?.name  }</p>
                            <p onClick={() => deleteMovieHandler(movie.id)} className="absolute top-4 right-4 text-gray-300 "><AiFillDelete /></p>
                        </div>
                    </div>
                    ))}
                </div>
                <MdChevronRight
                  onClick={slideRight}
                    className='bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block'
                    size={40}
                />
            </div> 
    </>
  )
}

export default MyFavorMovies
