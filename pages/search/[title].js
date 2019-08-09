import { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';

import Layout from '../../components/layout/layout';
import MovieCard from '../../components/movie/movie-card';

import '../../static/styles/search-movie.scss';

const Movie = ({ movieResults }) => {
  const [movies, setMovies] = useState(movieResults);

  useEffect(() => {
    setMovies(movieResults);
  }, [
    movies.map(movie => {
      movie.id;
    })
  ]);

  return (
    <Layout>
      <div className='movie-w'>
        {movies.map(movie => {
          let date = new Date(movie.release_date);
          return (
            <MovieCard
              key={movie.id}
              poster={movie.poster_path}
              title={movie.title}
              releaseDate={date.getFullYear()}
              rating={movie.vote_average}
            />
          );
        })}
      </div>
    </Layout>
  );
};

Movie.getInitialProps = async context => {
  const { title } = context.query;

  const url = `https://api.themoviedb.org/3/search/movie?api_key=${
    process.env.API_KEY
  }&query=${title}`;

  const res = await fetch(url);
  const data = await res.json();

  return { movieResults: data.results };
};

export default Movie;
