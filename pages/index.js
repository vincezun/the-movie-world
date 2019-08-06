import fetch from 'isomorphic-unfetch';

import Layout from '../components/layout/layout';
import Search from '../components/search';

import star from '../static/images/star.svg';

import '../static/styles/index.scss';

const Index = ({ topRatedMovies, popularMovies, upcomingMovies }) => (
  <Layout>
    <div className='home-w'>
      <Search />
      <div className='top-rated-w'>
        <h2 className='heading'>Top Rated Movies</h2>
        {topRatedMovies.slice(0, 4).map((topRatedMovie, i) => (
          <figure key={i} className='movie'>
            <img
              src={`http://image.tmdb.org/t/p/w342${topRatedMovie.poster_path}`}
              alt={topRatedMovie.title}
              className='poster'
            />
            <figcaption className='title'>{topRatedMovie.title}</figcaption>
            <img src={star} alt='Star' className='star-icon' />
            <p className='rating'>{topRatedMovie.vote_average}</p>
          </figure>
        ))}
      </div>
      <div className='popular-w'>
        <h2 className='heading'>Popular Movies</h2>
        {popularMovies.slice(0, 4).map((popularMovie, i) => (
          <figure key={i} className='movie'>
            <img
              src={`http://image.tmdb.org/t/p/w342${popularMovie.poster_path}`}
              alt={popularMovie.title}
              className='poster'
            />
            <figcaption className='title'>{popularMovie.title}</figcaption>
            <img src={star} alt='Star' className='star-icon' />
            <p className='rating'>{popularMovie.vote_average}</p>
          </figure>
        ))}
      </div>
      <div className='upcoming-w'>
        <h2 className='heading'>Upcoming Movies</h2>
        {upcomingMovies.slice(0, 4).map((upcomingMovie, i) => (
          <figure key={i} className='movie'>
            <img
              src={`http://image.tmdb.org/t/p/w342${upcomingMovie.poster_path}`}
              alt={upcomingMovie.title}
              className='poster'
            />
            <figcaption className='title'>{upcomingMovie.title}</figcaption>
            <img src={star} alt='Star' className='star-icon' />
            <p className='rating'>{upcomingMovie.vote_average}</p>
          </figure>
        ))}
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
