import React, { Component } from 'react';
import './App.css';
import coverLordOfTheRigns from "./img/lordOfTheRighsCover.jpg";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={coverLordOfTheRigns} alt="Cover of Lord Of The Rigns Movie" className="cover" />
        </header>
      </div>
    );
  }
}

export default App;
