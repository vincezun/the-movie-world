import { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import Link from 'next/link';
import { useComponentVisible } from '../components/hook/useComponentVisible';

import '../static/styles/search.scss';

import searchIcon from '../static/images/search-icon.svg';

const Search = () => {
  const [movies, setMovies] = useState([]);

  const {
    ref,
    isComponentVisible,
    setIsComponentVisible
  } = useComponentVisible(true);

  const performSearch = async searchValue => {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${
      process.env.API_KEY
    }&query=${searchValue}`;

    if (searchValue) {
      const res = await fetch(url);
      const data = await res.json();
      return setMovies(data.results);
    } else {
      setMovies([]);
    }
  };

  const handleChange = e => {
    let value = e.target.value;
    performSearch(value);
    setIsComponentVisible(true);
    const noResults = document.querySelector('.no-results');
    noResults
      ? value
        ? noResults.classList.add('active')
        : noResults.classList.remove('active')
      : null;
  };

  const hideOverlay = () => {
    const searchBox = document.querySelector('.search-box');
    searchBox.value = '';
    setIsComponentVisible(false);
  };

  return (
    <div ref={ref}>
      <div className='search-w'>
        <input
          type='search'
          name='search'
          className='search-box'
          onChange={handleChange}
          onClick={handleChange}
          placeholder='Search any movies'
          autoComplete='off'
          maxLength='75'
        />
        <button className='search-btn'>
          <img src={searchIcon} alt='Search' />
        </button>
      </div>
      {isComponentVisible && (
        <ul className='search-overlay'>
          {movies !== undefined && movies.length > 0 ? (
            movies.slice(0, 8).map((movie, i) => {
              return (
                <li key={i} onClick={hideOverlay}>
                  <Link
                    href={{
                      pathname: '/search/[title]'
                    }}
                    as={`/search/${encodeURIComponent(movie.title)}`} //if % is in the url before it fetch, it will throw URIError: URI malformed
                  >
                    <a className='links'>{movie.title}</a>
                  </Link>
                </li>
              );
            })
          ) : (
            <p className='no-results'>No Results</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default Search;
