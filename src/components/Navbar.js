import React, { Component } from "react";
import { Link } from "react-router-dom";

class NavBar extends Component {
  render() {
    return (
      <div className="links">
      
        <h1 className="title">Brain-store-m Board</h1>
        {this.props.currentUser.id > 0 ? <h3>Hello, {this.props.currentUser.username}!</h3> : null  }
        
        <Link to="/sharedideas">
          <i class="fa fa-home icon-home lnr lnr-home ion-ios-home-outline"></i>{" "}
          Shared Ideas
        </Link>
        {!localStorage.token ? <Link to="/signup">
          <i class="fa fa-user icon-user lnr lnr-user ion-ios-contact-outline"></i>{" "}
          Signup
        </Link> : null }
      
        {!localStorage.token ? (
          <Link to="/login">
            <i class="fa fa-user icon-user lnr lnr-user ion-ios-contact-outline"></i>{" "}
            Login
          </Link>
        ) : (
          <Link to="/sharedideas" onClick={this.props.handleLogout}>
            <i class="fa fa-user icon-user lnr lnr-user ion-ios-contact-outline"></i>{" "}
            Logout
          </Link>
        )}
        
        {localStorage.token ? (
          <Link to="/yourideas">
            {" "}
            <i class="fa fa-calendar-alt icon-calendar lnr lnr-calendar-full ion-ios-calendar-outline"></i>{" "}
            Your Ideas
          </Link>
        ) : null}
        <br></br>
        {localStorage.token ? null : <h1 className="no-login">⬅️ Please login or sign-up to begin!</h1>}
        <br></br>
      </div>
    );
  }
}

export default NavBar;
