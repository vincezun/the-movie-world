import Link from 'next/link';
import '../static/styles/pagination.scss';
import Router from 'next/router';

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

const Pagination = ({ totalPages, nextPage, currentPage, title }) => {
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

    Router.push(
      '/search/[title]/page/[number]',
      `/search/${encodeURIComponent(title)}/page/${page}`
    );
  };

  const moveLeft = currentPage - pageNeighbours * 2 - 1;
  const handleMoveLeft = () => {
    nextPage(moveLeft);

    Router.push(
      '/search/[title]/page/[number]',
      `/search/${encodeURIComponent(title)}/page/${moveLeft}`
    );
  };

  const moveRight = currentPage + pageNeighbours * 2 + 1;
  const handleMoveRight = () => {
    nextPage(moveRight);

    Router.push(
      '/search/[title]/page/[number]',
      `/search/${encodeURIComponent(title)}/page/${moveRight}`
    );
  };

  return (
    <ul className='pagination'>
      {pages.map((page, index) => {
        if (page === LEFT_PAGE)
          return (
            <li key={index} className='page-item'>
              <Link
                href={{
                  pathname: '/search/[title]/page/[number]'
                }}
                as={`/search/${encodeURIComponent(title)}/page/${page}`}
              >
                <a
                  className='page-link'
                  href='#'
                  aria-label='Previous'
                  onClick={handleMoveLeft}
                >
                  <span aria-hidden='true'>&laquo;</span>
                </a>
              </Link>
            </li>
          );

        if (page === RIGHT_PAGE)
          return (
            <li key={index} className='page-item'>
              <Link
                href={{
                  pathname: '/search/[title]/page/[number]'
                }}
                as={`/search/${encodeURIComponent(title)}/${page}`}
              >
                <a
                  className='page-link'
                  href='#'
                  aria-label='Next'
                  onClick={handleMoveRight}
                >
                  <span aria-hidden='true'>&raquo;</span>
                </a>
              </Link>
            </li>
          );

        return (
          <li
            key={index}
            className={`page-item${currentPage === page ? ' active' : ''}`}
          >
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
          </li>
        );
      })}
    </ul>
  );
};

export default Pagination;
