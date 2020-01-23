import React, { Component } from 'react';
import Moment from 'moment';

class Feed extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { getPriceFeed, feed } = this.props;

    // somehow render only a specific subset of pricefeed
    // iterate through feed and build price history
    // SHOW CURRENT VALUE OF PORTFOLIO
    const historyBTC = [];
    feed.forEach((datapoint) => {
      const { datetime, price, pair } = datapoint;
      const timestamp = new Moment(datetime);
      historyBTC.push(
        <li>{`Time: ${timestamp.format('h:mm:ss')} | Price: ${price.toFixed(2)} | ${pair}`}</li>,
      );
    });

    return (
      <div>
        <button type="submit" onClick={getPriceFeed}>GetPrices</button>
        <ul>{historyBTC}</ul>
      </div>
    );
  }
}

export default Feed;
