import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import MovieCard from './MovieCard.jsx'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Link } from "react-router-dom";


function App() {

  const API_KEY = '2bcf0f2ea4a982b289f2bf3e3de2477f'
  const API_URL = `https://api.themoviedb.org/3/movie/top_rated`
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYmNmMGYyZWE0YTk4MmIyODlmMmJmM2UzZGUyNDc3ZiIsInN1YiI6IjY2NDM0ZTBkMjJjMzFjZjI0MTZhYjExOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.aK3M7Yn74M6gfJsND5y3tTmsxBMlrNacCx7MPUi7Nqo'
    }
  };
  

  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [movies, setMovies] = useState(null)
  const [search, setSearch] = useState(null)
  const [moviesFound, setMoviesFound] = useState(null)
  const [genres, setGenres] = useState(null)
  const [selectedGenre, setSelectedGenre] = useState('all')
  const [filteredMovies, setFilteredMovies] = useState(null)

  const fetchMovies = async () => {
  
    try{
      const response = await axios.get(API_URL, options)
      setMovies(response.data.results)
      console.log(response.data.results)
      if(search) {
        console.log(movies)
        const moviesFound = movies.filter(movie => movie.title.toLowerCase().includes(search))
        setMoviesFound(moviesFound)
      }
      if(selectedGenre && selectedGenre !== 'all') {
        console.log(movies)
        // const filteredMovies = movies.filter(movie => movie.genre_ids.includes(selectedGenre))
        // setFilteredMovies(filteredMovies)
        console.log(filteredMovies)
      }
    }
    catch (err) {
      console.log(err);
      setError(err);
    }
    finally{
      setLoading(false);
    }
  }

  const fetchMoviesgenre = async () => {
    try {
      const response = await axios.get('https://api.themoviedb.org/3/genre/movie/list', options)
      // console.log(response.data.genres)
      setGenres(response.data.genres)
    } catch (err) {
      console.log(err)
    }
    finally{
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMovies()
    fetchMoviesgenre()
  }, [])

  if(error) return <p>{error}</p>
  if(loading) return <p>Loading...</p>

  const handleSubmit = (e) => {
    e.preventDefault()
    fetchMovies()
  }

  const handleChange = (e) => {
    console.log(e.target.value)
    if(e.target.value === 'all') {
      // setGenres(null)
    }
    setSelectedGenre(e.target.value)
    console.log(selectedGenre)
    fetchMovies()
  }

  return (
    <>
      <h1><a href="http://localhost:5173/" style={{color:'inherit'}}>Movies</a></h1>
      <form onSubmit={handleSubmit} style={{display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'15px'}}>
        <TextField id="outlined-basic" label="Search" variant="filled" onChange={e => setSearch(e.target.value.toLowerCase())} />
        <IconButton aria-label="delete" type='submit'>
          <CheckCircleRoundedIcon fontSize='large'/>
      </IconButton>
      </form>
      <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedGenre}
          label="Age"
          onChange={handleChange}
        >
          {genres && genres.map(genre => {
            return (
              <MenuItem key={genre.id} value={genre.id}>{genre.name}</MenuItem>
              )
            })}
            <MenuItem value="all">All</MenuItem>
        </Select>
      <Grid container spacing={5} justifyContent={'center'}>
        {/* {filteredMovies && filteredMovies.map(movie => {
          return(
            <>
            <Grid item>
              <MovieCard {...movie}/>
              </Grid>
            </>
          )
        })} */}
        {moviesFound && moviesFound.map(movie => {
          return(
            <div key={movie.id}>
            <Grid>
              <MovieCard {...movie}/>
              </Grid>
            </div>
          )
        })}
        {(!moviesFound && !filteredMovies) && movies.map(movie => {
          return(
          <div key={movie.id}>
              <Grid>
                <MovieCard {...movie}/>
              </Grid>
            </div>
          )
        })}
      </Grid>
    </>
  )
}

export default App
