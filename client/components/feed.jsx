import React, { Component } from 'react';
import Moment from 'moment';

// Shows price feed
// Eventually to show graph using datapoints in historyBTC
class Feed extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { getPriceFeed, feed, ticker, priorTicker, datetime } = this.props;
    const historyBTC = [];
    
    feed.forEach((datapoint) => {
      const { datetime, price, pair } = datapoint;
      const timestamp = new Moment(datetime);
      historyBTC.push(
        <li>{`Time: ${timestamp.format('h:mm:ss')} | Price: $${price.toFixed(2)} | ${pair}`}</li>,
      );
    });

    const delta = ticker - priorTicker;
    // const deltaSign = delta > 0 ? '+' : '-';
    const deltaImg = delta > 0 ? '/client/assets/green.png' : '/client/assets/red.png';
    const formattedTicker = Number(ticker).toFixed(2).toLocaleString();
    const time = new Moment(datetime);

    return (
      <div id="feedDiv">
        <p>Current Price</p>
        <div>
          <span>{`${time.format('h:mm:ss A')}`}</span>
          <span>{`$${formattedTicker}`}</span>
          <img src={deltaImg} alt="hello" />
        </div>
        <input className="inputbutton" id="getprices" type="submit" onClick={getPriceFeed} value="Get Price History" />
        <ul>{historyBTC}</ul>
      </div>
    );
  }
}

export default Feed;
