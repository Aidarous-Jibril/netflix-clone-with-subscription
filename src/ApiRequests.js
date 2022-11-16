// const THE_MOVIE_DB_API_KEY =  "eafa1aa7bdeda59b25f77454c5555837";
const key = process.env.REACT_APP_IMDB_API_KEY

const ApiRequests = {
        fetchTrending: `https://api.themoviedb.org/3/trending/all/week?api_key=${key}&language=en-US`,
        fetchNetflixOriginals: `https://api.themoviedb.org/3/discover/tv?api_key=${key}&with_networks=213`,
        fetchTopRated: `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US`,
        fetchActionMovies: `https://api.themoviedb.org/3/discover/movie?api_key=${key}&with_genres=28`,
        fetchComedyMovies: `https://api.themoviedb.org/3/discover/movie?api_key=${key}&with_genres=35`,
        fetchHorrorMovies: `https://api.themoviedb.org/3/discover/movie?api_key=${key}&with_genres=27`,
        fetchRomanceMovies: `https://api.themoviedb.org/3/discover/movie?api_key=${key}&with_genres=10749`,
        fetchDocumentaries: `https://api.themoviedb.org/3/discover/movie?api_key=${key}&with_genres=99`,
      }
      
      export default ApiRequests;