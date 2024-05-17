import express from 'express'
import movies from './moviesData.js'
import cors from 'cors'
import bodyParser from 'body-parser';

const app = express()

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))

app.listen(3001, () => console.log('Listening to port 3001'))

app.get('/', (req, res) => {
    return res.send('welcome !!')
})

app.get('/movies', (req, res) => {
    // console.log(movies);
    return res.send(movies)
})

app.get('/movies/:id', (req, res) => {
    const id = req.params.id
    const movie = movies.find(movie => movie.id === parseInt(id))
    return res.send(movie)
})

app.post('/movies', (req, res) => {
    // console.log(req.body);
    const existingMovies = []
    movies.map(movie => {
        existingMovies.push(movie.title)
    })

    if (existingMovies.includes(req.body.title)) {
        return res.send('ERROR : This movie already exists')
    }
    else {
        const newMovie = {
            title: req.body.title,
            director: req.body.director,
            release_date: req.body.release_date,
            id: movies.length + 1,
        }
        movies.push(newMovie)
        console.log(`${newMovie.title} has been added successfully !`);
        return res.send(movies)
    }
})