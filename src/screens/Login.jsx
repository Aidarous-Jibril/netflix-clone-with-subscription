import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
import GoogleButton from 'react-google-button'


const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    
    const {  googleSignIn, logIn } = UserAuth();
    const navigate = useNavigate()
    

    const loginHandler = async (e) => {
        e.preventDefault();
        try {
           await logIn(email, password);
           navigate('/')

        } catch (error) {
            console.log(error)
            setError(error.message)
        }
      }

    const googleSignInHandler  = async () => {
        try {
            await googleSignIn();
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className='w-full h-[550px]'>
        <img className='absolute hidden sm:block w-full h-full object-cover' src='https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg'
            alt="/" />
        <div className="fixed w-full h-full top-0 left-0 bg-black/60"></div>

        <div className="fixed w-full px-4 py-24 z-50">
            <div className="bg-black/75 text-white max-w-[450px] h-[600px] mx-auto ">
                <div className="max-w-[320px] mx-auto py-16">
                <h1 className='text-white text-2xl font-bold mb-4'>Sing  In </h1>
                {error ? <p className='p-3 bg-red-400 my-2'>{error}</p> : null}
                    <form 
                        className='w-full flex flex-col'
                        onSubmit={loginHandler}
                    >
                        <input className='p-3 my-2 bg-gray-600 rounded' type="email" placeholder='Email or phone number' 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input className='p-3 my-2 bg-gray-600 rounded' type="password" placeholder='Password' 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            />
                        <button type='submit' className="bg-red-600 text-white font-bold p-3 my-6 rounded">Sign in</button>

                        <div className='flex justify-between items-center text-gray-400 text-sm'>        
                        <p><input type='checkbox'  className='mr-2' />Remember me</p>
                        <p>Need Help?</p>

                        </div>
                        <p className='text-white font-bold justify-center items-center mx-auto py-4'>Or</p>
                        <GoogleButton
                    
                            label='Sing in with Google'
                            type="light" // can be light or dark
                            onClick={googleSignInHandler}
                            style={{width: '320px', height: '46px', borderRadius: '5px',  overflow: 'hidden'}}
                        />   
                        <p className='mt-20 text-white '>
                            <span className='text-xm text-gray-400 mr-2'>New to Netflix?</span >
                            <Link to='/signup'>Sing Up</Link>
                        </p>
                    </form>
                </div>    
            </div>            

        </div>
    </div>

  )
}

export default Login