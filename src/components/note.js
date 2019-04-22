import React, { Component } from 'react';
import DraggableCore from 'react-draggable';
import marked from 'marked';
import TextareaAutosize from 'react-textarea-autosize';


class Note extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      isShowing: true,
      content: this.props.note.content,
      title: this.props.note.title,
    };

    this.onDelete = this.onDelete.bind(this);
    this.onDrag = this.onDrag.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onDropClick = this.onDropClick.bind(this);
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

  onDropClick() {
    this.setState(prevState => ({
      isShowing: !prevState.isShowing,
    }));
  }

  renderContents() {
    if (this.state.isShowing && this.state.isEditing) {
      return (
        <div id="editing">
          <TextareaAutosize defaultValue={this.props.note.content}
            onMouseDown={e => e.stopPropagation()}
            value={this.state.content}
            onChange={this.onContentChange}
          />
        </div>
      );
    } else if (this.state.isShowing && !this.state.isEditing) {
      return <div className="content" dangerouslySetInnerHTML={{ __html: marked(this.props.note.content || '') }} />;
    } else {
      return <div />;
    }
  }

  renderDropdown() {
    if (this.state.isShowing) {
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      return <i onClick={this.onDropClick} className="fas fa-chevron-down" />;
    } else {
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      return <i onClick={this.onDropClick} className="fas fa-chevron-up" />;
    }
  }

  renderHeader() {
    if (this.state.isEditing) {
      return (
        <div id="note-header">
          {/* https://github.com/atlassian/react-beautiful-dnd/issues/110 */}
          <input defaultValue={this.props.note.title}
            onMouseDown={e => e.stopPropagation()}
            value={this.state.title}
            onChange={this.onTitleChange}
          />
          <div id="icons">
            {/* eslint-disable-next-line react/no-unknown-property */}
            {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
            <i onClick={this.onDelete} className="fas fa-trash" />
            {/* eslint-disable-next-line react/no-unknown-property */}
            {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
            <i onClick={this.onEdit} className="fas fa-check" />
            {this.renderDropdown()}
          </div>
        </div>
      );
    } else {
      return (
        <div id="note-header">
          <h4>{this.props.note.title}</h4>
          <div id="icons">
            {/* eslint-disable-next-line react/no-unknown-property */}
            {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
            <i onClick={this.onDelete} className="fas fa-trash" />
            {/* eslint-disable-next-line react/no-unknown-property */}
            {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
            <i onClick={this.onEdit} className="fas fa-edit" />
            {this.renderDropdown()}
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <DraggableCore
        onStart={this.onDrag}
        onStop={this.onDrag}
        position={{ x: this.props.note.x, y: this.props.note.y }}
      >
        <div style={{ zIndex: this.props.note.z }}>
          {this.renderHeader()}
          {this.renderContents()}
        </div>
      </DraggableCore>
    );
  }
}


export default Note;
