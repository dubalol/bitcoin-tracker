/* eslint-disable import/extensions, class-methods-use-this */

import React, { Component } from 'react';
import { render } from 'react-dom';

import Login from './components/login.jsx';
import Portfolio from './components/portfolio.jsx';
import Feed from './components/feed.jsx';

class App extends Component {
  constructor() {
    super();
    this.state = {
      // user portfolio information
      // price feed data points
      feed: [],
      errorMsg: '',
      portfolio: {},
    };
    this.getPriceFeed = this.getPriceFeed.bind(this);
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
  }

  // portfolio should only populate (i.e. update state) when user is authenticated
  
  
  getPriceFeed(e) {
    e.preventDefault();
    
    fetch('/api/test')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({ feed: data });
      })
      .catch((err) => console.log(err));
  }

  login(e) {
    e.preventDefault();

    const credentials = {
      username: document.querySelector('#username').value,
      password: document.querySelector('#password').value,
    };

    fetch('/api/authLogin', {
      method: 'post',
      body: JSON.stringify(credentials),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.msg) this.setState({ errorMsg: data.msg });
        if (data.portfolio) {
          this.setState({
            portfolio: data.portfolio,
            errorMsg: '',
          });
        }
        return data;
      })
      .catch((err) => console.log(err));

    // this.setState({});
  }

  register(e) {
    e.preventDefault();

    const credentials = {
      username: document.querySelector('#username').value,
      password: document.querySelector('#password').value,
    };

    fetch('/api/authRegister', {
      method: 'post',
      body: JSON.stringify(credentials),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.msg) this.setState({ errorMsg: data.msg });
        if (data.portfolio) {
          this.setState({
            portfolio: data.portfolio,
            errorMsg: '',
          });
        }
        return data;
      })
      .catch((err) => console.log(err));

    // this.setState({});
  }

  render() {
    const { feed, errorMsg, portfolio } = this.state;
    return (
      <div>
        <Login login={this.login} register={this.register} errorMsg={errorMsg} />
        <Portfolio portfolio={portfolio} />
        <Feed getPriceFeed={this.getPriceFeed} feed={feed} />
      </div>
    );
  }
}

render(<App />, document.querySelector('#rootMain'));
