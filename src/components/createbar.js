import React, { Component } from 'react';


class Createbar extends Component {
  constructor(props) {
    super(props);

    this.state = { title: '' };
    this.onCreate = this.onCreate.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(event) {
    this.setState({ title: event.target.value });
  }

  onCreate() {
    this.props.onCreate(this.state.title);
  }

  render() {
    return (
      <div id="createbar">
        <input value={this.state.title} onChange={this.onInputChange} />
        <button type="submit" onClick={this.onCreate}>Create</button>
      </div>
    );
  }
}


export default Createbar;
