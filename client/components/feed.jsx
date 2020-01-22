import React, { Component } from 'react';

class Feed extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { getPriceFeed, feed } = this.props;

    // somehow render only a specific subset of pricefeed

    return (
      <div>
        Hello World from Feed
        <button type="submit" onClick={getPriceFeed}>GetPrices</button>
        <p>{JSON.stringify(feed)}</p>
      </div>
    );
  }
}

export default Feed;
