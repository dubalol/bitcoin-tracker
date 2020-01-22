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
    };
    this.getPriceFeed = this.getPriceFeed.bind(this);
    this.login = this.login.bind(this);
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
    // gets current value in username and password fields
    // sends to server
    // server encrypts and matches against user profiles db

    const credentials = {
      username: 'testuser',
      password: 'testpass',
    };

    fetch('/api/auth', {
      method: 'post',
      body: JSON.stringify(credentials),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        console.log('auth request res: ', res);
      })
      .catch((err) => console.log(err));

    // this.setState({});
  }


  render() {
    const { feed } = this.state;
    return (
      <div>
        <Login login={this.login} />
        <Portfolio />
        <Feed getPriceFeed={this.getPriceFeed} feed={feed} />
      </div>
    );
  }
}

render(<App />, document.querySelector('#rootMain'));

// window.addEventListener('DOMContentLoaded', (e) => {
//   e.preventDefault();
//   const body = document.querySelector('body');

//   const login = document.getElementById('login');
//   login.addEventListener('click', async (ev) => {
//     ev.preventDefault();
//     console.log('hello from login button');
//     const userAuth = await fetch('/api/auth')
//       .then((res) => res.text())
//       .then((authResponse) => authResponse)
//       .catch((err) => console.log(err));
//     console.log(userAuth);
//     // on successful login, remove log in elements and show portfolio
//   });



//   const newDiv = document.createElement('div');
//   newDiv.innerHTML = 'Hi from bundled index.js';
//   body.appendChild(newDiv);

//   const newButton = document.createElement('button');
//   newButton.innerHTML = 'Click me';
//   body.appendChild(newButton);

//   const priceList = document.createElement('ul');
//   body.appendChild(priceList);


//   newButton.addEventListener('click', async (e) => {
//     e.preventDefault();

//     // const price = await fetch('http://localhost:8080/api/test');
//     // console.log(price);
//     fetch('/api/test')
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data);
//         data.forEach((el) => {
//           const newPricePoint = document.createElement('li');
//           const textNode = document.createTextNode(`${el.datetime}: ${el.price}`);
//           newPricePoint.appendChild(textNode);
//           document.querySelector('ul').prepend(newPricePoint);
//         });
//       })
//       .catch((err) => console.log(err));
//   });

//   const poweredBy = document.createElement('h5');
//   poweredBy.innerHTML = 'Powered by Coinbase';
//   body.appendChild(poweredBy);
// });
