import React, { Component } from "react";
import { API_ROOT } from "../apriRoot";

class Signup extends Component {
  state = {
    username: "",
    password: ""
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${API_ROOT}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state),
    })
      .then((r) => r.json())
      .then((res) => {
        if (res.error) {
          alert(res.error);
        } else {
          alert("Thanks for signing up");
          window.location.pathname = "/login";
        }
      });
  };

  render() {
    const { username, password } = this.state;

    return (
      <div>
        <h1 className="signup">Signup</h1>
        <div className='login-signup'>
      <form onSubmit={this.handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          name="username"
          autoComplete="off"
          value={username}
          onChange={this.handleChange}
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          autoComplete="current-password"
          value={password}
          onChange={this.handleChange}
        />

        <input class="btn btn-primary mr-1" type="submit" value="Signup" />
      </form>
      </div>
      </div>
    );
  }
}

export default Signup;
