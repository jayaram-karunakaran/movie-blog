import React from "react";
import MovieCard from "../commons/card";

const MovieSection = ({ title, movieList, query ,movieWatched,setMovieInWatched}) => {
 
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
                    {...{ movie, query, isWatched: movieWatched && movieWatched[movie.id] ? true : false }}
                    onMovieSelect={(type) => setMovieInWatched(movie,type)}
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