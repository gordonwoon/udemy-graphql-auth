import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import query from '../queries/current-user';

class Header extends Component {
  renderButton() {
    const { data: { user } } = this.props;
    console.log(this.props);
    if (!user) return null;
    return (
      <div>
        {user.email}
      </div>
    )
  }
  render() {
    return (
      <div>
        Header
        {this.renderButton()}
      </div>
    )
  }
}

export default graphql(query)(Header);