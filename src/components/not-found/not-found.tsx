import { Link } from 'react-router-dom';
import Footer from '../footer/footer';
import Header from '../header/header';

function NotFound(): JSX.Element {
  return (
    <div className="wrapper">
      <Header />
      <main className="page-content">
        <div className="container" style={{display: 'flex', flexDirection: 'column'}}>
          <h1 className="page-content__title title title--bigger">404.Page not found</h1>
          <Link to="/">Go to main page</Link>
          <img src="img/not-faund.jpg" alt="Not-faund" />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default NotFound;
