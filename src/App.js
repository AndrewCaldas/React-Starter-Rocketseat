import React from 'react';
import "./style.css"
import Header from './Components/Header';
import Routes from './routes'
// import Main from './pages/main';

const App = () => (
  <div className="App">
    <Header/>
    <Routes/>
  </div>
);

export default App;
