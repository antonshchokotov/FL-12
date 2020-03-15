import React from 'react';
import './App.css';
import Home from './pages/Home';
import AddCourse from './pages/AddCourse';
import EditCourse from './pages/EditCourse';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';


function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/add">
            <AddCourse />
          </Route>
          <Route path="/edit">
            <EditCourse />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
    );
  }

export default App;
