import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import AuthForm from './auth-form';
import mutation from '../mutations/login';

class LoginForm extends Component {
  onSubmit(variables) {
    this.props
      .mutate({
        variables,
        refetchQueries: [{ query }]
      })
      .then(res => this.setState({ email: "", password: "" }));
  }
  render() {
    return (
      <div>
        <h3>Login</h3>
        <AuthForm onSubmit={this.onSubmit.bind(this)} />
      </div>
    )
  }
}

export default graphql(mutation)(LoginForm);