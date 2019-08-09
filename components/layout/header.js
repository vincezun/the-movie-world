import Link from 'next/link';

import Search from '../search';

import '../../static/styles/header.scss';

const Header = () => {
  return (
    <header className='header'>
      <div className='nav'>
        <h1 className='heading'>Movie World</h1>
        <span className='hamburger'>
          <span className='bar' />
        </span>
        <Search />
      </div>

      <nav className='menu'>
        <ul className='overlay'>
          <li>
            <Link href='/movies/top-rated'>
              <a>Top Rated</a>
            </Link>
          </li>
          <li>
            <Link href='/movies/popular'>
              <a>Popular</a>
            </Link>
          </li>
          <li>
            <Link href='/movies/upcoming'>
              <a>Upcoming</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
