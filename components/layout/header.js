import Link from 'next/link';

import logo from '../../static/images/logo.svg';

import '../../static/styles/header.scss';

const Header = () => (
  <header className='header'>
    <div className='nav'>
      <div className='logo-w'>
        <img src={logo} alt='Movie world logo' className='logo' />
        <h1 className='heading'>Movie World</h1>
      </div>
      <span className='hamburger'>
        <span className='bar' />
      </span>
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

export default Header;
