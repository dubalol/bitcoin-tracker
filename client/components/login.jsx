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
      <div id="loginDiv">
        <form className="loginForm">
          <input className="inputText" type="text" id="username" placeholder="Username" />
          <input className="inputText" type="password" id="password" placeholder="Password" />
          <div id="regAuth">
            <div>
              <input className="inputbutton" type="submit" id="login" value="Log In" onClick={login} />
            </div>
            <div>
              <input className="inputbutton" type="button" id="register" value="Register" onClick={register} />
            </div>
            <div>
              <input className="inputbutton" type="button" id="forgot" value="Forgot?" />
            </div>
          </div>
          <input className="inputbutton" type="button" id="github" value="Log In With Github" />
        </form>
        <h5>{errorMsg}</h5>
      </div>
    );
  }
}

export default Login;
