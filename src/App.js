import React from 'react';
import './App.css';

import Home from './pages/Home';
import Rooms from './pages/Rooms';
import SingleRoom from './pages/SingleRoom';
import Error from './pages/Error';

import {Route, Switch} from 'react-router-dom';

import Navbar from './components/Navbar';

function App() {
  return (
    <>
    <Navbar />
    {/* we wrap all the route in a switch, because when we try to navigate to a page that is not there, we can inform the user there is no such page and help them get back to the home page */}
    <Switch>
      <Route exact path="/" component={Home} /> {/*we use exact so that only the page that should be rendered get rendered, and the page that was there initially get de-rendered */}
      <Route exact path="/rooms/" component={Rooms} /> 
      <Route exact path="/rooms/:slug" component={SingleRoom} /> 
      <Route component={Error} />
    </Switch>
    </>
  );
}

export default App;
