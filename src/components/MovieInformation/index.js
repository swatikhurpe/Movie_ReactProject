import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../Header';
import './index.css';

class MovieInformation extends Component {
    state = {
        movieInformation: {},
        castDetails: [],
        error: null
    };

    static propTypes = {
        match: PropTypes.object.isRequired
    };

    async componentDidMount() {
        try {
            const { match } = this.props;
            const { id } = match.params;
            const apiKey = 'b0a4101d77804f9d31964b747ab032bb';
            const apiUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`;
            const castApi = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}&language=en-US`;

            const options = {
                method: 'GET'
            };

            const [movieResponse, castResponse] = await Promise.all([
                fetch(apiUrl, options),
                fetch(castApi, options)
            ]);

            if (!movieResponse.ok || !castResponse.ok) {
                throw new Error('Failed to fetch data');
            }

            const movieData = await movieResponse.json();
            const castData = await castResponse.json();

            const filteredData = {
                backdropPath: movieData.backdrop_path,
                id: movieData.id,
                genres: movieData.genres,
                originalTitle: movieData.original_title,
                overview: movieData.overview,
                runtime: movieData.runtime,
                releaseDate: movieData.release_date,
                posterPath: movieData.poster_path,
                voteAverage: movieData.vote_average
            };

            const filteredCast = castData.cast.map(each => ({
                name: each.original_name,
                character: each.character,
                profilePath: each.profile_path,
                id: each.id
            }));

            this.setState({
                movieInformation: filteredData,
                castDetails: filteredCast
            });
        } catch (error) {
            this.setState({ error: error.message });
        }
    }

    render() {
        const { movieInformation, castDetails, error } = this.state;

        if (error) {
            return <div>Error: {error}</div>;
        }

        const {
            backdropPath,
            originalTitle,
            overview,
            posterPath,
            runtime,
            voteAverage,
            genres,
            releaseDate
        } = movieInformation;

        const date = new Date(releaseDate);
        const monthNames = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ];
        const day = date.getDate();
        const monthIndex = date.getMonth();
        const year = date.getFullYear();
        const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
        const formattedDate = `${dayName} ${monthNames[monthIndex]} ${day} ${year}`;

        return (
            <>
                <Header />
                <div className="movie-info-container">
                    <div className="movie-info-details-container">
                        <div className="movie-info-content-container">
                            <div className="movie-info-upper-content-container">
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${posterPath}`}
                                    alt="movie-details-poster"
                                    className="movie-details-poster-image"
                                />
                                <div className="details-container">
                                    <h1 className="movie-info-heading">{originalTitle}</h1>
                                    <p className="movie-info-rating">Rating: {voteAverage}</p>
                                    <div className="runtime-genre-container">
                                        <p className="runtime-container">{runtime} mins</p>
                                        <ul type="none" className="genre-container">
                                            {genres &&
                                                genres.map(each => (
                                                    <li className="genre-item" key={each.id}>
                                                        {each.name},
                                                    </li>
                                                ))}
                                        </ul>
                                    </div>
                                    <p className="release-date-info">Release Date: {formattedDate}</p>
                                </div>
                            </div>
                            <h1 className="overview-heading">Overview</h1>
                            <p className="overview-text">{overview}</p>
                        </div>
                        <img
                            src={`https://image.tmdb.org/t/p/w500${backdropPath}`}
                            alt="backdrop-poster"
                            className="movie-backdrop-image"
                        />
                    </div>
                    <h1 className="cast-heading">Cast</h1>
                    <ul type="none" className="cast-details-container">
                        {castDetails &&
                            castDetails.map(each => (
                                each.profilePath && <li key={each.id} className="cast-item">
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${each.profilePath}`}
                                        alt="cast-profile"
                                        className="cast-profile-image"
                                    />
                                    <p className="cast-name">{each.name}</p>
                                    <p className="cast-name">Character: {each.character}</p>
                                </li>
                            ))}
                    </ul>
                </div>
            </>
        );
    }
}

export default MovieInformation;
