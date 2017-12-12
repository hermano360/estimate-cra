import React, { Component } from 'react';
import { Route} from 'react-router-dom'
import Home from '../Home/Home'
import Estimate from '../Estimate/Estimate'
import PhoneList from '../PhoneList/PhoneList'
import Products from '../Products/Products'
import request from 'superagent'

import './App.css';

class App extends Component {
  constructor(e){
    super(e)
  }
  componentWillMount(){

  }
  render() {
    return (
      <div className="App">
        {/*<header className="App-header">
          <Link to="/">Test</Link>
          <Link to="/secondpage">Second Page</Link>
        </header>*/}
        <main>
          <Route exact path="/" component={Home} />
          <Route exact path="/estimate" component={Estimate} />
          <Route exact path="/phonelist" component={PhoneList} />
          <Route exact path="/products" component={Products} />
        </main>
      </div>
    );
  }
}

export default App;
