import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
import Test from './Test'
import Test2 from './Test2'

// import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/*<header className="App-header">
          <Link to="/">Test</Link>
          <Link to="/secondpage">Second Page</Link>
        </header>*/}
        <main>
          <Route exact path="/" component={Test} />
          <Route exact path="/secondpage" component={Test2} />
        </main>
      </div>
    );
  }
}

export default App;
