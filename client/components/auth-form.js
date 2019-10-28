import React, { Component } from "react";
import query from "../queries/current-user";

class AuthForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }
  onSubmit(e) {
    e.preventDefault();
    this.props.onSubmit({ email: this.state.email, password: this.state.password })
      .then(res => this.setState({ email: "", password: "" }));
  }
  render() {
    return (
      <div className="row">
        <form className="col s6" onSubmit={this.onSubmit.bind(this)}>
          <div className="input-field">
            <input
              placeholder="Email"
              value={this.state.email}
              onChange={e => this.setState({ email: e.target.value })}
            />
          </div>
          <div className="input-field">
            <input
              placeholder="Password"
              type="password"
              value={this.state.password}
              onChange={e => this.setState({ password: e.target.value })}
            />
          </div>
          <button className="btn">Submit</button>
        </form>
      </div>
    );
  }
}

export default AuthForm;
