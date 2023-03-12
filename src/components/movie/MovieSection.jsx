import React, { useState } from "react";
import MovieCard from "../commons/card";

const MovieSection = ({ title, movieList, query }) => {
  let [movieWatched, setMovieWatched] = useState(localStorage.getItem("WATCHED") ?? '');
  let movieWatchedList = JSON.parse(localStorage.getItem("WATCHED"));
  
  function setMovieInWatched(movie) {
    console.log(movieWatchedList[movie.id]);
    if (movieWatchedList[movie.id]) {
      // let list = movieWatchedList;
      // let ind = list.findIndex(i => i === String(movie.id));
      // if (ind >= 0) list.splice(ind, 1);
      // console.log(list.flat());
      // movieWatched
    }
    else {
      let { id, overview, title, backdrop_path,poster_path } = movie;
      let obj = {};
      obj[id] = { id, overview, title, backdrop_path,poster_path }
      // movieWatched = movieWatched + ',' + movie.id;
      setMovieWatched(obj);
      localStorage.setItem("WATCHED", JSON.stringify(obj));
    }
  }

  return (
    <div>
      {movieList.length ? (
        <div id={`${title}-section`} className="pb-5 pt-5">
          <div className="font-bold text-2xl">{query ? "Search Result" : title}</div>
          <div className={`${query ? 'grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7' : 'flex flex-row overflow-x-scroll'} gap-4 mt-4`}>
            {movieList.length ? movieList.map((movie) => {
              return movie.poster_path ?
                <div key={movie.id}>
                  <MovieCard
                    {...{ movie, query, isWatched: true}}
                    onMovieSelect={() => setMovieInWatched(movie)}
                  />
                </div>
                : null
            }) : null}
          </div>
        </div>
      ) : <div className="font-bold text-2xl">No Result Found</div>}
    </div>
  );
};

export default MovieSection;