export async function allHomeApiCalls(obj,MoviesUrls, language, setMovies,cloneDeep,setLoader){
      //popularMovieUrl
      await fetch(`${MoviesUrls.popular}&with_original_language=${language}`)
        .then((res) => res.json())
        .then((data) => {
          obj = { ...obj, popular: data.results };
          setMovies(cloneDeep(obj));
        });

     setTimeout(() => {
      setLoader(false);
     }, 600);

      //topRated
      await fetch(`${MoviesUrls.topRated}&with_original_language=${language}`)
        .then((res) => res.json())
        .then((data) => {
          obj = { ...obj, topRated: data.results };
          setMovies((obj));
        });

      //netflix
      await fetch(`${MoviesUrls.netflix}&with_original_language=${language}`)
        .then((res) => res.json())
        .then((data) => {
          obj = { ...obj, netflix: data.results };
          setMovies((obj));
        });


      //upcoming
      await fetch(`${MoviesUrls.upcoming}`)
        .then((res) => res.json())
        .then((data) => {
          obj = { ...obj, upcoming: data.results };
          setMovies((obj));
        });
}