import star from '../../static/images/star.svg';
import posterNotAvailabble from '../../static/images/poster-not-available.svg';

import '../../static/styles/movie-card.scss';

const MovieCard = ({ poster, title, releaseDate, rating }) => (
  <figure className='movie'>
    {poster ? (
      <img
        src={`http://image.tmdb.org/t/p/w342${poster}`}
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
    <img src={star} alt='Star' className='star-icon' />
    {rating ? (
      <p className='rating'>{rating}</p>
    ) : (
      <p className='rating'>N/A</p>
    )}
  </figure>
);

export default MovieCard;
