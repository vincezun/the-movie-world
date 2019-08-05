import Header from './header';

import '../../static/styles/layout.scss';

const Layout = ({ children }) => (
  <>
    <Header />
    {children}
  </>
);

export default Layout;
