import { useEffect } from 'react';
import Link from 'next/link';

import Search from '../search';

import '../../static/styles/header.scss';

const Header = () => {
  useEffect(() => {
    const hamburger = document.querySelector('.hamburger');
    const menu = document.querySelector('.menu');

    hamburger.addEventListener('click', () => {
      menu.classList.toggle('active');
    });
  }, []);

  return (
    <header className='header'>
      <div className='nav'>
        <span>
          <Link href='/'>
            <a className='heading'>Movie World</a>
          </Link>
        </span>
        <span className='hamburger'>
          <span className='bar' />
        </span>
        <Search />
      </div>

      <nav className='menu'>
        <ul className='overlay'>
          <li>
            <Link
              href={{ pathname: '/top-rated/page/[number]' }}
              as='/top-rated/page/1'
            >
              <a>Top Rated</a>
            </Link>
          </li>
          <li>
            <Link
              href={{ pathname: '/popular/page/[number]' }}
              as='/popular/page/1'
            >
              <a>Popular</a>
            </Link>
          </li>
          <li>
            <Link
              href={{ pathname: '/upcoming/page/[number]' }}
              as='/upcoming/page/1'
            >
              <a>Upcoming</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
