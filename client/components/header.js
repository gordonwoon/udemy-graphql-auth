import React, { Component } from "react";
import { graphql } from "react-apollo";
import query from "../queries/current-user";
import { Link } from "react-router";
import logout from "../mutations/logout";
import { hashHistory } from 'react-router';

class Header extends Component {
  onLogout() {
    this.props.mutate({
      refetchQueries: [{ query }]
    });
    hashHistory.push('/login');
  }
  renderButtons() {
    const { loading, user } = this.props.data;
    if (loading) return <div>Loading...</div>;
    if (user) {
      return (
        <li>
          <a onClick={this.onLogout.bind(this)}>Logout</a>
        </li>
      );
    } else {
      return (
        <div>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </div>
      );
    }
  }
  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link to="/" className="brand-logo left">
            Home
          </Link>
          <ul className="right">{this.renderButtons()}</ul>
        </div>
      </nav>
    );
  }
}

export default graphql(logout)(graphql(query)(Header));
