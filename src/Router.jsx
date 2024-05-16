import {Routes, Route} from 'react-router-dom'
import MovieCard from './MovieCard.jsx'
import App from './App.jsx'
import MovieDetail from './MovieDetail.jsx'
import Page404 from './Page404.jsx'

const MyRouter = () => {
    return (
        <> 
            <Routes>
                <Route path='/' element={<App />} />
                <Route path='/movies/:movieId' element={<MovieDetail />} />
                <Route path='*' element={<Page404 />} />
            </Routes>
        </>
    )
}


export default MyRouter