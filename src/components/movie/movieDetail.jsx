import { useEffect, useState,useContext } from "react";
import { useParams } from "react-router-dom";
import { API_IMG } from "../../constants/imageUrls";


export const MovieDetail = () => {
    const { movieId } = useParams();
    const [movieDetail, setMovieDetail] = useState({});
    const API_URL = `https://api.themoviedb.org/3/movie/${movieId}?api_key=1e448e0dfcdbb565f5d329820065b4d2`;

    useEffect(() => {
        if (movieId)
            fetch(API_URL)
                .then((res) => res.json())
                .then(data => {
                    setTimeout(() => {
                        setMovieDetail(data);
                    }, 1000);
                })

    }, [movieId])

    const arr=[1,2,3,4,5,6,7,8,9]

    return(
        <div>
        <div className='w-full h-screen'>
        <img
          className='top-0 left-0 w-full h-screen object-cover'
          src={API_IMG + movieDetail.backdrop_path}
          alt='/'
        />
        <div className='bg-black/30 absolute top-0 left-0 w-full h-screen' />
        <div className='absolute top-0 w-full h-full flex flex-col justify-center text-white'>
          <div className='md:left-[10%] max-w-[1100px] m-auto absolute p-4'>
           
            <h1 className='font-bold text-5xl md:text-7xl drop-shadow-2xl'>
          {movieDetail.title}
            </h1>
            <p className='max-w-[600px] drop-shadow-2xl py-2 text-xl'>
            {movieDetail.overview}
            </p>
            <button className='bg-red-600 text-white p-2 '>Watch Now</button>
          </div>
        </div>
      </div>
      {/* ////cast */}

    <h1>Cast</h1>
        <div className="scrollbar w-full scrollbar-thumb-primary  scrollbar-track-header">
          <div className="flex items-center   gap-3 overflow-y-scroll">
            {arr.map((cast, i) => (
              <div className="flex-shrink-0   w-[200px] mb-6" key={i}>
                <div
    
    className="group mx-3 my-1.5 cursor-pointer bg-black"
  >
    <div
      className="
        h-[200px]
        relative
        rounded-lg overflow-hidden
    "
    >
  <img
        className='top-0 left-0 w-full h-screen object-cover'
        src={API_IMG + movieDetail.backdrop_path}
        alt='/'
      />
    </div>
    <p className="py-1.5 text-white line-clamp-2">{movieDetail.title}</p>
    </div>
              </div>
            ))}
          </div>
        </div>
     
      
      {/* //// */}

         </div>
    )
}