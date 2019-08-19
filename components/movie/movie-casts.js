import PropTypes from 'prop-types';
import profileNotAvailable from '../../static/images/poster-not-available.svg';

import '../../static/styles/movie-casts.scss';

const MovieCast = ({ name, character, profilePath }) => {
  return (
    <div className='cast'>
      {profilePath ? (
        <img
          src={`http://image.tmdb.org/t/p/w45${profilePath}`}
          alt={name}
          className='profile'
        />
      ) : (
        <img src={profileNotAvailable} alt={name} className='profile' />
      )}
      <p className='name'>{name}</p>
      <span className='ellipsis'>...</span>
      {character ? (
        <p className='character'>{character}</p>
      ) : (
        <p className='character'>N/A</p>
      )}
    </div>
  );
};

MovieCast.propTypes = {
  name: PropTypes.string,
  character: PropTypes.string,
  profilePath: PropTypes.string
};

export default MovieCast;
