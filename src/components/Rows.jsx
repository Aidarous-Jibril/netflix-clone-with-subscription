import React, { useState, useEffect } from 'react'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import axios from 'axios';

import Movie from './Movie';



const imgBaseUrl = "https://image.tmdb.org/t/p/w500/";

const Rows = ({ title, fetchUrl, rowId }) => {
const [movies, setMovies] = useState([]);

useEffect(() => {
    const fetchData = async () => {
        const { data } = await axios.get(fetchUrl)
        setMovies(data.results)
    }
    fetchData();
// eslint-disable-next-line
}, [])

const slideLeft = () => {
    var slider = document.getElementById('slider' + rowId);
    slider.scrollLeft = slider.scrollLeft - 500;
  };
  const slideRight = () => {
    var slider = document.getElementById('slider' + rowId);
    slider.scrollLeft = slider.scrollLeft + 500;
  };


// console.log('MOVIES', movies)
  return (
        <>
          <h2 className='text-white font-bold md:text-xl p-4'>{title}</h2>
            <div className='relative flex items-center group'>
                <MdChevronLeft
                  onClick={slideLeft}
                    className='bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block'
                    size={40}
                />
                <div
                    id={'slider' + rowId }
                    className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative mx-4'
                >
                    {movies.map((movie, id) => (
                        <Movie key={id} movie={movie} />
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

export default Rows