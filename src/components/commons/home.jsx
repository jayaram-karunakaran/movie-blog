import React, { useCallback, useEffect, useState } from "react";
import TobBar from "./TobBar";
import Footer from "./footer";
import { useNavigate } from "react-router-dom";
import MovieSection from "../movie/MovieSection";
import { MoviesUrls } from "../../constants/movieConfigs";
import cloneDeep from "lodash/cloneDeep";
import { API_IMG } from "../../constants/imageUrls";
import { Drawer } from "@mui/material";

export const Home = ({searchTerm, onSearch}) => {
  const [movies, setMovies] = useState({ popular: [], topRated: [], upcoming: [], netflix: [], trending: [] });
  const [isQueryTypeMovieName, setQueryType] = useState(true);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [language, setLanguage] = useState("en");
  const [languageList, setLanguageList] = useState([]);
  const navigate = useNavigate();
  const [randomMovie, setRandomMovie] = useState({})
  const [user, setUser] = useState({name:'', password:''},);

  const apiCall = useCallback(async () => {
    //search api and get popular movie api handle
    let obj = cloneDeep(movies);

    if (query) {
      const searchUrl = isQueryTypeMovieName ?
        `${MoviesUrls.searchMovie}&query=${query}?` :
        `${MoviesUrls.discoverMovie}&year=${query}`;
      await fetch(searchUrl)
        .then((res) => res.json())
        .then((data) => {
          obj = { ...obj, popular: data.results };
        });
      setMovies(obj);
    } else {

      //trending
      await fetch(`${MoviesUrls.trending}&with_original_language=${language}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.results && data.results.length) setTimeout(() => {
            setRandomMovie(data.results[Math.floor(Math.random() * data.results.length)])
          }, 200);
          obj = { ...obj, trending: data.results };
          setMovies(cloneDeep(obj));
        });

      //popularMovieUrl
      await fetch(`${MoviesUrls.popular}&with_original_language=${language}`)
        .then((res) => res.json())
        .then((data) => {
          obj = { ...obj, popular: data.results };
          setMovies(cloneDeep(obj));
        });

      //topRated
      await fetch(`${MoviesUrls.topRated}&with_original_language=${language}`)
        .then((res) => res.json())
        .then((data) => {
          obj = { ...obj, topRated: data.results };
          setMovies(cloneDeep(obj));
        });

      //netflix
      await fetch(`${MoviesUrls.netflix}&with_original_language=${language}`)
        .then((res) => res.json())
        .then((data) => {
          obj = { ...obj, netflix: data.results };
          setMovies(cloneDeep(obj));
        });


      //upcoming
      await fetch(`${MoviesUrls.upcoming}`)
        .then((res) => res.json())
        .then((data) => {
          obj = { ...obj, upcoming: data.results };
          setMovies(cloneDeep(obj));
        });
    }
  }, [query, isQueryTypeMovieName, language]);

  useEffect(() => {
    fetch(MoviesUrls.languageGetUrl)
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data) && data.length)
          setLanguageList(data.filter((e) => e.name));
      });
  }, []);

  useEffect(() => {
    apiCall();
  }, [apiCall]);

  function signIn(){
    
  }

  function routeTo(id) {
    navigate(`/${id}`);
  }

  return (
    <div className="h-full">
      <TobBar
        selectLang={(e) => setLanguage(e.target.value)}
        loginClick={() => setOpen(true)}
        {...{
          title: "Martin's Movie",
          query,
          setQuery,
          language,
          languageList,
          isQueryTypeMovieName,
          setQueryType,
        }}
      />

      {!query && movies.trending.length ? <div className="sticky top-0 -z-10 h-20 md:h-40 lg:h-60 xl:h-80">
        <div className="hidden md:block absolute md:pl-10 lg:pl-40  top-[40%] items-center text-white bg-black/80 md:p-5 lg:p-10 rounded-tr-full rounded-br-full">
          <div className="text-lg  md:text-xl lg:text-3xl  font-bold pr-10">{randomMovie.title}</div>
          <div className="text-sm pt-3 pr-10 w-80 md:w-[400px] truncateTextOverview">{randomMovie.overview}</div>
        </div>
        <img src={API_IMG + randomMovie.backdrop_path} className="w-full object-fit" alt="cover_image" />
      </div> : null}

      <div className="relative">
        {<div className={`${query ? 'pt-20 bg-white' : 'fadeImage'}`} />}
        <div className="px-5 md:px-10 bg-white">
          <MovieSection movieList={movies.popular} {...{ title: "Popular Movies", query }} />
          {!query ? <div>
            {movies.topRated.length ? <MovieSection movieList={movies.topRated} {...{ title: "Top Rated Movies" }} /> : null}
            {movies.netflix.length ? <MovieSection movieList={movies.netflix} {...{ title: "Netflix Originals" }} /> : null}
            {movies.upcoming.length ? <MovieSection movieList={movies.upcoming} {...{ title: "Upcoming Movies" }} /> : null}
          </div> : null}
        </div>
      </div>

      <Footer />

      <Drawer anchor="right" open={open} onClose={()=> setOpen(false)}>
        <div className="p-8 w-[400px]">
          <div className='flex flex-col text-gray-400 py-2'>
            <label>Name</label>
            <input className='rounded-lg bg-[#fffff] mt-2 p-2 border' type="text" onChange={(e)=> setUser({...user, name:e.target.value})} />
          </div>
          <div className='flex flex-col text-gray-400 py-2'>
            <label>Password</label>
            <input className='rounded-lg bg-[#fffff] mt-2 p-2 border' type="password"  onChange={(e)=> setUser({...user, name:e.target.value})} />
          </div>

          <div className="flex justify-center pt-5">
            <button className="bg-black/40 text-white px-4 py-2 rounded-lg" onClick={signIn}>Sign In</button>
          </div>
        </div>
      </Drawer>
    </div>
  );
};
