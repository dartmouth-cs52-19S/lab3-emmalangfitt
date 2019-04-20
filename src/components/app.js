import React, { Component } from 'react';
import Immutable from 'immutable';
import Createbar from './createbar';
import Note from './note';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: Immutable.Map(),
      noteID: 0,
    };

    this.onCreate = this.onCreate.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onDrag = this.onDrag.bind(this);
    this.updateContent = this.updateContent.bind(this);
  }

  onCreate(title) {
    const newNote = {
      id: this.state.noteID,
      title,
      content: '',
      x: 0,
      y: 0,
      zIndex: 0,
    };

    this.setState(prevState => ({
      notes: prevState.notes.set(prevState.noteID, newNote),
      noteID: prevState.noteID + 1,
    }));
  }

  onDelete(id) {
    this.setState(prevState => ({
      notes: prevState.notes.delete(id),
    }));
  }

  onDrag(id, x, y) {
    this.setState(prevState => ({
      notes: prevState.notes.update(id, (n) => { return Object.assign({}, n, { x, y }); }),
    }));
  }

  updateContent(id, content, title) {
    this.setState(prevState => ({
      notes: prevState.notes.update(id, (n) => { return Object.assign({}, n, { content, title }); }),
    }));
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
