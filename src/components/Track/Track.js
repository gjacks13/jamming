import React, { Component } from 'react';
import './Track.css';

class Track extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRemoval: false
    };

    this.renderAction.bind(this);
    this.addTrack.bind(this);
    this.removeTrack.bind(this);
  }

  renderAction() {
    if (this.state.isRemoval) {
      return <a className="Track-action" onClick={this.RemoveTrack}>-</a>;
    } else {
      return <a className="Track-action" onClick={this.addTrack}>+</a>;
    }
  }

  addTrack() {
    this.props.onAdd(this.props.track);
  }

  removeTrack() {
    this.props.onRemove(this.props.track);
  }

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
        </div>
        {this.renderAction()}
      </div>
    );
  }
}

export default Track;
