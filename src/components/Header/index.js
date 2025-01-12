import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { RxHamburgerMenu } from "react-icons/rx";
import './index.css';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showMenu: false,
            searchQuery: '',
            searchResults: []
        };
        this.searchRef = React.createRef();
    }

    componentDidMount() {
        document.addEventListener('click', this.handleClickOutside);
    }
    
    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside);
    }

    handleClickOutside = (event) => {
        if (this.searchRef.current && !this.searchRef.current.contains(event.target)) {
            this.setState({ searchResults: [] });
        }
    };
    
    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            this.handleSearch();
        }
    };

    toggleMenu = () => {
        this.setState(prevState => ({
            showMenu: !prevState.showMenu
        }));
    };

    handleInputChange = (event) => {
        this.setState({
            searchQuery: event.target.value
        });
    };

    handleSearch = async () => {
        const { searchQuery } = this.state;
        const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=b0a4101d77804f9d31964b747ab032bb&language=en-US&query=${searchQuery}&page=1`;
        const options={
            method:"GET"
        }
        const response = await fetch(apiUrl, options);
        const data = await response.json();
        const searchResults = data.results.map(movie => ({
            id: movie.id,
            originalTitle: movie.original_title,
            posterPath: movie.poster_path,
            voteAverage: movie.vote_average
        }));
        this.setState({searchResults});
    };

    render() {
        const { showMenu, searchResults } = this.state;

        return (
            <div className='header-container'>
                <Link to="/" className="link-text">
                <h1 className='header-head'>MovieDb</h1>
                </Link>
                <div className='items-container'>

                    <button className='nav-toggle' onClick={this.toggleMenu}>
                        <RxHamburgerMenu/>
                    </button>

                    <ul className={`header-items-container ${showMenu ? 'show' : ''}`}>
                        <li className='header-item'>
                            <Link to="/" className="link-text">Popular</Link>
                        </li>
                        <li className='header-item'>
                            <Link to="/top-rated" className="link-text">Top Rated</Link>
                        </li>
                        <li className='header-item'>
                            <Link to="/upcoming" className="link-text">Upcoming</Link>
                        </li>
                    </ul>

                    <div ref={this.searchRef}>
                    <input 
                        type='search' 
                        placeholder='Movie Name' 
                        className='search-input' 
                        onChange={this.handleInputChange}
                        onKeyDown={this.handleKeyDown}
                    />
                    <button type='button' className='search-btn' onClick={this.handleSearch}>Search</button>
                    </div>
                </div>

                {searchResults.length > 0 && (
                    <div className="search-results">
                        <ul className='search-items-container'>
                            {searchResults.map(movie => (
                                <Link to={`/movies/${movie.id}`} className="link-text" onClick={(e) => e.stopPropagation()}>
                                    <li key={movie.id} className='search-item'>
                                        <img src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`} alt={movie.originalTitle} className='search-item-poster' />
                                        <div className='search-item-details'>
                                            <h2 className='search-item-title'>{movie.originalTitle}</h2>
                                            <p className='search-item-rating'>Rating: {movie.voteAverage}</p>
                                        </div>
                                    </li>
                                </Link>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        );
    }
}

export default Header;
