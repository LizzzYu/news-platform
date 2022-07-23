// import logo from './logo.svg';
import moment from 'moment';
import 'moment/locale/zh-tw';
import Header from './components/Header';
import Main from './views/Main';
import SideMenu from './components/SideMenu';
import Footer from './components/Footer';

import './App.css';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    moment.locale('zh-tw');
  }, []);

  return (
    <div className="App">
      <Header />
      <div className="main">
        <SideMenu />
        <Main />
      </div>
      <Footer />
      {/* <footer>fake footer</footer> */}
    </div>
  );
}

export default App;
