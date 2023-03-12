export const MovieConfigs = {
    API_KEY: "1e448e0dfcdbb565f5d329820065b4d2",
    API_URL: "https://api.themoviedb.org/3"
}


export const MoviesUrls = {
    popular: `${MovieConfigs.API_URL}/movie/popular?api_key=${MovieConfigs.API_KEY}`,
    topRated: `${MovieConfigs.API_URL}/movie/top_rated?api_key=${MovieConfigs.API_KEY}`,
    upcoming: `${MovieConfigs.API_URL}/movie/upcoming?api_key=${MovieConfigs.API_KEY}`,
    languageGetUrl: `${MovieConfigs.API_URL}/configuration/languages?api_key=${MovieConfigs.API_KEY}`,
    searchMovie: `${MovieConfigs.API_URL}/search/movie?api_key=${MovieConfigs.API_KEY}`,
    discoverMovie: `${MovieConfigs.API_URL}/discover/movie?api_key=${MovieConfigs.API_KEY}`,
    netflix:`${MovieConfigs.API_URL}/discover/tv?api_key=${MovieConfigs.API_KEY}`,
    trending:`${MovieConfigs.API_URL}/trending/movie/day?api_key=${MovieConfigs.API_KEY}`,
}