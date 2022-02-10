import React, { Component } from 'react';
import FeedCard from './FeedCard';

class FeedContainer extends Component {
    render() {
        return (
            <div className='feed'>
                <h1 className="public">Publicly Shared Ideas (To help you get some more ideas 💡)</h1>
                <div className='feed-container'>
                    {this.props.publicIdeas.map(idea => 
                    <FeedCard key={idea.id} publicIdeas={idea} currentUser={this.props.currentUser} />)}
                </div>
            </div>
        );
    }
}

export default FeedContainer;
