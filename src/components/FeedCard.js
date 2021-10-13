import React, { Component } from 'react';

class FeedCard extends Component {
    render() {
        console.log(this.props.publicIdeas)
        return (
            <div className="card">
                <span className="pin">📌</span>
                {this.props.publicIdeas.user_id === this.props.currentUser.id ? 
                <span className="brain">🧠</span>: null}
                <h4>{this.props.publicIdeas.title}</h4>
                <p>{this.props.publicIdeas.desc}</p>
                <h5>Idea by: {this.props.publicIdeas.user.username}</h5>
                {this.props.publicIdeas.user_id === this.props.currentUser.id ? 
                <h5 className="yours">(This is your idea!)</h5> : null}
            </div>
        );
    }
}

export default FeedCard;