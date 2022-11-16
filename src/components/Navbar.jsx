import React, { useEffect, useState } from 'react';
import GoogleButton from 'react-google-button';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';


const Navbar = () => {
  const [show, setShow] = useState(false)
  const { user, googleSignIn, logOut } = UserAuth();
  const navigate = useNavigate();
  // console.log(user.email)
  
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
    
  const googleSignInHandler  = async () => {
    try {
      await googleSignIn();
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  const logOutHandler = async () => {
    try {
      await logOut();
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`fixed flex flex-wrap justify-between items-center z-[100] mx-auto px-2 sm:px-4 w-full h-[70px]  ${show && 'nav__blackClr '} `}>
        <Link to="/">
          <img src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png" alt="logo" className="mr-3 h-6 sm:h-9"  />
        </Link>
    
        <div className="flex ">
          {user?.email ? (
              <>
                <Link to='/profile'>
                  <button className='border border-white text-white font-bold py-1.5 px-5 rounded cursor-pointer mr-2 m-1'>Profile</button>
                </Link>
                <button
                  onClick={logOutHandler}
                  className='border border-white text-white bg-red-700 font-bold py-1.5 px-5 rounded cursor-pointer mr-2 m-1'
                >
                  Logout
                </button>
              </>
            
            ) : (
              <>
                <Link to='/login'>
                  <button className='border border-white text-white font-bold py-1.5 px-5 rounded cursor-pointer mr-2 m-1'>Sign In</button>
                </Link>
                <GoogleButton
                  className='mr-2 m-1 '
                  type="light" // can be light or dark
                  onClick={googleSignInHandler}
                  style={{width: '96px', height: '38px', borderRadius: '5px', overflow: 'hidden'}}
                />
                
                <Link to='/signup'>
                  <button 
                  className='border border-white bg-red-700 text-white font-bold py-1.5 px-5 rounded cursor-pointer mr-2 m-1'>
                  Sign Up
                  </button>
                </Link>
              </>
            
            )}
          
     
  
      </div>
    </div>
    
    );
};

export default Navbar;