import { Component } from 'react';
import MovieProvider from '../../components/movieContext';

import '../../static/styles/movie.scss';

const Movie = () => (
  <MovieProvider.Consumer>
    {context => (
      <div className='movie-w'>
        <figure className='movie'>
          {context.poster ? (
            <img
              src={`http://image.tmdb.org/t/p/w342/${context.poster}`}
              alt={context.title}
              className='poster'
            />
          ) : null}
          {context.title ? (
            <figcaption className='title'>{context.title}</figcaption>
          ) : null}
          {context.releaseDate ? (
            <p className='release-date'>{context.releaseDate}</p>
          ) : null}
          {context.rating ? <p className='rating'>{context.rating}</p> : null}
          {context.overview ? (
            <p className='overview'>{context.overview}</p>
          ) : null}
        </figure>
      </div>
    )}
  </MovieProvider.Consumer>
);

// const Movie = () => {
//   const [movieData, setMovieData] = useContext(MovieContext);
//   useEffect(() => {
//     setMovieData({
//       title: localStorage.getItem('title'),
//       poster: localStorage.getItem('poster'),
//       overview: localStorage.getItem('overview'),
//       releaseDate: localStorage.getItem('releaseDate'),
//       rating: localStorage.getItem('rating')
//     });
//   }, []);

//   return (
//     <div className='movie-w'>
//       <figure className='movie'>
//         {movieData.poster ? (
//           <img
//             src={`http://image.tmdb.org/t/p/w342/${movieData.poster}`}
//             alt={movieData.title}
//             className='poster'
//           />
//         ) : null}
//         {movieData.title ? (
//           <figcaption className='title'>{movieData.title}</figcaption>
//         ) : null}
//         {movieData.releaseDate ? (
//           <p className='release-date'>{movieData.releaseDate}</p>
//         ) : null}
//         {movieData.rating ? <p className='rating'>{movieData.rating}</p> : null}
//         {movieData.overview ? (
//           <p className='overview'>{movieData.overview}</p>
//         ) : null}
//       </figure>
//     </div>
//   );
// };

export default Movie;
