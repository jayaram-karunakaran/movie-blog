export const MoviesUrls = {
    popular: `${process.env.REACT_APP_API_URL}/movie/popular?api_key=${process.env.REACT_APP_API_KEY}`,
    topRated: `${process.env.REACT_APP_API_URL}/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}`,
    upcoming: `${process.env.REACT_APP_API_URL}/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}`,
    languageGetUrl: `${process.env.REACT_APP_API_URL}/configuration/languages?api_key=${process.env.REACT_APP_API_KEY}`,
    searchMovie: `${process.env.REACT_APP_API_URL}/search/movie?api_key=${process.env.REACT_APP_API_KEY}`,
    discoverMovie: `${process.env.REACT_APP_API_URL}/discover/movie?api_key=${process.env.REACT_APP_API_KEY}`,
    netflix:`${process.env.REACT_APP_API_URL}/discover/tv?api_key=${process.env.REACT_APP_API_KEY}`,
    trending:`${process.env.REACT_APP_API_URL}/trending/movie/day?api_key=${process.env.REACT_APP_API_KEY}`,
}