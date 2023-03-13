import React from "react";
import MovieSection from "../movie/MovieSection";

export const Watched =()=>{
    const movieWatched = JSON.parse(localStorage.getItem("WATCHED")) ?? {};
    const list = Object.values(movieWatched);
    return(
        <div className="p-5 md:p-10 bg-white h-screen">
            <MovieSection movieList={list} {...{ title: "Watched Movies", movieWatched, setMovieInWatched:()=>{}, query:"query" }} />
        </div>
    )
}