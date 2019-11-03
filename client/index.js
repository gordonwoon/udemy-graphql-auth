import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { Router, Route, hashHistory } from 'react-router';
import App from './components/app';
import LoginForm from './components/login-form';
import SignupForm from './components/signup-form';
import Dashboard from './components/dashboard';
import RequireAuth from './components/require-auth';

const networkInterface = createNetworkInterface({
  uri: '/graphql',
  opts: {
    credentials: 'same-origin'
  }
})

const client = new ApolloClient({
  networkInterface,
  dataIdFromObject: o => o.id
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <Route path="/login" component={LoginForm} />
          <Route path="/signup" component={SignupForm} />
          <Route path="/home" component={RequireAuth(Dashboard)} />
        </Route>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector('#root'));
