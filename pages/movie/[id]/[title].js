import fetch from 'isomorphic-unfetch';

import Layout from '../../../components/layout/layout';

import posterNotAvailabble from '../../../static/images/poster-not-available.svg';
import star from '../../../static/images/star.svg';

const Movie = ({ movie, videos }) => {
  const time = (movie.runtime / 60).toFixed(2);
  const runtime = time.replace('.', 'h ');

  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  const date = new Date(movie.release_date).toLocaleDateString(
    'en-ZA',
    options
  );

  let keys = [];
  videos.map(video => {
    if (video.type === 'Trailer' && video.size === 1080) {
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
        <div className='rating-w'>
          <img src={star} alt='Star' className='star-icon' />
          {movie.vote_average ? (
            <p className='rating'>{movie.vote_average}</p>
          ) : (
            <p className='rating'>N/A</p>
          )}
        </div>
        {movie.runtime ? (
          <p className='runtime'>{`${runtime}min`} </p>
        ) : (
          <p className='runtime'>N/A</p>
        )}
        {movie.genres ? (
          <ul className='genres'>
            {movie.genres.map(genre => (
              <li key={genre.id} className='name'>
                {genre.name}
              </li>
            ))}
          </ul>
        ) : (
          <p className='genre'>N/A</p>
        )}
        {movie.release_date ? (
          <p className='release-date'>{date}</p>
        ) : (
          <p className='release-date'>N/A</p>
        )}
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
        <h5 className='overview-heading'>Overview</h5>
        {movie.overview ? (
          <p className='overview'>{movie.overview}</p>
        ) : (
          <p className='overview'>N/A</p>
        )}
        {trailerKey ? (
          <>
            <h5 className='trailer-heading'>Trailer</h5>
            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}`}
              frameBorder='0'
              className='trailer'
            />
          </>
        ) : (
          <p className='no-trailer'>N/A</p>
        )}
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

  const res = await fetch(url);
  const data = await res.json();

  const videosRes = await fetch(videosUrl);
  const videosData = await videosRes.json();

  return {
    movie: data,
    videos: videosData.results
  };
};

export default Movie;
