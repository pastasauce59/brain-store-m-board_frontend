import React, { Component } from 'react';

class IdeaForm extends Component {
    
    state = {
        title: this.props.ideas.title,
        desc: this.props.ideas.desc
    }

    handleChange = (e) => {
        this.props.removeNotification()
        this.setState({[e.target.name]: e.target.value})
    }

    handleBlur = () => {
        let ideaEdits = {
            title: this.state.title,
            desc: this.state.desc
        }
        fetch(`http://localhost:3000/ideas/${this.props.ideas.id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(ideaEdits),
        })
        .then(resp => resp.json())
        .then(editedIdeaObj => this.props.editIdea(editedIdeaObj))
    }


    render() {
            return (
            <div className="card">
                <form onBlur={this.handleBlur}> 
                    <input className='input' type='text' name='title' autoComplete="off" placeholder='Name Your Idea'
                    value={this.state.title} onChange={this.handleChange} />
                    <textarea className='input' name='desc' autoComplete="off" placeholder='Write Your Idea Here'
                    value={this.state.desc} onChange={this.handleChange} />
                </form>    
            </div>
        );
    }
}

export default IdeaForm;