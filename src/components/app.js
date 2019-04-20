import React, { Component } from 'react';
import Immutable from 'immutable';
import Createbar from './createbar';
import Note from './note';
import * as db from '../services/database';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // eslint-disable-next-line new-cap
      notes: Immutable.Map(),
    };

    this.onCreate = this.onCreate.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onDrag = this.onDrag.bind(this);
    this.updateContent = this.updateContent.bind(this);
  }

  componentDidMount() {
    db.fetchNotes((notes) => {
      // eslint-disable-next-line new-cap
      this.setState({ notes: Immutable.Map(notes) });
    });
  }

  // eslint-disable-next-line class-methods-use-this
  onCreate(title) {
    const newNote = {
      title,
      content: '',
      x: 10,
      y: 10,
      zIndex: 0,
    };

    db.addNote(newNote);
  }

  // eslint-disable-next-line class-methods-use-this
  onDelete(id) {
    db.deleteNote(id);
  }

  // eslint-disable-next-line class-methods-use-this
  onDrag(id, x, y) {
    db.updatePosition(id, x, y);
  }

  // eslint-disable-next-line class-methods-use-this
  updateContent(id, content, title) {
    db.updateContent(id, content, title);
  }

  render() {
    return (
      <div>
        <div id="topbar">
          <h2>My Notes</h2>
          <Createbar onCreate={this.onCreate} />
        </div>
        <div>
          {this.state.notes.entrySeq().map(([id, note]) => {
            return (
              <Note
                id={id}
                note={note}
                onDelete={this.onDelete}
                onDrag={this.onDrag}
                updateContent={this.updateContent}
              />
            );
          })}
        </div>
      </div>
    );
  }
}


export default App;
