import React, { Component } from 'react';

class Portfolio extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { portfolio } = this.props;
    const portfolioList = [];
    Object.keys(portfolio).forEach((bal) => {
      const currency = bal.substring(0, 3).toUpperCase();
      portfolioList.push(<p key={currency}>{`Your ${currency} balance: ${portfolio[bal]}`}</p>);
    });
    return (
      <div>
        Hello World from Portfolio
        {portfolioList}
      </div>
    );
  }
}

export default Portfolio;
