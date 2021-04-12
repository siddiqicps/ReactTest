import React, { Component } from "react";
import { PropTypes as PT } from 'prop-types';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Alert  } from 'react-bootstrap';

import AuthService from '../../Utils/AuthService'

const auth = new AuthService()

export default class Login extends Component {
    constructor(context) {
      super()
      this.state = {
        username: '',
        email: '',
        password: '',
        loginError: ''
      }
    }
    static contextTypes = {
      router: PT.object
    }

    static propTypes = {
      location: PT.object,
      auth: PT.instanceOf(AuthService)
    }

    handleClick = () => {
        //const history = useHistory();
        console.log('this is:'+ this);
        //history.push("/student-dashboard");
    }

    onLoginSubmit(event) {
      event.preventDefault()
      const { username, password } = this.state
      console.log(this.props)
      if (username && password) {
        auth.login(username, password)
          .then(result => {
            if (!result.token) {
              this.setState({loginError: result.message})
              return
            }
            auth.finishAuthentication(result.token)
            this.props.history.push('/dashboard')
          })
      }
    }

    handleChange(event) {
      this.setState({[event.target.name]: event.target.value})
    }

    render() {

        return (
            <div className="container-login100">
                <div className="wrap-login100">
                    <form className="login100-form validate-form" onSubmit={this.onLoginSubmit.bind(this)}>
                        <span className="login100-form-title p-b-34 p-t-27">
                        Log in
                        </span>
                        <div className="wrap-input100 validate-input" data-validate="Enter username">
                            <input className="input100" type="text" name="username" placeholder="Username" required value={this.state.username} onChange={this.handleChange.bind(this)}/>
                            <span className="focus-input100" data-placeholder=""></span>
                        </div>
                        <div className="wrap-input100 validate-input" data-validate="Enter password">
                            <input className="input100" type="password" name="password" placeholder="Password" required value={this.state.pass} onChange={this.handleChange.bind(this)}/>
                            <span className="focus-input100" data-placeholder=""></span>
                        </div>
                        <div className="container-login100-form-btn">
                            <button className="login100-form-btn">
                            Login
                            </button>
                        </div>
                        { this.state.loginError &&
                          <span bsStyle="danger">{this.state.loginError}</span>
                        }
                    </form>
                </div>
            </div>
        );
    }
}
