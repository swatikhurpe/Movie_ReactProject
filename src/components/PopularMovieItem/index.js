import { Link } from 'react-router-dom'
import './index.css'

const PopularMovieItem=(props)=>{
    const {popularItem}=props 
    const {id, originalTitle, posterPath, voteAverage}=popularItem
    return(
        <Link to={`/movies/${id}`} className="link-text">
            <li className='movie-list-item'>
                <img src={`https://image.tmdb.org/t/p/w500${posterPath}`} alt="movie-item" className='movie-item-image'/>
                <h1 className='movie-item-title'>{originalTitle}</h1>
                <p className='movie-item-rating'>Rating: {voteAverage}</p>
            </li>
        </Link>
    )
}

export default PopularMovieItem