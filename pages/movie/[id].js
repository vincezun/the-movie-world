import { useState } from 'react';

import { useRouter } from 'next/router';

import '../../static/styles/movie.scss';

const Movie = () => {
  const router = useRouter();
  const movie = router.query;

  let title, poster, overview, releaseDate, rating;

  if (typeof localStorage !== 'undefined') {
    title = localStorage.getItem('title') || movie.title;
    poster = localStorage.getItem('poster') || movie.poster;
    overview = localStorage.getItem('overview') || movie.overview;
    releaseDate = localStorage.getItem('releaseDate') || movie.releaseDate;
    rating = localStorage.getItem('rating') || movie.rating;
  }

  const [movieData, setMovieData] = useState({
    title: title,
    poster: poster,
    overview: overview,
    releaseDate: releaseDate,
    rating: rating
  });

  return (
    <div className='movie-w'>
      <figure className='movie'>
        {movieData.poster ? (
          <img
            src={`http://image.tmdb.org/t/p/w342${movieData.poster}`}
            alt={movieData.title}
            className='poster'
          />
        ) : null}

        <figcaption className='title'>{movieData.title}</figcaption>
        <p className='release-date'>{movieData.releaseDate}</p>
        <p className='rating'>{movieData.rating}</p>
        <p className='overview'>{movieData.overview}</p>
      </figure>
    </div>
  );
};

export default Movie;
