import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Playlist from "./pages/playlist.js";
import media from "./pages/media.js";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route
            exact
            path="/playlist/:playlist_id"
            component={Playlist}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
