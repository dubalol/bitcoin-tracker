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

    const ticker = [];
    if (feed.length > 0) {
      ticker.push(<h3>{'Current Price'}</h3>)
      ticker.push(<h3>{`${feed[0].pair}: ${feed[0].price.toFixed(2)}`}</h3>);
    }

    const historyBTC = [];
    feed.forEach((datapoint) => {
      const { datetime, price, pair } = datapoint;
      const timestamp = new Moment(datetime);
      historyBTC.push(
        <li>{`Time: ${timestamp.format('h:mm:ss')} | Price: ${price.toFixed(2)} | ${pair}`}</li>,
      );
    });

    return (
      <div id="feedDiv">
        {ticker}
        <input className="inputbutton" id="getprices" type="submit" onClick={getPriceFeed} value="Get Latest Price" />
        <ul>{historyBTC}</ul>
      </div>
    );
  }
}

export default Feed;
