import React from 'react'
import Banner from '../components/Banner'
import Rows from '../components/Rows'
import ApiRequests from '../ApiRequests'
const HomeScreen = () => {
  return (
    <div>
        <Banner />
        
        <Rows title='Netflix Originals' fetchUrl={ApiRequests.fetchNetflixOriginals}  rowId='1'  />
        <Rows title='Trending Now' fetchUrl={ApiRequests.fetchTrending} rowId='2'/>
        <Rows title='Top Rated' fetchUrl={ApiRequests.fetchTopRated} rowId='3'/>
        <Rows title='Comedy Movies' fetchUrl={ApiRequests.fetchComedyMovies} rowId='5' />
        <Rows title='Action Movies' fetchUrl={ApiRequests.fetchActionMovies} rowId='4' />
        <Rows title='Horror Movies' fetchUrl={ApiRequests.fetchHorrorMovies}  rowId='6' />        
        <Rows title='Romantic Movies' fetchUrl={ApiRequests.fetchRomanceMovies} rowId='7' />        
        <Rows title='Documentaries' fetchUrl={ApiRequests.fetchDocumentaries} rowId='8' />        
    </div>
    
  )
}

export default HomeScreen