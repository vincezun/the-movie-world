import Link from 'next/link';
import { useRouter } from 'next/router';
import fetch from 'isomorphic-unfetch';
import PropTypes from 'prop-types';

import Layout from '../../../../components/layout/layout';
import MovieCasts from '../../../../components/movie/movie-casts';

import '../../../../static/styles/full-cast.scss';

const FullMovieCast = ({ movieCasts, movie }) => {
  const router = useRouter();
  const { id, title } = router.query;

  return (
    <Layout>
      <div className='full-cast-w'>
        <ul className='links'>
          <li>
            <Link
              href={{ pathname: '/movie/[id]/[title]' }}
              as={`/movie/${id}/${title}`}
            >
              <a className='back'>&laquo; Back</a>
            </Link>
          </li>
          <li>
            <Link
              href={{ pathname: '/movie/[id]/[title]' }}
              as={`/movie/${id}/${title}`}
            >
              <a className='movie-heading'>{movie.title}</a>
            </Link>
          </li>
        </ul>
        <p className='cast-heading'>Full Cast</p>
        {movieCasts.length > 0 ? (
          movieCasts.map((cast, i) => (
            <MovieCasts
              key={i}
              profilePath={cast.profile_path}
              name={cast.name}
              character={cast.character}
            />
          ))
        ) : (
          <p className='no-casts'>N/A</p>
        )}
      </div>
    </Layout>
  );
};

FullMovieCast.getInitialProps = async context => {
  const { id } = context.query;

  const movieUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${
    process.env.API_KEY
  }`;

  const castsUrl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${
    process.env.API_KEY
  }`;

  const movieRes = await fetch(movieUrl);
  const movieData = await movieRes.json();

  const castsRes = await fetch(castsUrl);
  const castsData = await castsRes.json();

  return {
    movieCasts: castsData.cast,
    movie: movieData
  };
};

FullMovieCast.propTypes = {
  movieCasts: PropTypes.array,
  movie: PropTypes.object
};

export default FullMovieCast;
