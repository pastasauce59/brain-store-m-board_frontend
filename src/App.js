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
    // fetch("http://127.0.0.1:3000/ideas", {
    //   method: "GET",
    //   headers: {
    //     "Authorization": `Bearer ${localStorage.token}`
    //   }
    // })
    //   .then((res) => res.json())
    //   .then(ideasArr => this.setState({ideas: ideasArr.filter(idea => idea.private === false)}))
      if (localStorage.token) {
      fetch("http://127.0.0.1:3000/public_ideas", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${localStorage.token}`
      }
    })
      .then((res) => res.json())
      .then(ideasArr => this.setState({
        ideas: ideasArr,
        // currentUser: JSON.parse(localStorage.getItem("user")),
        // currentUserIdeas: JSON.parse(localStorage.getItem())
      }))
      this.stillThere()
    }
    else {
      fetch("http://127.0.0.1:3000/public_ideas", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${localStorage.token}`
      }
    })
      .then((res) => res.json())
      .then(ideasArr => this.setState({
        ideas: ideasArr,
        // currentUser: JSON.parse(localStorage.getItem("user")),
        // currentUserIdeas: JSON.parse(localStorage.getItem())
      }))
    }
  }

  stillThere = () => {
    let parsedUser = JSON.parse(localStorage.getItem("user"))
    console.log(parsedUser, "im here")
    this.setState({
      currentUser: parsedUser,
      currentUserIdeas: parsedUser.ideas
    })
  }

  

  loggedIn = (res) => {
    localStorage.token = res.token
    localStorage.setItem("user", JSON.stringify(res.user))
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
    let update = JSON.parse(localStorage.user)

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
    .then( (newIdeaObj) => { 
      this.setState({
      currentUserIdeas: [...this.state.currentUserIdeas, newIdeaObj],
      editIdeaID: newIdeaObj.id
    })
      update.ideas = [...update.ideas, newIdeaObj]
      localStorage.setItem("user", JSON.stringify(update))
    })
  }

  editIdea = (editedIdea) => {
    let update = JSON.parse(localStorage.user)
    this.setState({currentUserIdeas: this.state.currentUserIdeas.map(idea => idea.id === editedIdea.id ? editedIdea : idea ),
    notification: "Your changes are saved ✅",
    ideas: this.state.ideas.map(idea => idea.id === editedIdea.id ? editedIdea : idea),
    editIdeaID: null
    })
    // console.log(edits)
    update.ideas = this.state.currentUserIdeas.map(idea => idea.id === editedIdea.id ? editedIdea : idea )
    localStorage.setItem("user", JSON.stringify(update))
  }

  click2Edit = (idea) => {
    this.setState({editIdeaID: idea.id })
  }

  removeNotification = () => {
    this.setState({notification: ''})
  }

  deleteIdea = (idea) => {
    // console.log(idea.id)
    let update = JSON.parse(localStorage.user)
    let userIdeasUpdated = this.state.currentUserIdeas.filter(usrIdea => usrIdea.id !== idea.id)
    let ideasUpdated = this.state.ideas.filter(publicIdea => publicIdea.id !== idea.id)
    fetch(`http://localhost:3000/ideas/${idea.id}`, {
      method: "DELETE",
    })
    .then(res => res.json())
    .then(this.setState({
      currentUserIdeas: userIdeasUpdated,
      ideas: ideasUpdated
    }),
      update.ideas = userIdeasUpdated,
      localStorage.setItem("user", JSON.stringify(update))
    )
  }

  publicIdea = (idea) => {
    let update = JSON.parse(localStorage.user)
    let userIdeasPublicPrivate = this.state.currentUserIdeas.map(oldIdea => oldIdea.id === idea.id ? idea : oldIdea )
    let ideasPublicPrivate = idea.private === false ? [...this.state.ideas, idea] : this.state.ideas.filter(pubIdea => pubIdea.id !== idea.id)
    this.setState({
    currentUserIdeas: userIdeasPublicPrivate,
    ideas: ideasPublicPrivate
    })
    console.log(idea)
    update.ideas = userIdeasPublicPrivate
    localStorage.setItem("user", JSON.stringify(update))
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