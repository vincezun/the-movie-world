import Link from 'next/link';
import '../static/styles/pagination.scss';

const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';

const range = (from, to, step = 1) => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }

  return range;
};

const Pagination = ({ totalPages, nextPage, currentPage, title, route }) => {
  const pageNeighbours = 2;

  const fetchPageNumbers = () => {
    const totalNumbers = pageNeighbours * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, currentPage - pageNeighbours);
      const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);

      let pages = range(startPage, endPage);

      /**
       * hasLeftSpill: has hidden pages to the left
       * hasRightSpill: has hidden pages to the right
       * spillOffset: number of hidden pages either to the left or to the right
       */
      const hasLeftSpill = startPage > 2;
      const hasRightSpill = totalPages - endPage > 1;
      const spillOffset = totalNumbers - (pages.length + 1);

      switch (true) {
        // handle: (1) < {5 6} [7] {8 9} (10)
        case hasLeftSpill && !hasRightSpill: {
          const extraPages = range(startPage - spillOffset, startPage - 1);
          pages = [LEFT_PAGE, ...extraPages, ...pages];
          break;
        }

        // handle: (1) {2 3} [4] {5 6} > (10)
        case !hasLeftSpill && hasRightSpill: {
          const extraPages = range(endPage + 1, endPage + spillOffset);
          pages = [...pages, ...extraPages, RIGHT_PAGE];
          break;
        }

        // handle: (1) < {4 5} [6] {7 8} > (10)
        case hasLeftSpill && hasRightSpill:
        default: {
          pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
          break;
        }
      }

      return [1, ...pages, totalPages];
    }
    return range(1, totalPages);
  };

  const pages = fetchPageNumbers();

  const handleClick = page => () => {
    nextPage(page);
  };

  const moveLeft = currentPage - pageNeighbours * 2 - 1;
  const handleMoveLeft = () => {
    nextPage(moveLeft);
  };

  const moveRight = currentPage + pageNeighbours * 2 + 1;
  const handleMoveRight = () => {
    nextPage(moveRight);
  };

  return (
    <ul className='pagination'>
      {pages.map((page, index) => {
        if (page === LEFT_PAGE)
          return (
            <li key={index} className='page-item'>
              {route === '/search/[title]/page/[number]' ? (
                <Link
                  href={{
                    pathname: '/search/[title]/page/[number]'
                  }}
                  as={`/search/${encodeURIComponent(title)}/page/${page}`}
                >
                  <a
                    className='page-link'
                    aria-label='Previous'
                    onClick={handleMoveLeft}
                  >
                    <span aria-hidden='true'>&laquo;</span>
                  </a>
                </Link>
              ) : route === '/top-rated/page/[number]' ? (
                <Link
                  href={{
                    pathname: '/top-rated/page/[number]'
                  }}
                  as={`/top-rated/page/${moveLeft}`}
                >
                  <a
                    className='page-link'
                    aria-label='Previous'
                    onClick={handleMoveLeft}
                  >
                    <span aria-hidden='true'>&laquo;</span>
                  </a>
                </Link>
              ) : route === '/popular/page/[number]' ? (
                <Link
                  href={{
                    pathname: '/popular/page/[number]'
                  }}
                  as={`/popular/page/${moveLeft}`}
                >
                  <a
                    className='page-link'
                    aria-label='Previous'
                    onClick={handleMoveLeft}
                  >
                    <span aria-hidden='true'>&laquo;</span>
                  </a>
                </Link>
              ) : route === '/upcoming/page/[number]' ? (
                <Link
                  href={{
                    pathname: '/upcoming/page/[number]'
                  }}
                  as={`/upcoming/page/${moveLeft}`}
                >
                  <a
                    className='page-link'
                    aria-label='Previous'
                    onClick={handleMoveLeft}
                  >
                    <span aria-hidden='true'>&laquo;</span>
                  </a>
                </Link>
              ) : null}
            </li>
          );

        if (page === RIGHT_PAGE)
          return (
            <li key={index} className='page-item'>
              {route === '/search/[title]/page/[number]' ? (
                <Link
                  href={{
                    pathname: '/search/[title]/page/[number]'
                  }}
                  as={`/search/${encodeURIComponent(title)}/${page}`}
                >
                  <a
                    className='page-link'
                    aria-label='Next'
                    onClick={handleMoveRight}
                  >
                    <span aria-hidden='true'>&raquo;</span>
                  </a>
                </Link>
              ) : route === '/top-rated/page/[number]' ? (
                <Link
                  href={{
                    pathname: '/top-rated/page/[number]'
                  }}
                  as={`/top-rated/page/${moveRight}`}
                >
                  <a
                    className='page-link'
                    aria-label='Next'
                    onClick={handleMoveRight}
                  >
                    <span aria-hidden='true'>&raquo;</span>
                  </a>
                </Link>
              ) : route === '/popular/page/[number]' ? (
                <Link
                  href={{
                    pathname: '/popular/page/[number]'
                  }}
                  as={`/popular/page/${moveRight}`}
                >
                  <a
                    className='page-link'
                    aria-label='Next'
                    onClick={handleMoveRight}
                  >
                    <span aria-hidden='true'>&raquo;</span>
                  </a>
                </Link>
              ) : route === '/upcoming/page/[number]' ? (
                <Link
                  href={{
                    pathname: '/upcoming/page/[number]'
                  }}
                  as={`/upcoming/page/${moveRight}`}
                >
                  <a
                    className='page-link'
                    aria-label='Next'
                    onClick={handleMoveRight}
                  >
                    <span aria-hidden='true'>&raquo;</span>
                  </a>
                </Link>
              ) : null}
            </li>
          );

        return (
          <li
            key={index}
            className={`page-item${currentPage === page ? ' active' : ''}`}
          >
            {route === '/search/[title]/page/[number]' ? (
              <Link
                href={{
                  pathname: '/search/[title]/page/[number]'
                }}
                as={`/search/${encodeURIComponent(title)}/page/${page}`}
              >
                <a className='page-link' onClick={handleClick(page)}>
                  {page}
                </a>
              </Link>
            ) : route === '/top-rated/page/[number]' ? (
              <Link
                href={{
                  pathname: '/top-rated/page/[number]'
                }}
                as={`/top-rated/page/${page}`}
              >
                <a className='page-link' onClick={handleClick(page)}>
                  {page}
                </a>
              </Link>
            ) : route === '/popular/page/[number]' ? (
              <Link
                href={{
                  pathname: '/popular/page/[number]'
                }}
                as={`/popular/page/${page}`}
              >
                <a className='page-link' onClick={handleClick(page)}>
                  {page}
                </a>
              </Link>
            ) : route === '/upcoming/page/[number]' ? (
              <Link
                href={{
                  pathname: '/upcoming/page/[number]'
                }}
                as={`/upcoming/page/${page}`}
              >
                <a className='page-link' onClick={handleClick(page)}>
                  {page}
                </a>
              </Link>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
};

export default Pagination;
