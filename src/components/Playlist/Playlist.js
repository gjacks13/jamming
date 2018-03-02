import React, { Component } from 'react';
import TrackList from '../TrackList/TrackList';
import './Playlist.css';

class PlayList extends Component {
  constructor(props) {
    super(props);

    this.handleNameChange.bind(this);
    this.props.onNameChange.bind(this);
  }

  handleNameChange(event) {
    this.props.onNameChange(event.target.value);
  }

  render() {
    return (
      <div className="Playlist">
        <input defaultValue={'New Playlist'} onChange={this.handleNameChange}/>
        <TrackList tracks={this.props.playlistTracks} />
        <a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
      </div>
    );
  }
}

export default PlayList;
