import { useState, useContext, Component } from 'react';
import MovieProvider from './movieContext';
import fetch from 'isomorphic-unfetch';
import axios from 'axios';
import Link from 'next/link';

import '../static/styles/search.scss';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: []
    };
  }

  performSearch = async searchValue => {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${
      process.env.API_KEY
    }&query=${searchValue}`;

    if (searchValue) {
      const res = await fetch(url);
      const data = await res.json();
      return this.setState({ movies: data.results });
    } else {
      this.setState({ movies: [] });
    }
  };

  handleChange = e => {
    let value = e.target.value;
    this.performSearch(value);
  };

  render() {
    return (
      <>
        <input
          type='search'
          name='search'
          className='search-box'
          onChange={this.handleChange}
          placeholder='Search any movies'
          autoComplete='off'
        />
        <ul className='search-overlay'>
          {this.state.movies.slice(0, 8).map((movie, i) => (
            <li key={i}>
              <Link href='/movie/[id]' as={`/movie/${movie.id}`}>
                <a
                  onClick={() => (
                    <MovieProvider
                      value={{
                        title: movie.title,
                        poster: movie.poster_path,
                        overview: movie.overview,
                        releaseDate: movie.release_date,
                        rating: movie.vote_average
                      }}
                    />
                  )}
                >
                  {movie.title}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </>
    );
  }
}

// const Search = () => {
//   const [movieData, setMovieData] = useContext(MovieContext);

//   const [movies, setMovie] = useState([]);

//   const performSearch = async searchValue => {
//     const url = `https://api.themoviedb.org/3/search/movie?api_key=${
//       process.env.API_KEY
//     }&query=${searchValue}`;

//     try {
//       searchValue
//         ? await axios.get(url).then(movies => setMovie(movies.data.results))
//         : setMovie([]);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleChange = e => {
//     let value = e.target.value;
//     performSearch(value);
//   };

//   return (
//     <>
//       <input
//         type='search'
//         name='search'
//         className='search-box'
//         onChange={handleChange}
//         placeholder='Search any movies'
//         autoComplete='off'
//       />
//       <ul className='search-overlay'>
//         {movies.slice(0, 8).map((movie, i) => (
//           <li key={i}>
//             <Link href='/movie/[id]' as={`/movie/${movie.id}`}>
//               <a
//                 onClick={() =>
//                   setMovieData({
//                     title: movie.title,
//                     poster: movie.poster_path,
//                     overview: movie.overview,
//                     releaseDate: movie.release_date,
//                     rating: movie.vote_average
//                   })
//                 }
//               >
//                 {movie.title}
//               </a>
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </>
//   );
// };

export default Search;
