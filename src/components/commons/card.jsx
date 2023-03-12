import { React } from "react";
import { API_IMG_W500 } from "../../constants/imageUrls";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const MovieCard = ({ movie, query, onMovieSelect,isWatched }) => {
  return (
    <div className={`${!query ? 'w-40 md:w-48 lg:w-52' : ''} rounded-2xl card shadow text-white`}>
      <div className="relative">
        <div  onClick={onMovieSelect} className="watchMovie bg-black/20 hover:bg-black/50 p-1 rounded-full cursor-pointer" title={isWatched? 'Watched':'Watch'} >{isWatched ?<CheckCircleOutlineIcon /> :<PlayCircleIcon/>}</div>
        <div className="viewMore bg-black/20 hover:bg-black/50 px-4 rounded-full cursor-pointer"  onClick={onMovieSelect}>More info</div>
        <img
          className="rounded-2xl w-auto"
          src={API_IMG_W500 + movie.poster_path}
          alt="poster"
        />
      </div>

      <div className="whenhovered relative rounded-2xl cursor-pointer"  onClick={onMovieSelect}>
        <div className="backdrop-blur-sm bg-black/30 rounded-xl ">
          <h4 className="px-4 pt-4 pb-1 text-2xl font-bold">
            {movie.title}
          </h4>
          <p className="text-sm  px-4 py-1 leading-6 truncateText">
            {movie.overview}
          </p>
        </div>
      </div>
    </div>

  );
}
export default MovieCard;