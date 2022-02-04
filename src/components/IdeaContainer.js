import React, { Component } from 'react';
import IdeaCard from './IdeaCard';
import IdeaForm from './IdeaForm';

class IdeaContainer extends Component {
    render() {
        return (
            <div>
                <h1 className="your-ideas">Your Ideas</h1>
                <div>
                    <button type="button" class="btn btn-primary mr-1" onClick={this.props.addIdea}>Create New Idea</button>
                </div>
                {this.props.notification === "" ? null : <span className='notification'>{this.props.notification}</span>}
                <br></br>
                <div className='idea-container'>
                    {this.props.currentUserIdeas.map(idea =>
                        this.props.editIdeaID === idea.id ? <IdeaForm key={idea.id} ideas={idea} editIdea={this.props.editIdea}
                        removeNotification={this.props.removeNotification} /> : <IdeaCard key={idea.id} ideas={idea} 
                        click2Edit={this.props.click2Edit} deleteIdea={this.props.deleteIdea} publicIdea={this.props.publicIdea} /> )}
                </div>
            </div>
        );
    }
}

export default IdeaContainer;