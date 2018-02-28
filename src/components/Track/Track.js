import React, { Component } from 'react';
import './Track.css';

class Track extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRemoval: false
    };

    this.renderAction.bind(this);
  }

  renderAction() {
    if (this.state.isRemoval) {
      return <a className="Track-action">-</a>;
    } else {
      return <a className="Track-action">+</a>;
    }
  }

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.name}</h3>
          <p>{this.props.artist} | {this.props.album}</p>
        </div>
        {this.renderAction()}
      </div>
    );
  }
}

export default Track;
