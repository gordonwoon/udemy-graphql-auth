import React, { Component } from "react";
import { graphql } from "react-apollo";
import AuthForm from "./auth-form";
import mutation from "../mutations/login";
import query from "../queries/current-user";
import { hashHistory } from 'react-router';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: []
    };
  }
  componentDidUpdate(prevProps) {
    if (!prevProps.data.user && this.props.data.user) {
      hashHistory.push('/home');
    }
  }
  onSubmit(variables) {
    return this.props
      .mutate({
        variables,
        refetchQueries: [{ query }]
      })
      .catch(err =>
        this.setState({ errors: err.graphQLErrors.map(error => error.message) })
      );
  }
  render() {
    return (
      <div>
        <h3>Login</h3>
        <AuthForm onSubmit={this.onSubmit.bind(this)} errors={this.state.errors} />
      </div>
    );
  }
}

export default graphql(query)(
  graphql(mutation)(LoginForm)
);
