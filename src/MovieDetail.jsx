import axios from "axios"
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"

const MovieDetail = () => {

    let { movieId } = useParams()
    console.log(movieId);

    const API_KEY = '2bcf0f2ea4a982b289f2bf3e3de2477f'
    const API_URL = `https://api.themoviedb.org/3/movie/${movieId}`
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYmNmMGYyZWE0YTk4MmIyODlmMmJmM2UzZGUyNDc3ZiIsInN1YiI6IjY2NDM0ZTBkMjJjMzFjZjI0MTZhYjExOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.aK3M7Yn74M6gfJsND5y3tTmsxBMlrNacCx7MPUi7Nqo'
        }
    };

    const [movie, setMovie] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)


    const fetchMovie = async () => {
        try {
            const response = await axios.get(API_URL, options)
            setMovie(response.data)
            console.log(response.data.title);
        }
        catch (err) {
            setError(err)
            console.log(err);
        }
        finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchMovie()
    }, [])

    if(error) return(<p>{error}</p>)
    if(loading) return(<p>Loading...</p>)


    return (
        <>
            <h1>{movie.title}</h1>
            <p>{movie.overview}</p>
        </>
    )
}

export default MovieDetail