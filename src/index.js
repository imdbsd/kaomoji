import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './main.css';
import Header from './components/Header';
import Home from './pages/Home';
import Footer from './styles/Footer';
import EmojiDetails from './pages/EmojiDetails';
import * as serviceWorker from './serviceWorker';

class Index extends React.Component{
  render(){
    return(
      <Router>
        <React.Fragment>
          <Header />
          <Route path="/" exact component={Home} />  
          <Route path="/:filter/:parentCategory/:subCategory/:index" component={EmojiDetails} />
          <Footer>
            Develop with &nbsp;<span>&#10084;</span>&nbsp; by &nbsp;<a href="https://twitter.com/Budisuryadarma" target="_blank" title="imdbsd twitter link">imdbsd</a>
          </Footer>
        </React.Fragment>        
      </Router>
    )
  }
}

ReactDOM.render(<Index />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
