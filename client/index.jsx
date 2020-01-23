/* eslint-disable import/extensions, class-methods-use-this */

import React, { Component } from 'react';
import { render } from 'react-dom';
import Moment from 'moment';

import Login from './components/login.jsx';
import Portfolio from './components/portfolio.jsx';
import Feed from './components/feed.jsx';

import styles from './styles.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      // user portfolio information
      // price feed data points
      feed: [],
      errorMsg: '',
      portfolio: {},
      userLoggedIn: '',
    };
    this.getPriceFeed = this.getPriceFeed.bind(this);
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
    this.buy = this.buy.bind(this);
    this.sell = this.sell.bind(this);
  }

  componentDidMount() {
    fetch('/api/prices')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({
          feed: data.map((datapoint) => {
            const { datetime, price, pair } = datapoint;
            return {
              datetime,
              price: Number(price),
              pair,
            };
          }),
        });
      })
      .catch((err) => console.log(err));
  }

  getPriceFeed(e) {
    e.preventDefault();

    fetch('/api/prices')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({
          feed: data.map((datapoint) => {
            const { datetime, price, pair } = datapoint;
            return {
              datetime,
              price: Number(price),
              pair,
            };
          }),
        });
      })
      .catch((err) => console.log(err));
  }

  buy(e) {
    e.preventDefault();
    // get trade amount in input box
    // post to server with pair, amount, and username
    // get back updated portfolio
    const amt = Number(document.querySelector('#tradeAmt').value);
    const pair = document.querySelector('#dropdown').value;
    const { usd_balance, btc_balance } = this.state.portfolio;
    const { price, datetime } = this.state.feed[0];
    const { userLoggedIn } = this.state;
    const spot = price;
    const lastSpotDate = new Moment(datetime);

    // handle if spot hasn't be updated in 30 seconds
    if ((Date.now() - lastSpotDate) > 30000) {
      alert('Must update price before making a trade');
      return; // END FUNCTION IF PRICE ISN'T RECENTLY UPDATED
    }

    // handle if insufficient funds
    if ((amt * spot) > usd_balance) {
      alert('Insufficient funds');
    } else if ((amt * spot) <= usd_balance) {
      // make post request to server with amt, pair, username
      const buyData = {
        username: userLoggedIn,
        rate: spot,
        pair,
        amount: amt,
        usd_balance: Number(usd_balance),
        btc_balance: Number(btc_balance),
        txn_type: 'buy',
        datetime: new Date(),
      };
      fetch('/api/trade', {
        method: 'post',
        body: JSON.stringify(buyData),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.portfolio) {
            this.setState({
              portfolio: data.portfolio,
            });
          }
        })
        .catch((err) => console.log(err));
    }
  }

  sell(e) {
    e.preventDefault();
    const amt = Number(document.querySelector('#tradeAmt').value);
    const pair = document.querySelector('#dropdown').value;
    const { usd_balance, btc_balance } = this.state.portfolio;
    const { price, datetime } = this.state.feed[0];
    const { userLoggedIn } = this.state;
    const spot = price;
    const lastSpotDate = new Moment(datetime);

    // handle if spot hasn't be updated in 30 seconds
    if ((Date.now() - lastSpotDate) > 30000) {
      alert('Must update price before making a trade');
      return; // END FUNCTION IF PRICE ISN'T RECENTLY UPDATED
    }

    // handle if insufficient funds
    if (amt > btc_balance) {
      alert('Insufficient funds');
    } else if (amt <= btc_balance) {
      // make post request to server with amt, pair, username
      const sellData = {
        username: userLoggedIn,
        rate: spot,
        pair,
        amount: amt,
        usd_balance: Number(usd_balance),
        btc_balance: Number(btc_balance),
        txn_type: 'sell',
        datetime: new Date(),
      };
      fetch('/api/trade', {
        method: 'post',
        body: JSON.stringify(sellData),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.portfolio) {
            this.setState({
              portfolio: data.portfolio,
            });
          }
        })
        .catch((err) => console.log(err));
    }
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
        console.log(data);
        if (data.portfolio) {
          this.setState({
            portfolio: data.portfolio,
            errorMsg: '',
            userLoggedIn: data.userLoggedIn,
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
            userLoggedIn: data.userLoggedIn,
          });
        }
        return data;
      })
      .catch((err) => console.log(err));

    // this.setState({});
  }

  render() {
    const {
      feed, errorMsg, portfolio, userLoggedIn,
    } = this.state;
    return (
      <div>
        <Login login={this.login} register={this.register} errorMsg={errorMsg} />
        <Portfolio portfolio={portfolio} userLoggedIn={userLoggedIn} buy={this.buy} sell={this.sell} />
        <Feed getPriceFeed={this.getPriceFeed} feed={feed} />
      </div>
    );
  }
}

render(<App />, document.querySelector('#rootMain'));
