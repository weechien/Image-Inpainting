import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux'
import store from './store'
import Main from './containers/main'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <div className="App">
        <Main {...this.props} />
      </div>
      </Provider>
    );
  }
}

export default App
