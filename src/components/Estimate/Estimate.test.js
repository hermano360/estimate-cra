import React from 'react';
import ReactDOM from 'react-dom';
import Estimate from './Estimate';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Estimate />, div);
});
