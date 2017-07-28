import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {
  Route,
  BrowserRouter,
  Redirect,
  Switch,
  NavLink,
} from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem } from 'reactstrap';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import Dashboard from './protected/Dashboard';
import { logout } from '../helpers/auth';
import { firebaseAuth } from '../config/constants';

function PrivateRoute({ component: Component, authed, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        authed === true
          ? <Component {...props} />
          : <Redirect
              to={{ pathname: '/login', state: { from: props.location } }}
            />}
    />
  );
}

function PublicRoute({ component: Component, authed, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        authed === false
          ? <Component {...props} />
          : <Redirect to="/dashboard" />}
    />
  );
}

export default class App extends Component {
  state = {
    authed: false,
    loading: true,
    isOpen: false,
  };
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };
  componentDidMount() {
    this.removeListener = firebaseAuth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          authed: true,
          loading: false,
        });
      } else {
        this.setState({
          authed: false,
          loading: false,
        });
      }
    });
  }
  componentWillUnmount() {
    this.removeListener();
  }
  render() {
    return this.state.loading === true
      ? <h1>Loading</h1>
      : <BrowserRouter>
          <div>
            <Navbar color="faded" light toggleable>
              <NavbarToggler right onClick={this.toggle} />

              <NavLink to="/" className="navbar-brand">
                Home
              </NavLink>
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                  <NavItem>
                    <NavLink to="/dashboard" className="nav-link">
                      Dashboard
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    {this.state.authed
                      ? <NavLink onClick={() => logout()} className="nav-link">
                          Sign Out
                        </NavLink>
                      : <NavLink to="/login" className="nav-link">
                          Sign In
                        </NavLink>}
                  </NavItem>
                </Nav>
              </Collapse>
            </Navbar>
            <div className="container">
              <div className="row">
                <Switch>
                  <Route path="/" exact component={Home} />
                  <PublicRoute
                    authed={this.state.authed}
                    path="/login"
                    component={Login}
                  />
                  <PublicRoute
                    authed={this.state.authed}
                    path="/register"
                    component={Register}
                  />
                  <PrivateRoute
                    authed={this.state.authed}
                    path="/dashboard"
                    component={Dashboard}
                  />
                  <Route render={() => <h3>No Match</h3>} />
                </Switch>
              </div>
            </div>
          </div>
        </BrowserRouter>;
  }
}
