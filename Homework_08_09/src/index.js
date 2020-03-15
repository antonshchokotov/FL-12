import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './redux/rootReducer';

const store = createStore(rootReducer, {
  courses: [
    {
      id: 1,
      date: '2020-03-11',
      name: 'React',
      description: 'Learn React',
      duration: '1h 30m'
    }, {
      id: 2,
      date: '2020-03-12',
      name: 'Angular',
      description: 'Learn Angular',
      duration: '1h 40m'
    }
  ],
  searchText: '',
  editCourseId: null,
});

window.store = store

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);