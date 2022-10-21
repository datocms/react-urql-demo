import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './Header';
import Home from './Home';
import About from './About';
import Recipe from './Recipe';

const App = () => (
  <BrowserRouter>
    <Header />
    <main>
      <Route exact path="/" component={Home} />
      <Route path="/recipes/:slug" component={Recipe} />
      <Route path="/about" component={About} />
    </main>
  </BrowserRouter>
);

export default App;
