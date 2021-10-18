import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Navbar from './components/Navbar'
import IdeaContainer from './components/IdeaContainer';
import FeedContainer from './components/FeedContainer';
import Login from './components/Login';
import Signup from './components/Signup';
import "./custom-theme.scss";


class App extends Component {

  state = {
    currentUser: "",
    currentUserIdeas: [],
    ideas: [],
    editIdeaID: null,
    notification: "",
    loggedIn: false
  }

  componentDidMount() {
    fetch("http://127.0.0.1:3000/ideas", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${localStorage.token}`
      }
    })
      .then((res) => res.json())
      .then(ideasArr => this.setState({ideas: ideasArr.filter(idea => idea.private === false)}))
  }
  

  loggedIn = (res) => {
    localStorage.token = res.token
    if (localStorage.token)
    {this.setState({
      currentUser: res.user,
      currentUserIdeas: res.user.ideas,
      loggedIn: !this.state.loggedIn
    })}
    else {
      console.log("error")
    }
    // localStorage.token = res.token
  }

  handleLogout = () => {
    localStorage.clear()
    this.setState({
      loggedIn: !this.state.loggedIn,
      currentUser: "",
    });
    alert("You've been logged out");
  };

  addIdea = () => {
    let newIdea = {
      title: "",
      desc: "",
      private: true,
      user_id: this.state.currentUser.id,
    }

    fetch("http://localhost:3000/ideas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newIdea),
    })
    .then(res => res.json())
    .then(newIdeaObj => this.setState({
      currentUserIdeas: [...this.state.currentUserIdeas, newIdeaObj],
      editIdeaID: newIdeaObj.id
    }))
  }

  editIdea = (editedIdea) => {
    this.setState({currentUserIdeas: this.state.currentUserIdeas.map(idea => idea.id === editedIdea.id ? editedIdea : idea ),
    notification: "Your changes are saved ✅",
    ideas: this.state.ideas.map(idea => idea.id === editedIdea.id ? editedIdea : idea),
    editIdeaID: null
    })
    // console.log(edits)
  }

  click2Edit = (idea) => {
    this.setState({editIdeaID: idea.id })
  }

  removeNotification = () => {
    this.setState({notification: ''})
  }

  deleteIdea = (idea) => {
    console.log(idea.id)
    let userIdeasUpdated = this.state.currentUserIdeas.filter(usrIdea => usrIdea.id !== idea.id)
    let ideasUpdated = this.state.ideas.filter(publicIdea => publicIdea.id !== idea.id)
    fetch(`http://localhost:3000/ideas/${idea.id}`, {
      method: "DELETE",
    })
    .then(res => res.json())
    .then(this.setState({
      currentUserIdeas: userIdeasUpdated,
      ideas: ideasUpdated
    }))
  }

  publicIdea = (idea) => {
  this.setState({
    currentUserIdeas: this.state.currentUserIdeas.map(oldIdea => oldIdea.id === idea.id ? idea : oldIdea ),
    ideas: idea.private === false ? [...this.state.ideas, idea] : this.state.ideas.filter(pubIdea => pubIdea.id !== idea.id)
  })
  console.log(idea)
  }

  render() {
    // console.log(this.state.ideas)
    // console.log(this.state.currentUser)
    // console.log(this.state.currentUserIdeas)
    // console.log(this.state.editIdeaID)

    // let notPrivate = this.state.ideas.filter(idea => idea.private === false)
    // console.log(notPrivate)

    return (
      <Router>
        <Navbar currentUser={this.state.currentUser} loggedIn={this.state.loggedIn} handleLogout={this.handleLogout} />
        
        {localStorage.token ? null : <h1>To begin please Signup 👆 or Login 👆 to start!</h1>}
        
        <Switch>
        <Route exact path='/login'
        render={routerProps => 
          <Login routerProps={routerProps} loggedIn={this.loggedIn} /> } />
        <Route exact path="/signup">
          <Signup />
        </Route>
        <Route exact path='/sharedideas'>  
        <FeedContainer publicIdeas={this.state.ideas} currentUser={this.state.currentUser}/>
        </Route>

        <Route exact path='/yourideas'>
        <IdeaContainer currentUser={this.state.currentUser} editIdeaID={this.state.editIdeaID}
        currentUserIdeas={this.state.currentUserIdeas} addIdea={this.addIdea} editIdea={this.editIdea}
        notification={this.state.notification} removeNotification={this.removeNotification}
        click2Edit={this.click2Edit} deleteIdea={this.deleteIdea} publicIdea={this.publicIdea}/>
        </Route> 
      {/* </div> */}
      </Switch>
      </Router>
    );
  }
}

export default App;