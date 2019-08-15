import { useState } from 'react';
import fetch from 'isomorphic-unfetch';
import Link from 'next/link';
import { useComponentVisible } from '../components/hooks/useComponentVisible';
import { useSlugify } from '../components/hooks/useSlugify';
import Router from 'next/router';

import '../static/styles/search.scss';

const SearchBox = () => {
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
    value.trim() === '' ? (value = '') : value;
    performSearch(value);
    setIsComponentVisible(true);
    const noResults = document.querySelector('.no-results');
    if (noResults) {
      if (value) {
        noResults.classList.add('active');
      } else {
        noResults.classList.remove('active');
      }
    }
  };

  const hideOverlay = () => {
    const searchBox = document.querySelector('.search-box');
    searchBox.value = '';
    setIsComponentVisible(false);
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      const searchBox = document.querySelector('.search-box');

      if (searchBox.value.trim() !== '') {
        Router.push(
          '/search/[title]/page/[number]',
          `/search/${encodeURIComponent(useSlugify(searchBox.value))}/page/${1}`
        );
      }

      searchBox.value = '';
      setIsComponentVisible(false);
    }
  };

  return (
    <div ref={ref}>
      <div className='search-box-w'>
        <input
          type='search'
          name='search'
          className='search-box'
          onChange={handleChange}
          onClick={handleChange}
          placeholder='Search any movies'
          autoComplete='off'
          maxLength='75'
          onKeyDown={handleKeyDown}
        />
      </div>
      {isComponentVisible && (
        <ul className='search-overlay'>
          {movies !== undefined && movies.length > 0 ? (
            movies.slice(0, 8).map((movie, i) => {
              return (
                <li key={i} onClick={hideOverlay}>
                  <Link
                    href={{
                      pathname: '/search/[title]/page/[number]',
                      query: { resultsHeading: movie.title }
                    }}
                    as={`/search/${encodeURIComponent(
                      useSlugify(movie.title)
                    )}/page/${1}`} //if % is in the url before it fetch, it will throw URIError: URI malformed
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

export default SearchBox;
