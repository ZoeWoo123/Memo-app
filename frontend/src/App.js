import React, { Component } from 'react';
import './App.css';
// import Counter from './components/counter/counter'
import TodoApp from './components/todo/TodoApp'
import './bootstrap.css';
import AuthenticationService from './components/todo/AuthenticationService.js'
class App extends Component {
  componentDidMount(){
    AuthenticationService.setupAxiosInterceptor();
  }
  render(){
  return (
    <div className="App">
      {/* <Counter></Counter> */}
      <TodoApp></TodoApp>
    </div>
  )
  }
  

}


export default App;
