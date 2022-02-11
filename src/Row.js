import movieTrailer from 'movie-trailer';
import React, { useEffect, useState } from 'react'
import YouTube from 'react-youtube';
import axios from './axios';
import './Row.css';
const base_url='https://image.tmdb.org/t/p/original/'
function Row({title,fetchUrl,isLargeRow}) {
  console.log("render")
    const [movies,setMovies]=useState([]);
    const [trailerUrl,setTrailerUrl]=useState("")
    useEffect(()=>{
        async function fetchData(){
                const request=await axios.get(fetchUrl);
                // https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}&language=en-US
                // Set giá trị cho mảng dữ liệu
                setMovies(request.data.results)
                return request
        }
        fetchData()

    },[fetchUrl])
    const opts={
      height:"390",
      width:"100%",
      playerVars:{
        autoplay:1,
      }
    }
    function handleClick(movie){
        if(trailerUrl){
            setTrailerUrl('')
        }else{
            movieTrailer(movie?.name||"")
            .then(url=>{
                const urlParams=new URLSearchParams(new URL(url).search);
                setTrailerUrl(urlParams.get("v"))
                console.log(urlParams.get("v"))
            }).catch(error=>console.log(error))
        }
    }
  
  return (
    <div className='row'>
            <h2>{title}</h2>
            {/* container => posters*/}
            <div className='row__posters'>
                {
                  movies.map((movie)=>{
                     return  <img  
                                key={movie.id}
                                onClick={()=>handleClick(movie)}
                                className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                                src={`${base_url}${ isLargeRow? movie.poster_path:movie.backdrop_path}`} alt={movie.name}>
                       
                            </img>
                  })
                }
            </div>
              {/* Youtune */}
              {trailerUrl&&<YouTube videoId={trailerUrl} opts={opts}/>}
    </div>
  )
}

export default Row