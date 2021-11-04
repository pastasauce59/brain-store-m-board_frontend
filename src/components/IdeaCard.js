import React, { Component } from 'react';

class IdeaCard extends Component {

    state = {
        checked: true
    }
    
    handleClick = () => {
        this.props.click2Edit(this.props.ideas)
    }

    handleDelete = () => {
        this.props.deleteIdea(this.props.ideas)
    }

    handlePrivate = () => {
       let privatePublic = {
            private: !this.props.ideas.private
        }
        
        fetch(`http://localhost:3000/ideas/${this.props.ideas.id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(privatePublic)
        })
        .then(res => res.json())
        .then(edited => this.props.publicIdea(edited))
    }

    render() { 
        return (
            <div className="card">
                <span className="brain">🧠</span>
                <span className="delete" onClick={this.handleDelete}>❌</span>
                <h4 onClick={this.handleClick}>{this.props.ideas.title}</h4>
                <p onClick={this.handleClick}>{this.props.ideas.desc}</p>
                {this.props.ideas.private === true ? 
                    <label className="switch" onClick={this.handlePrivate}>Private: 
                    <input type="checkbox" defaultChecked></input>
                    <span class="slider round"></span>
                    </label> : <label className="switch" onClick={this.handlePrivate}>Private: 
                    <input type="checkbox" ></input>
                    <span class="slider round"></span>
                    </label>}
            </div>
        );
    }
}

export default IdeaCard;