import React, { Component } from 'react';
import Draggable from 'react-draggable';
import marked from 'marked';
import TextareaAutosize from 'react-textarea-autosize';


class Note extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      content: this.props.note.content,
      title: this.props.note.title,
    };


    this.onDelete = this.onDelete.bind(this);
    this.onDrag = this.onDrag.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onContentChange = this.onContentChange.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
  }

  onDelete() {
    this.props.onDelete(this.props.id);
  }

  onDrag(e, ui) {
    this.props.onDrag(this.props.id, ui.x, ui.y);
  }

  onEdit() {
    if (this.state.isEditing) {
      this.props.updateContent(this.props.id, this.state.content, this.state.title);
    }

    this.setState(prevState => ({
      isEditing: !prevState.isEditing,
    }));
  }

  onContentChange(event) {
    this.setState({ content: event.target.value });
  }

  onTitleChange(event) {
    this.setState({ title: event.target.value });
  }

  renderContents() {
    if (this.state.isEditing) {
      return (
        <div id="editing">
          {/* https://github.com/atlassian/react-beautiful-dnd/issues/110 */}
          <input defaultValue={this.props.note.title}
            onMouseDown={e => e.stopPropagation()}
            value={this.state.title}
            onChange={this.onTitleChange}
          />
          <TextareaAutosize defaultValue={this.props.note.content}
            onMouseDown={e => e.stopPropagation()}
            value={this.state.content}
            onChange={this.onContentChange}
          />
        </div>
      );
    } else {
      return <div className="content" dangerouslySetInnerHTML={{ __html: marked(this.props.note.content || '') }} />;
    }
  }

  renderIcon() {
    if (this.state.isEditing) {
      return <i onClick={this.onEdit} className="fas fa-check" />;
    } else {
      return <i onClick={this.onEdit} className="fas fa-edit" />;
    }
  }

  render() {
    return (
      <Draggable
        onStop={this.onDrag}
        position={{ x: this.props.note.x, y: this.props.note.y }}
      >
        <div>
          <div id="note-header">
            <h1>{this.props.note.title}</h1>
            <div id="icons">
              {/* eslint-disable-next-line react/no-unknown-property */}
              <i onClick={this.onDelete} class="fas fa-trash" />
              {/* eslint-disable-next-line react/no-unknown-property */}
              {this.renderIcon()}
            </div>
          </div>
          {this.renderContents()}
        </div>
      </Draggable>
    );
  }
}


export default Note;
