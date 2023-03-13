export async function setMovieInWatchedConfig(movie, type, userData, cloneDeep, movieWatched, setMovieWatched, setOpen, setSelectedMovie) {
    if (type === "WATCH") {
        if (userData) {
            let setObj = cloneDeep(movieWatched);
            if (setObj[movie.id]) delete setObj[movie.id];
            else {
                let { id, overview, title, backdrop_path, poster_path } = movie;
                setObj[id] = { id, overview, title, backdrop_path, poster_path }
            }
            localStorage.setItem("WATCHED", JSON.stringify(setObj));
            setMovieWatched(setObj);
        } else setOpen(true);
    } else {
      let obj ={}
        //trending
        await fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=1e448e0dfcdbb565f5d329820065b4d2`)
            .then((res) => res.json())
            .then((data) => {
              obj = cloneDeep(data);
              if (data && data.id)  setSelectedMovie(obj);
            });

        //credits
        await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=1e448e0dfcdbb565f5d329820065b4d2`)
        .then((res) => res.json())
        .then(({cast}) => {
          obj = {...obj, cast:cast ?? []}
           setSelectedMovie(obj);
        });

          //similar
          await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/similar?api_key=ab887d275a654aaecb4302b4d1187832&`)
          .then((res) => res.json())
          .then(({results}) => {
            obj = {...obj, similar:results ?? []}
            console.log(obj);
             setSelectedMovie(obj);
          });
    }
}
