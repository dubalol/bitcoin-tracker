import React, { Component } from 'react';

class Portfolio extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { portfolio, userLoggedIn, buy, sell } = this.props;
    const portfolioComponents = [];
    if (userLoggedIn) { // if user is logged in
      // render buy/sell form
      portfolioComponents.push(
        <h5 key="user">{`${userLoggedIn}'s Portfolio`}</h5>,
        <form key="tradeForm">
          <input type="text" id="tradeAmt" placeholder="Amount" />
          <select id="dropdown">
            <option value="BTC-USD">BTC-USD</option>
          </select>
          <input type="button" value="Buy" onClick={buy} />
          <input type="button" value="Sell" onClick={sell} />
        </form>,
      );
      // render portfolio
      Object.keys(portfolio).forEach((bal) => {
        const currency = bal.substring(0, 3).toUpperCase();
        portfolioComponents.push(<p key={currency}>{`Your ${currency} balance: ${portfolio[bal]}`}</p>);
      });
      // render total balance view, USD + btc*spot
    }
    return (
      <div>
        {portfolioComponents}
      </div>
    );
  }
}

export default Portfolio;
