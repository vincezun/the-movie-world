import { createContext, Component } from 'react';
const MovieContext = createContext();

class MovieProvider extends Component {
  constructor(props) {
    super(props);

    if (typeof window !== 'undefined') {
      const title = window.localStorage.getItem('title') || null;
      const poster = window.localStorage.getItem('poster') || null;
      const overview = window.localStorage.getItem('overview') || null;
      const releaseDate = window.localStorage.getItem('releaseDate') || null;
      const rating = window.localStorage.getItem('rating') || null;

      this.state = {
        title: title,
        poster: poster,
        overview: overview,
        releaseDate: releaseDate,
        rating: rating
      };
    }
  }

  componentDidMount() {
    localStorage.setItem('title', this.state.title);
    localStorage.setItem('poster', this.state.poster);
    localStorage.setItem('overview', this.state.overview);
    localStorage.setItem('releaseDate', this.state.releaseDate);
    localStorage.setItem('rating', this.state.rating);
  }

  render() {
    return (
      <MovieContext.Provider value={this.state}>
        {this.props.children}
      </MovieContext.Provider>
    );
  }
}

export default MovieProvider;
