import React, { Component } from "react";

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
    fetch("https://hidden-springs-67853.herokuapp.com/users", {
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
          window.location.href = "https://modest-ramanujan-2ed9a4.netlify.app/login";
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
        {/* <h1 className="signup">Signup</h1> */}

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
