import { useState } from 'react';
import axios from 'axios';

import '../static/styles/search.scss';

const IndexPage = () => {
  const [movies, setMovie] = useState([]);

  const performSearch = async searchValue => {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${
      process.env.API_KEY
    }&query=${searchValue}`;

    try {
      searchValue
        ? await axios.get(url).then(movies => setMovie(movies.data.results))
        : setMovie([]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = e => {
    let value = e.target.value;
    performSearch(value);
  };

  return (
    <>
      <input
        type='search'
        name='search'
        className='search-box'
        onChange={handleChange}
        placeholder='Search any movies'
        autoComplete='off'
      />
      <ul className='search-overlay'>
        {movies.slice(0, 8).map((movie, i) => (
          <li key={i}>{movie.title}</li>
        ))}
      </ul>
    </>
  );
};

export default IndexPage;
