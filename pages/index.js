import fetch from 'isomorphic-unfetch';

import Layout from '../components/layout/layout';
import MovieCard from '../components/movie/movie-card';

import '../static/styles/index.scss';

const Index = ({ topRatedMovies, popularMovies, upcomingMovies }) => (
  <Layout>
    <div className='home-w'>
      <div className='top-rated-w'>
        <h2 className='heading'>Top Rated Movies</h2>
        {topRatedMovies.slice(0, 4).map(topRatedMovie => {
          let date = new Date(topRatedMovie.release_date);
          return (
            <MovieCard
              key={topRatedMovie.id}
              poster={topRatedMovie.poster_path}
              title={topRatedMovie.title}
              releaseDate={date.getFullYear()}
              rating={topRatedMovie.vote_average}
            />
          );
        })}
      </div>
      <div className='popular-w'>
        <h2 className='heading'>Popular Movies</h2>
        {popularMovies.slice(0, 4).map(popularMovie => {
          let date = new Date(popularMovie.release_date);
          return (
            <MovieCard
              key={popularMovie.id}
              poster={popularMovie.poster_path}
              title={popularMovie.title}
              releaseDate={date.getFullYear()}
              rating={popularMovie.vote_average}
            />
          );
        })}
      </div>
      <div className='upcoming-w'>
        <h2 className='heading'>Upcoming Movies</h2>
        {upcomingMovies.slice(0, 4).map(upcomingMovie => {
          let date = new Date(upcomingMovie.release_date);
          return (
            <MovieCard
              key={upcomingMovie.id}
              poster={upcomingMovie.poster_path}
              title={upcomingMovie.title}
              releaseDate={date.getFullYear()}
              rating={upcomingMovie.vote_average}
            />
          );
        })}
      </div>
    </div>
  </Layout>
);

Index.getInitialProps = async () => {
  const topRatedURL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${
    process.env.API_KEY
  }`;

  const popularURL = `https://api.themoviedb.org/3/movie/popular?api_key=${
    process.env.API_KEY
  }`;

  const upcomingURL = `https://api.themoviedb.org/3/movie/upcoming?api_key=${
    process.env.API_KEY
  }`;

  const resTopRated = await fetch(topRatedURL);
  const dataTopRated = await resTopRated.json();

  const resPopular = await fetch(popularURL);
  const dataPopular = await resPopular.json();

  const resUpcoming = await fetch(upcomingURL);
  const dataUpcoming = await resUpcoming.json();

  return {
    topRatedMovies: dataTopRated.results,
    popularMovies: dataPopular.results,
    upcomingMovies: dataUpcoming.results
  };
};

export default Index;
