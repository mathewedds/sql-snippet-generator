import './App.css';
import React, { Component }  from 'react';
import Main from './components/Main/Main';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import ToastMessage from './components/ToastMessage/ToastMessage';

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      toasts: []
    }

    this.handleToastMessageUpdate = this.handleToastMessageUpdate.bind(this);
    this.handleToastClosed = this.handleToastClosed.bind(this);
  }

  handleToastMessageUpdate(message) {
    // create a new toast prop with a random id
    const newToast = {
      id: Math.floor(Math.random() * 999999),
      message: message
    }

    // append it to the current list of toasts
    this.setState({
      toasts: [...this.state.toasts, newToast]
    })
  }

  handleToastClosed(id) {
    // remove toast by id
    this.setState({
      toasts: this.state.toasts.filter(x => x.id !== id)
    })
  }

  render() {
    // add font awesome icons
    library.add(faTrash);

    return (
      <div className="App">
        <ToastMessage
          toasts={this.state.toasts}
          onToastClosed={this.handleToastClosed}
        />

        <h1 className="header-text header-main">SQL Snippet Generator</h1>
        <h5 className="header-text header-last">By Mathew Edds • <a className="a-source" target="_blank" href="https://github.com/mathewedds/sql-snippet-generator">Source/Help</a></h5>
  
        <Main 
          onToastMessageUpdate={this.handleToastMessageUpdate}
        />
        
      </div>
    );
  }
}

export default App;
