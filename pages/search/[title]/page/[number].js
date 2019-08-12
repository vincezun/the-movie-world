import { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';

import Layout from '../../../../components/layout/layout';
import MovieCard from '../../../../components/movie/movie-card';
import Pagination from '../../../../components/pagination';

import '../../../../static/styles/search-movie.scss';

const Movie = ({ movieResults, searchValue, totalResults }) => {
  const [movies, setMovies] = useState(movieResults);
  const [totalMovieResults, setTotalMovieResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setMovies(movieResults);
    setTotalMovieResults(totalResults);
    setCurrentPage(1);
  }, [searchValue || currentPage]);

  const NextPage = async pageNumber => {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${
      process.env.API_KEY
    }&query=${searchValue}&page=${pageNumber}`;

    const res = await fetch(url);
    const data = await res.json();
    return setMovies(data.results), setCurrentPage(pageNumber);
  };

  const numberPages = Math.floor(totalMovieResults / 20);

  return (
    <Layout>
      {movies !== undefined && movies.length > 0 ? (
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
      ) : (
        <p className='no-results'>No Results</p>
      )}
      {totalMovieResults > 20 ? (
        <Pagination
          totalPages={Math.min(numberPages, 993)}
          nextPage={NextPage}
          currentPage={currentPage}
          title={searchValue}
        />
      ) : null}
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

  return {
    movieResults: data.results,
    totalResults: data.total_results,
    searchValue: title
  };
};

export default Movie;
