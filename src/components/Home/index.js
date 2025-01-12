import { Component } from "react";
import Header from "../Header";
import PopularMovieItem from "../PopularMovieItem"

import './index.css'

class Home extends Component{
    state={popularMoviesList:[]}

    async componentDidMount(){
        const apiUrl="https://api.themoviedb.org/3/movie/popular?api_key=b0a4101d77804f9d31964b747ab032bb&language=en-US&page=1"
        const options={
            method:"GET"
        }
        const response=await fetch(apiUrl,options)
        const data=await response.json()
        const filteredData=data.results.map((each)=>({
            "adult":each.adult,
            "backdropPath":each.backdrop_path,
            "genreIds":each.genre_ids,
            "id":each.id,
            "originalLanguage":each.original_language,
            "originalTitle":each.original_title,
            "overview":each.overview,
            "popularity":each.popularity,
            "posterPath":each.poster_path,
            "releaseDate":each.release_date,
            "video":each.video,
            "voteAverage":each.vote_average,
            "voteCount":each.vote_count
        }
        ))
        this.setState({popularMoviesList:filteredData})
    }

    render(){
        const {popularMoviesList}=this.state 
        return(
            <>
            <Header/>
            <div className="home-container">
                <ul type="none" className="popular-movie-items-container">
                    {
                        popularMoviesList.map((each)=>(
                            <PopularMovieItem popularItem={each} key={each.id}/>
                        ))
                    }
                </ul>
            </div>
            </>
           
        )
    }
}

export default Home