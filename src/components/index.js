import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {
  Route,
  BrowserRouter,
  Redirect,
  Switch,
  NavLink,
  Link,
} from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { NavLink as NavLinkReactstrap } from 'reactstrap';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import Dashboard from './Dashboard/DashboardContainer';
import Settings from './Settings/SettingsContainer';
import Collection from './Collection/Collection';
import AddMovie from './Movies/AddMovie';
import Movie from './Movies/Movie';
import { logout } from '../helpers/auth';
import { firebaseAuth } from '../config/constants';

const DropdownLink = ({ label, to }) =>
  <Route
    path={to}
    children={({ match }) =>
      <DropdownItem>
        <Link className="nav-dropdown-link" to={to}>
          {label}
        </Link>
      </DropdownItem>}
  />;

const Avatar = ({ email }) =>
  <img
    className="avatar"
    src={`https://api.adorable.io/avatars/35/${email}.png`}
    alt="Avatar"
  />;

function PrivateRoute({ component: Component, authed, user, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        authed === true
          ? <Component {...props} user={user} />
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
    user: null,
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
          user,
        });
      } else {
        this.setState({
          authed: false,
          loading: false,
          user: null,
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
                  {this.state.user
                    ? <NavItem>
                        <UncontrolledDropdown className="nav-item">
                          <DropdownToggle nav caret>
                            <i className="fa fa-plus" />
                          </DropdownToggle>
                          <DropdownMenu right>
                            <DropdownLink
                              label="Movie Collection"
                              to="/collection"
                            />
                            <DropdownLink label="Add A Movie" to="/addmovie" />
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </NavItem>
                    : ''}
                  {this.state.user
                    ? <NavItem>
                        <UncontrolledDropdown className="nav-item">
                          <DropdownToggle nav caret className="p-0">
                            <Avatar email={this.state.user.email} />
                          </DropdownToggle>
                          <DropdownMenu right>
                            <DropdownItem header>
                              Signed in as {this.state.user.email}
                            </DropdownItem>
                            <DropdownItem divider />
                            <DropdownLink label="Settings" to="/settings" />
                            <DropdownItem onClick={() => logout()}>
                              Sign Out
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </NavItem>
                    : ''}
                  <NavItem>
                    {this.state.authed
                      ? ''
                      : <NavLink to="/login" className="nav-link">
                          Sign In
                        </NavLink>}
                  </NavItem>
                </Nav>
              </Collapse>
            </Navbar>
            <div>
              <Switch>
                <Route path="/" exact component={Home} />
                <PublicRoute
                  authed={this.state.authed}
                  path="/login"
                  component={Login}
                />
                <PublicRoute
                  authed={this.state.authed}
                  user={this.state.user}
                  path="/register"
                  component={Register}
                />
                <PrivateRoute
                  authed={this.state.authed}
                  user={this.state.user}
                  path="/dashboard"
                  component={Dashboard}
                />
                <PrivateRoute
                  authed={this.state.authed}
                  user={this.state.user}
                  path="/settings"
                  component={Settings}
                />
                <PrivateRoute
                  authed={this.state.authed}
                  user={this.state.user}
                  path="/collection"
                  component={Collection}
                />
                <PrivateRoute
                  authed={this.state.authed}
                  user={this.state.user}
                  path="/addmovie"
                  component={AddMovie}
                />
                <PrivateRoute
                  authed={this.state.authed}
                  user={this.state.user}
                  path="/movie/:id"
                  component={Movie}
                />
                <Route render={() => <h3>No Match</h3>} />
              </Switch>
            </div>
          </div>
        </BrowserRouter>;
  }
}
