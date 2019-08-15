import Link from 'next/link';
import posterNotAvailabble from '../../static/images/poster-not-available.svg';
import { useSlugify } from '../hooks/useSlugify';

import '../../static/styles/movie-card.scss';

const MovieCard = ({ poster, title, releaseDate, id }) => {
  return (
    <Link
      href={{ pathname: '/movie/[id]/[title]' }}
      as={`/movie/${id}/${useSlugify(title)}`}
    >
      <a className='movie'>
        <figure>
          {poster ? (
            <img
              src={`http://image.tmdb.org/t/p/w370_and_h556_bestv2${poster}`}
              alt={title}
              className='poster'
            />
          ) : (
            <img
              src={posterNotAvailabble}
              alt='Poster not available'
              className='poster'
            />
          )}
          {title ? (
            <figcaption className='title'>{title}</figcaption>
          ) : (
            <figcaption className='title'>N/A</figcaption>
          )}
          {releaseDate ? (
            <p className='release-date'>{releaseDate}</p>
          ) : (
            <p className='release-date'>N/A</p>
          )}
        </figure>
      </a>
    </Link>
  );
};

export default MovieCard;
