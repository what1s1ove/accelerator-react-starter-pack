import AppRouter from 'components/app-router/app-router';
import Footer from 'components/common/footer/footer';
import Header from 'components/common/header/header';

function App(): JSX.Element {
  return (
    <div className="wrapper">
      <Header/>
      <main className="page-content">
        <div className="container">
          <AppRouter/>
        </div>
      </main>
      <Footer/>
    </div>
  );
}

export default App;
