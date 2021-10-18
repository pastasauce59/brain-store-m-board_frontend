import React, { Component } from "react";
import { Link } from "react-router-dom";

class NavBar extends Component {
  render() {
    return (
      <div className="links">
        {/* <Link to="/yourideas">
          <i class="fas fa-shopping-cart"></i> Home
        </Link>
        <br></br>
        <p></p> */}
        <h1 className="title">Brain-store-m Board</h1>
        {this.props.currentUser.id > 0 ? <h3>Hello, {this.props.currentUser.username}!</h3> : null  }
        <Link to="/sharedideas">
          <i class="fa fa-home icon-home lnr lnr-home ion-ios-home-outline"></i>{" "}
          Shared Ideas
        </Link>
        {/* <br></br>
        <p></p> */}
        {this.props.loggedIn === false ? <Link to="/signup">
          <i class="fa fa-user icon-user lnr lnr-user ion-ios-contact-outline"></i>{" "}
          Signup
        </Link> : null }
        {/* // <Link to="/signup">
        //   <i class="fa fa-user icon-user lnr lnr-user ion-ios-contact-outline"></i>{" "}
        //   Signup
        // </Link> */}
        {/* <br></br>
        <p></p> */}
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
        {/* <br></br>
        <p></p> */}
        {localStorage.token ? (
          <Link to="/yourideas">
            {" "}
            <i class="fa fa-calendar-alt icon-calendar lnr lnr-calendar-full ion-ios-calendar-outline"></i>{" "}
            Your Ideas
          </Link>
        ) : null}
        <br></br>
      </div>
    );
  }
}

export default NavBar;
