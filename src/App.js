import React, { Component } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import SearchResults from './components/SearchResults/SearchResults';
import PlayList from './components/PlayList/Playlist';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: "New Playlist",
      playlistTracks: []
    };

    this.addTrack.bind(this);
    this.removeTrack.bind(this);
    this.updatePlaylistName.bind(this);
    this.savePlaylist.bind(this);
    this.search.bind(this);
    this.isTrackInPlaylist.bind(this);
  }

  addTrack(track) {
    if (!this.isTrackInPlaylist(track)) {
      this.setState({
        playlistTracks: this.state.playlistTracks.concat([track])
      });
    }
  }

  removeTrack(track) {
    if (this.isTrackInPlaylist(track)) {
      let tracklist = this.state.playlistTracks;
      let deleteIndex = this.state.playlistTracks.findIndex(playListTrack => playListTrack.id === track.id);
      tracklist.splice(deleteIndex, 1);

      this.setState({
        playlistTracks: tracklist
      });
    }
  }

  updatePlaylistName(playlistName) {
    this.setState({
      playlistName: playlistName
    });
  }

  savePlaylist() {
    let trackUris = this.state.playlistTracks.map(track => {

    });
  }

  search(searchTerm) {
    console.log(searchTerm);
  }

  isTrackInPlaylist(track) {
    let index = this.state.playlistTracks.findIndex(playListTrack => playListTrack.id === track.id);
    if (index !== -1) {
      return true;
    } else {
      return false;
    }
  }
  
  render() {
    return (
      <div>
        <h1>Ja<span class="highlight">mmm</span>ing</h1>
        <div class="App">
          <SearchBar onSearch={this.search} />
          <div class="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} onRemove={this.removeTrack} />
            <PlayList playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onNameChange={this.state.playlistName} onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;