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
import CopyToClipboard from 'react-copy-to-clipboard';
import Loading from './Loading/Loading';
import { logout } from '../helpers/auth';
import { firebaseAuth } from '../config/constants';
// import Login from './Login';
// import Register from './Register';
// import Home from './Home';
// import Dashboard from './Dashboard/DashboardContainer';
// import Settings from './Settings/SettingsContainer';
// import Collection from './Collection/Collection';
// import Collections from './Collections/Collections';
// import AddMovie from './Movies/AddMovie';
// import Movie from './Movies/Movie';
import asyncComponent from './AsyncComponent';

const AsyncHome = asyncComponent(() => import('./Home'));
const AsyncDashboard = asyncComponent(() =>
  import('./Dashboard/DashboardContainer')
);
const AsyncLogin = asyncComponent(() => import('./Login'));
const AsyncRegister = asyncComponent(() => import('./Register'));
const AsyncSettings = asyncComponent(() =>
  import('./Settings/SettingsContainer')
);
const AsyncCollection = asyncComponent(() => import('./Collection/Collection'));
const AsyncCollections = asyncComponent(() =>
  import('./Collections/Collections')
);
const AsyncAddMovie = asyncComponent(() => import('./Movies/AddMovie'));
const AsyncMovie = asyncComponent(() => import('./Movies/Movie'));

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
  _searchSubmit = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      console.log(e);
    }
  };
  _copyToClipboard = e => {
    console.log(e);
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
      ? <Loading />
      : <BrowserRouter>
          <div>
            <Navbar color="faded" light toggleable>
              <NavbarToggler right onClick={this.toggle} />

              <NavLink to="/" className="navbar-brand">
                Home
              </NavLink>
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                  {/* <NavItem>
                    <div className="input-group">
                      <input
                        onKeyPress={this._searchSubmit}
                        type="text"
                        className="form-control"
                        placeholder="Search for movie"
                      />
                      <span className="input-group-btn">
                        <button
                          onClick={this._searchSubmit}
                          className="btn btn-secondary"
                          type="button"
                        >
                          Go!
                        </button>
                      </span>
                    </div>
                  </NavItem> */}
                  {this.state.user
                    ? <NavItem>
                        <UncontrolledDropdown className="nav-item">
                          <DropdownToggle nav caret>
                            <i className="fa fa-plus" />
                          </DropdownToggle>
                          <DropdownMenu right>
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
                            <DropdownLink
                              label="Movie Collection"
                              to="/collection"
                            />
                            <DropdownItem>
                              <CopyToClipboard
                                text={`https://movie-collector-9f2c3.firebaseapp.com/${this
                                  .state.user.uid}`}
                                onCopy={this._copyToClipboard}
                              >
                                <span>Share Movie Collection Link</span>
                              </CopyToClipboard>
                            </DropdownItem>
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
                <Route path="/" exact component={AsyncHome} />
                <PublicRoute
                  authed={this.state.authed}
                  path="/login"
                  component={AsyncLogin}
                />
                <PublicRoute
                  authed={this.state.authed}
                  user={this.state.user}
                  path="/register"
                  component={AsyncRegister}
                />
                <PrivateRoute
                  authed={this.state.authed}
                  user={this.state.user}
                  path="/dashboard"
                  component={AsyncDashboard}
                />
                <PrivateRoute
                  authed={this.state.authed}
                  user={this.state.user}
                  path="/settings"
                  component={AsyncSettings}
                />
                <PrivateRoute
                  authed={this.state.authed}
                  user={this.state.user}
                  path="/collection"
                  component={AsyncCollection}
                />
                <Route
                  authed={this.state.authed}
                  path="/collections/:uid"
                  component={AsyncCollections}
                />
                <PrivateRoute
                  authed={this.state.authed}
                  user={this.state.user}
                  path="/addmovie"
                  component={AsyncAddMovie}
                />
                <PrivateRoute
                  authed={this.state.authed}
                  user={this.state.user}
                  path="/movie/:id"
                  component={AsyncMovie}
                />
                <Route
                  authed={this.state.authed}
                  user={this.state.user}
                  path="/movies/:id"
                  component={AsyncMovie}
                />
                <Route render={() => <h3>No Match</h3>} />
              </Switch>
            </div>
          </div>
        </BrowserRouter>;
  }
}
