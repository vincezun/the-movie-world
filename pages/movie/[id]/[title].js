import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

import Layout from '../../../components/layout/layout';
import MovieCasts from '../../../components/movie/movie-casts';

import posterNotAvailabble from '../../../static/images/poster-not-available.svg';

import star from '../../../static/images/star.svg';

import '../../../static/styles/movie.scss';

const Movie = ({ movie, videos, movieCasts }) => {
  let time;
  movie.runtime > 60
    ? (time = (movie.runtime / 60).toFixed(2))
    : (time = movie.runtime);

  let runtime;
  movie.runtime > 60 ? (runtime = time.replace('.', 'h ')) : (runtime = time);

  const router = useRouter();
  const { id, title } = router.query;

  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  const date = new Date(movie.release_date).toLocaleDateString(
    'en-ZA',
    options
  );

  let keys = [];
  videos.map(video => {
    if (
      (video.type === 'Trailer' && video.size === 1080) ||
      video.size === 720
    ) {
      keys.push(video);
    }
  });

  let trailerKey;
  keys.slice(0, 1).map(key => {
    trailerKey = key.key; //returns one
  });

  return (
    <Layout>
      <figure className='movie-w'>
        {movie.title ? (
          <figcaption className='title'>{movie.title}</figcaption>
        ) : (
          <figcaption className='title'>N/A</figcaption>
        )}
        <ul className='sub-text-w'>
          <li className='sub-text'>
            <div className='rating-w'>
              <img src={star} alt='Star' className='star-icon' />
              {movie.vote_average ? (
                <p className='rating'>{movie.vote_average}</p>
              ) : (
                <p className='rating'>N/A</p>
              )}
            </div>
          </li>
          <li className='sub-text'>
            {movie.runtime ? (
              <p className='runtime'>{`${runtime}min`} </p>
            ) : (
              <p className='runtime'>N/A</p>
            )}
          </li>
          <li className='sub-text'>
            {movie.genres.length > 0 ? (
              <ul className='genres'>
                {movie.genres.map(genre => (
                  <li key={genre.id} className='name'>
                    {genre.name}
                  </li>
                ))}
              </ul>
            ) : (
              <p className='no-genres'>N/A</p>
            )}
          </li>
          <li className='sub-text'>
            {movie.release_date ? (
              <p className='release-date'>{date}</p>
            ) : (
              <p className='release-date'>N/A</p>
            )}
          </li>
        </ul>
        {movie.poster_path ? (
          <img
            src={`http://image.tmdb.org/t/p/w370_and_h556_bestv2${
              movie.poster_path
            }`}
            alt={movie.title}
            className='poster'
          />
        ) : (
          <img
            src={posterNotAvailabble}
            alt='Poster not available'
            className='poster'
          />
        )}
        {trailerKey ? (
          <div className='trailer-w'>
            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}`}
              frameBorder='0'
              className='trailer'
            />
          </div>
        ) : (
          <div title='This video is unavailable.' className='no-trailer' />
        )}
        {movie.overview ? (
          <p className='overview'>{movie.overview}</p>
        ) : (
          <p className='overview'>N/A</p>
        )}
        <div className='casts-w'>
          <h5 className='cast-heading'>Casts</h5>
          {movieCasts.length > 0 ? (
            movieCasts
              .slice(0, 10)
              .map(cast => (
                <MovieCasts
                  key={cast.id}
                  profilePath={cast.profile_path}
                  name={cast.name}
                  character={cast.character}
                />
              ))
          ) : (
            <p className='no-casts'>N/A</p>
          )}
          <Link
            href={{ pathname: '/movie/[id]/[title]/casts' }}
            as={`/movie/${id}/${title}/casts`}
          >
            <a className='full-cast'>See full cast &raquo;</a>
          </Link>
        </div>
      </figure>
    </Layout>
  );
};

Movie.getInitialProps = async context => {
  const { id } = context.query;

  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${
    process.env.API_KEY
  }`;

  const videosUrl = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${
    process.env.API_KEY
  }`;

  const castsUrl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${
    process.env.API_KEY
  }`;

  const res = await fetch(url);
  const data = await res.json();

  const videosRes = await fetch(videosUrl);
  const videosData = await videosRes.json();

  const castsRes = await fetch(castsUrl);
  const castsData = await castsRes.json();

  return {
    movie: data,
    videos: videosData.results,
    movieCasts: castsData.cast
  };
};

Movie.propTypes = {
  movie: PropTypes.object,
  videos: PropTypes.array,
  movieCasts: PropTypes.array
};

export default Movie;
