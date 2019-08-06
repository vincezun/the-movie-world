import App, { Container } from 'next/app';
/* First we import our provider */

import MovieContext from '../components/movieContext';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        {/* Then we wrap our components with the provider */}
        <MovieContext>
          <Component {...pageProps} />
        </MovieContext>
      </Container>
    );
  }
}

export default MyApp;
