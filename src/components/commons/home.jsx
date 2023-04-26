import React, { useCallback, useEffect, useState } from "react";
import TobBar from "./TobBar";
import MovieSection from "../movie/MovieSection";
import { MoviesUrls } from "../../constants/movieConfigs";
import cloneDeep from "lodash/cloneDeep";
import { API_IMG, API_IMG_W500 } from "../../constants/imageUrls";
import { Drawer } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import TheaterComedyIcon from "@mui/icons-material/TheaterComedy";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { allHomeApiCalls } from "../../configs/homeApiCalls";
import { setMovieInWatchedConfig } from "../../configs/movieWatchSelection";
import { Loader } from "./loader";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  let title = "Jay Movies";
  const [movies, setMovies] = useState({
    popular: [],
    topRated: [],
    upcoming: [],
    netflix: [],
    trending: [],
  });

  const navigate = useNavigate();
  const [search, setSearch] = useState(false);
  const [showMenu, setMenu] = useState(false);
  const [isQueryTypeMovieName, setQueryType] = useState(true);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [language, setLanguage] = useState("en");
  const [randomMovie, setRandomMovie] = useState({});
  const [selectedMovie, setSelectedMovie] = useState({});
  const [languageList, setLanguageList] = useState([]);
  const [user, setUser] = useState({ name: "", pwd: "" });
  const [loader, setLoader] = useState(false);

  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("USR") ?? null)
  );
  const [movieWatched, setMovieWatched] = useState(
    JSON.parse(localStorage.getItem("WATCHED")) ?? {}
  );

  const apiCall = useCallback(async () => {
    //search api and get popular movie api handle
    let obj = cloneDeep(movies);
    if (query) {
      debugger
      const searchUrl = isQueryTypeMovieName
        ? `${MoviesUrls.searchMovie}&query=${query}?`
        : `${MoviesUrls.discoverMovie}&year=${query}`;
      await fetch(searchUrl)
        .then((res) => res.json())
        .then((data) => {
          obj = { ...obj, popular: data.results };
        });
      setMovies(obj);
    } else {
      setLoader(true);
      //trending
      await fetch(`${MoviesUrls.trending}&with_original_language=${language}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.results && data.results.length)
            setRandomMovie(
              data.results[Math.floor(Math.random() * data.results.length)]
            );
          obj = { ...obj, trending: data.results };
          setMovies(cloneDeep(obj));
        });

      await allHomeApiCalls(obj, MoviesUrls, language, setMovies, cloneDeep, setLoader);
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

  const loginOrOutClick = () => {
    if (userData) {
      setUserData(null);
      localStorage.setItem("USR", null);
      setOpen(false);
    } else setOpen(true);
  };

  const isSignInEnable = Boolean(user.name.length && user.pwd.length >= 4);
  const isMovieSelected = Boolean(selectedMovie && selectedMovie?.id);

  function signIn() {
    if (isSignInEnable) {
      setUserData(user);
      localStorage.setItem("USR", JSON.stringify(user));
      setOpen(false);
    }
  }


  const ViewDetailSection = () => (
    <div
      className="absolute inset-0 h-screen w-screen bg-blur bg-black/60 overflow-y-scroll "
      style={{ zIndex: 999 }}
    >
      <div className="relative py-32 px-10 md:px-20 lg:px-40 xl:px-60 flex flex-col justify-center items-center ">
        <div className="relative">
          <CloseIcon
            onClick={() => setSelectedMovie({})}
            sx={{ fontSize: { xs: 30, md: 40 } }}
            className="absolute top-5 right-5 text-white bg-blur bg-black/40 rounded-full p-1 md:p-2  cursor-pointer"
          />
          <img
            src={API_IMG + selectedMovie?.backdrop_path ?? ""}
            className="rounded-lg"
            alt="cover_image"
          />
        </div>
        <div className="w-full relative -top-40 ">
          <div className={`fadeImage`} />
          <div className="p-4 bg-white rounded-b-lg">
            <div className="flex flex-col  flex-1 md:p-5 lg:p-10 bg-white rounded-b-lg">
              <div className="flex items-center">
                <div className="text-lg md:text-xl lg:text-3xl font-bold pr-2">
                  {selectedMovie?.title}
                </div>
                <div
                  className="flex items-center bg-black/20 text-black pr-3 rounded-2xl"
                  onClick={() =>
                    setMovieInWatchedConfig(
                      selectedMovie,
                      "WATCH",
                      userData,
                      cloneDeep,
                      movieWatched,
                      setMovieWatched,
                      setOpen,
                      setSelectedMovie
                    )
                  }
                >
                  <div
                    className="p-1 rounded-full cursor-pointer"
                    title={
                      movieWatched && movieWatched[selectedMovie.id]
                        ? "Watched"
                        : "Watch"
                    }
                  >
                    {movieWatched && movieWatched[selectedMovie.id] ? (
                      <CheckCircleOutlineIcon
                        sx={{ fontSize: { xs: 20, md: 28 } }}
                      />
                    ) : (
                      <PlayCircleIcon
                        sx={{ fontSize: { xs: 20, md: 28 } }}
                      />
                    )}
                  </div>
                  <div>
                    {movieWatched && movieWatched[selectedMovie.id]
                      ? "Watched"
                      : "Watch"}
                  </div>
                </div>
              </div>
              <div className="text-sm pt-3 flex-1">
                {selectedMovie?.overview}
              </div>

              {selectedMovie?.cast?.length ? <div className="mt-5">
                <div className="text-lg md:text-2xl font-bold">Cast</div>
                <div className="mt-2 flex flex-row overflow-x-scroll gap-4">
                  {selectedMovie.cast.map(({ name, cast_id, profile_path }, i) => {
                    return profile_path ?
                      <div key={cast_id ? cast_id.toString() : i.toString()}>
                        <div className="w-20 md:w-32">
                          <img src={API_IMG_W500 + profile_path} alt="cast" className="rounded-lg" />
                          <div className="pt-1 text-gray-600 text-sm">{name}</div>
                        </div>
                      </div> : null
                  })}</div>
              </div> : null}

              {selectedMovie?.similar?.length ? <div className="mt-3">
                <MovieSection
                  movieList={selectedMovie.similar}
                  {...{
                    title: "Similar Movies",
                    movieWatched,
                    setMovieInWatched: (movie, type) =>
                      setMovieInWatchedConfig(
                        movie,
                        type,
                        userData,
                        cloneDeep,
                        movieWatched,
                        setMovieWatched,
                        setOpen,
                        setSelectedMovie
                      ),
                  }}
                />
              </div> : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const MovieContentSection = () => {
    return (
      <>
        {!query && movies.trending.length ? (
          <div className={`-z-10 h-20 md:h-40 lg:h-60 xl:h-80`}>
            <div className="hidden md:block absolute md:pl-10 lg:pl-40  top-[14%] items-center text-white bg-black/80 md:p-5 lg:p-10 rounded-tr-full rounded-br-full">
              <div className="text-lg  md:text-xl lg:text-3xl  font-bold pr-10">
                {randomMovie?.title}
              </div>
              <div className="text-sm pt-3 pr-10 w-80 md:w-[400px] truncateTextOverview">
                {randomMovie?.overview}
              </div>
            </div>
            {randomMovie?.backdrop_path ? <img
              src={API_IMG + randomMovie?.backdrop_path ?? ""}
              className="w-full object-fit"
              alt="cover_image"
            /> : null}
          </div>
        ) : null}

        <div>
          {<div className={`${query ? "pt-20 bg-white" : "fadeImage"}`} />}
          <div className="px-5 md:px-10 bg-white pb-16">
            <MovieSection
              movieList={movies.popular}
              {...{
                title: "Popular Movies",
                query,
                movieWatched,
                setMovieInWatched: (movie, type) =>
                  setMovieInWatchedConfig(
                    movie,
                    type,
                    userData,
                    cloneDeep,
                    movieWatched,
                    setMovieWatched,
                    setOpen,
                    setSelectedMovie
                  ),
              }}
            />
            {!query ? (
              <div>
                {movies.topRated.length ? (
                  <MovieSection
                    movieList={movies.topRated}
                    {...{
                      title: "Top Rated Movies",
                      movieWatched,
                      setMovieInWatched: (movie, type) =>
                        setMovieInWatchedConfig(
                          movie,
                          type,
                          userData,
                          cloneDeep,
                          movieWatched,
                          setMovieWatched,
                          setOpen,
                          setSelectedMovie
                        ),
                    }}
                  />
                ) : null}
                {movies.netflix.length ? (
                  <MovieSection
                    movieList={movies.netflix}
                    {...{
                      title: "Netflix Originals",
                      movieWatched,
                      setMovieInWatched: (movie, type) =>
                        setMovieInWatchedConfig(
                          movie,
                          type,
                          userData,
                          cloneDeep,
                          movieWatched,
                          setMovieWatched,
                          setOpen,
                          setSelectedMovie
                        ),
                    }}
                  />
                ) : null}
                {movies.upcoming.length ? (
                  <MovieSection
                    movieList={movies.upcoming}
                    {...{
                      title: "Upcoming Movies",
                      movieWatched,
                      setMovieInWatched: (movie, type) =>
                        setMovieInWatchedConfig(
                          movie,
                          type,
                          userData,
                          cloneDeep,
                          movieWatched,
                          setMovieWatched,
                          setOpen,
                          setSelectedMovie
                        ),
                    }}
                  />
                ) : null}
              </div>
            ) : null}
          </div>
        </div>

      </>
    )
  }

  const prop = {
    ...{
      title,
      query,
      setQuery,
      language,
      languageList,
      isQueryTypeMovieName,
      setQueryType,
      selectLang: (e) => setLanguage(e.target.value),
      userData,
      loginOrOutClick,
      search,
      setSearch,
      showMenu,
      setMenu, navigate
    }
  }

  return <div>
    <Loader {...{ loader }} />
    <div className={`${loader ? 'fixed' : ''}`}>
      {isMovieSelected ? <ViewDetailSection /> : null}
      <div className={`flex flex-col ${isMovieSelected ? "fixed" : ""}`}>
        <TobBar {...prop} />
        <MovieContentSection />
        <Drawer
          anchor={`${window && typeof window != "undefined" && window.innerWidth <= 520
            ? "bottom"
            : "right"
            }`}
          open={open}
          onClose={() => setOpen(false)}
        >
          <div className="p-8 w-[400px]">
            <TheaterComedyIcon sx={{ fontSize: { xs: 24, md: 45 } }} />
            <div className="pl-2 pt-2 text-sm md:text-3xl MagentaRose md:w-auto w-full flex justify-between">
              {title}
            </div>
            <div className="flex flex-col text-black py-2 pt-6">
              <label>Name</label>
              <input value={user.name ?? ''}
                key="random1"
                className="rounded-lg bg-[#fffff] mt-2 p-2 border"
                type="text"
                onChange={(e) => setUser({ ...user, name: e.target.value })}
              />
            </div>
            <div className="flex flex-col text-black py-2">
              <label>Password</label>
              <input value={user.pwd ?? ''}
                key="random2"
                className="rounded-lg bg-[#fffff] mt-2 p-2 border"
                type="password"
                onChange={(e) => setUser({ ...user, pwd: e.target.value })}
              />
            </div>

            <div className="flex justify-center pt-5">
              <button
                className={`${isSignInEnable ? "bg-green-500" : "bg-black/40"
                  } text-white px-4 py-2 rounded-lg`}
                onClick={signIn}
              >
                Sign In
              </button>
            </div>
          </div>
        </Drawer>
      </div>
    </div>
  </div>
};
