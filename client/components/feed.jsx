import React, { Component } from 'react';
import Moment from 'moment';

class Feed extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { getPriceFeed, feed, ticker, priorTicker, datetime } = this.props;

    // somehow render only a specific subset of pricefeed
    // iterate through feed and build price history
    // SHOW CURRENT VALUE OF PORTFOLIO

    // const ticker = [];
    // if (feed.length > 0) {
    //   ticker.push(<h3>{'Current Price'}</h3>)
    //   ticker.push(<h3>{`${feed[0].pair}: ${feed[0].price.toFixed(2)}`}</h3>);
    // }

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
    // console.log(typeof ticker);
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
