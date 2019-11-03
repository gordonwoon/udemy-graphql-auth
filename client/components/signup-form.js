import React, { Component } from "react";
import { graphql } from "react-apollo";
import AuthForm from "./auth-form";
import mutation from "../mutations/signup";
import query from "../queries/current-user";
import { hashHistory } from 'react-router';

class SignupForm extends Component {
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
        <h3>Signup</h3>
        <AuthForm onSubmit={this.onSubmit.bind(this)} errors={this.state.errors} />
      </div>
    );
  }
}

export default graphql(query)(
  graphql(mutation)(SignupForm)
);
