import {Routes, Route} from 'react-router-dom'
import MovieCard from './MovieCard.jsx'
import App from './App.jsx'
import MovieDetail from './MovieDetail.jsx'


const MyRouter = () => {
    return (
        <> 
            <Routes>
                <Route path='/' element={<App />} />
                <Route path='/movies/:movieId' element={<MovieDetail />} />
                <Route path='*' element={<h1>404 page not found</h1>} />
            </Routes>
        </>
    )
}


export default MyRouter