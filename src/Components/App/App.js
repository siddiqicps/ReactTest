// import logo from '../../logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";

import Login from "../Login/login.component";
import Dashboard from '../Dashboard/dashboard.component';

import AuthService from '../../Utils/AuthService'

const auth = new AuthService()
const test = false
function requireAuth() {
  console.log("Inside Require Auth");
  return auth.isAuthenticated()
}

function App() {
  return (<Router>
    <div className="App">
      <div className="auth-wrapper">
        <div className="auth-inner">
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path="/sign-in" component={Login} />
            <Route path="/dashboard" component={Dashboard} />
            <Router path="dashboard" render={() => (
              test ? (
                <Dashboard />
              ) : (
                <Redirect to="/sign-in" />
              )
            )} />
          </Switch>
        </div>
      </div>
    </div></Router>
  );
}

export default App;
