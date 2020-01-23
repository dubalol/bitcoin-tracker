// React must be in scope to use JSX
import React, { Component } from 'react';

class Login extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { login, register, errorMsg } = this.props;
    return (
      <div>
        <form className="loginForm">
          <input type="text" id="username" placeholder="Username" />
          <input type="text" id="password" placeholder="Password" />
          <div>
            <input type="submit" id="login" value="Log In" onClick={login} />
            <input type="button" id="register" value="Register" onClick={register} />
            <input type="button" id="forgot" value="Forgot?" />
          </div>
          <input type="button" id="github" value="Log In With Github" />
        </form>
        <h5>{errorMsg}</h5>
      </div>
    );
  }
}

export default Login;
