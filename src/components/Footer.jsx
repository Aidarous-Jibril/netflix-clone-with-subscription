import React from 'react'

import links from '../links.json'

const Footer = () => {
  return (
     
<div className="mt-24 p-4 bg-black/60 rounded-lg shadow md:px-6 md:py-8 dark:bg-gray-900">
        <hr className="my-6 lg:my-8 sm:mx-auto dark:border-gray-700 border-4 border-gray-900 w-full" />
        <span className='block mb-16 lg:my-8 text-lg text-gray-500  sm:text-center cursor-pointer'>Questions? Call 0201 604 328</span>
    
    <div className="sm:flex sm:items-center sm:justify-between">
        <a className="flex items-center mb-4 sm:mb-0 cursor-pointer">
            <img src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png" className="mr-3 h-8" alt="/" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Netflix</span>
        </a>
        <ul className="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0 dark:text-gray-400">
            {links.map((item, id) => (

            <li key={item.id}>
                <a href="#" className="mr-4 hover:underline md:mr-6 mb-8">{item.link}</a>
            </li>
            ))}
        </ul>
    </div>
    <span className="block text-sm mt-16 text-gray-500 sm:text-center dark:text-gray-400">© 2022 <a href="/" className="hover:underline">Netflix</a>. All Rights Reserved.
    </span>
</div>

  )
}

export default Footer