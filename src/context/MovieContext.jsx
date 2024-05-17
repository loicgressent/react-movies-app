import { useState, createContext, useEffect } from 'react'
import axios from 'axios'

export const AuthContext = createContext()

export const AuthProvider = (props) => {

    const [response, setResponse] = useState()
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    const API_URL = `https://api.themoviedb.org/3/movie/top_rated`
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYmNmMGYyZWE0YTk4MmIyODlmMmJmM2UzZGUyNDc3ZiIsInN1YiI6IjY2NDM0ZTBkMjJjMzFjZjI0MTZhYjExOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.aK3M7Yn74M6gfJsND5y3tTmsxBMlrNacCx7MPUi7Nqo'
        }
    };

    const fetchMovies = async () => {

        try {
            const response = await axios.get('http://localhost:3001/movies')
            setResponse(response.data)
        }
        catch (err) {
            console.log(err);
            setError(err);
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchMovies()
      }, [])

    return (
        <AuthContext.Provider value={[response, setResponse]}>
            {props.children}
        </AuthContext.Provider>
    )

}