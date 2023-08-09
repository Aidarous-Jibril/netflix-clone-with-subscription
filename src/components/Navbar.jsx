import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';


const Navbar = () => {
  const [show, setShow] = useState(false)
  const { user, logOut } = UserAuth();
  const [navbar, setNavbar] = useState(false)
  const navigate = useNavigate();
  console.log(user?.email)
  
  const transitionNavBar = () => {
    if(window.scrollY > 100) {
        setShow(true)
    } else {
        setShow(false)
    }
}
// console.log(user)
  useEffect(() => {
    window.addEventListener('scroll', transitionNavBar)

    return () => { window.removeEventListener('scroll', transitionNavBar)}
  }, [])
    

  const logOutHandler = async () => {
    try {
      await logOut();
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (

    <nav className="w-full bg-purple-500 shadow z-[100]">
        {/* <div className={`fixed flex flex-wrap justify-between items-center z-[100] mx-auto px-2 sm:px-4 w-full h-[70px]  ${show && 'nav__blackClr '} `}> */}
        <div className={`fixed justify-between px-2 mx-auto md:items-center md:flex sm:px-4 z-[100] w-full h-[70px] ${show && 'nav__blackClr '} `}>
            <div>
                <div className="flex items-center justify-between py-3 md:py-5 md:block">
                     <Link to="/" onClick={() => setNavbar(false)}>
                       <img src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png" alt="logo" className="mr-3 h-6 sm:h-9"  />
                     </Link>
                    <div className="md:hidden">
                        <button
                            className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                            onClick={() => setNavbar(!navbar)}
                        >
                            {navbar ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6 text-white"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Small and mobile devices menu */}
            <div>
                <div
                    className={`flex-1 justify-self-center pb-3 mt-2 lg:block md:pb-0 md:mt-0 mb-16 ${
                        navbar ? "block" : "hidden"
                    }`}
                >
                        {user?.email ? (
                            <div className="mt-3 space-y-2 lg:hidden md:inline-block ">
                                 <Link to='/profile' onClick={() => setNavbar(false)}>
                                  <button  className="inline-block w-full px-4 py-2 text-center text-white bg-gray-600 rounded-md shadow hover:bg-gray-800">Profile</button>
                                </Link>
                                 
                                  <button  onClick={ () => { logOutHandler(); setNavbar(false);} }
                                    className="inline-block w-full px-4 py-2 text-center text-gray-800 bg-white rounded-md shadow">
                                        Logout
                                </button>
                            </div>
                        ): (
                            <div className="mt-0 space-y-2 lg:hidden md:inline-block ">
                                <Link to='/login' onClick={() => setNavbar(false)} >
                                    <button   className="inline-block w-full px-4 py-2 text-center text-white bg-gray-600 rounded-md shadow hover:bg-gray-800">Sing in</button>
                                </Link>
                            </div>
                        )}

                    
                </div>
            </div>

            {/* navbar from md and above devices  */}
            <div className="hidden space-x-2 md:flex">
                {user?.email ? (
                    <>
                        <Link to='/profile' >
                            <button   className="px-4 py-1.5 text-white bg-gray-600 rounded-md shadow hover:bg-gray-800">Profile</button>
                        </Link>
                        <button
                            onClick={logOutHandler}
                            className='px-4 py-1.5 text-center bg-red-700 text-white rounded-md shadow hover:bg-red-500'
                            >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to='/login' >
                            <button   className="px-4 py-1.5 text-white bg-gray-600 rounded-md shadow hover:bg-gray-800">Sing in</button>
                        </Link> 
                    </>
                )}
            
            </div>
        </div>
    </nav>



    );
};

export default Navbar;