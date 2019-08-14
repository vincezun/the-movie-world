import { useState, useEffect } from 'react';

import Layout from '../../../components/layout/layout';
import MovieCard from '../../../components/movie/movie-card';
import Pagination from '../../../components/pagination';

import '../../../static/styles/popular.scss';

const TopRated = ({ movieResults, totalResults, activePageNumber }) => {
  const [movies, setMovies] = useState(movieResults);
  const [totalMovieResults, setTotalMovieResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(activePageNumber);

  useEffect(() => {
    setMovies(movieResults);
    setTotalMovieResults(totalResults);
    setCurrentPage(activePageNumber);
  });

  useEffect(() => {
    scroll(0, 0);
  }, [activePageNumber]);

  const NextPage = async pageNumber => {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${
      process.env.API_KEY
    }&page=${pageNumber}`;

    const res = await fetch(url);
    const data = await res.json();

    return setMovies(data.results), setCurrentPage(pageNumber);
  };

  const numberPages = Math.min(Math.floor(totalMovieResults / 20), 993);

  return (
    <Layout>
      <div className='popular-w'>
        <h2 className='heading'>Popular Movies</h2>
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
      {totalMovieResults > 20 ? (
        <Pagination
          totalPages={numberPages}
          nextPage={NextPage}
          currentPage={currentPage}
          route='/popular/page/[number]'
        />
      ) : null}
    </Layout>
  );
};

TopRated.getInitialProps = async context => {
  const { number } = context.query;

  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${
    process.env.API_KEY
  }&page=${number}`;

  const res = await fetch(url);
  const data = await res.json();

  return {
    movieResults: data.results,
    totalResults: data.total_results,

    activePageNumber: parseInt(number)
  };
};

export default TopRated;
