import React, { Component } from 'react';
import Draggable from 'react-draggable';


class Note extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
    };


    this.onDelete = this.onDelete.bind(this);
    this.onDrag = this.onDrag.bind(this);
    this.onEdit = this.onEdit.bind(this);
  }

  onDelete() {
    this.props.onDelete(this.props.id);
  }

  onDrag(e, ui) {
    this.props.onDrag(this.props.id, ui.x, ui.y);
  }

  onEdit() {
    this.setState(prevState => ({
      isEditing: !prevState.isEditing,
    }));
  }


  renderContents() {
    if (this.state.isEditing) {
      return <div>editing!</div>;
    } else {
      return <div>{this.props.note.contents}</div>;
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
        onDrag={this.onDrag}
      >
        <div>
          <div>
            {this.props.note.title}
            {/* eslint-disable-next-line react/no-unknown-property */}
            <i onClick={this.onDelete} class="fas fa-trash" />
            {/* eslint-disable-next-line react/no-unknown-property */}
            {this.renderIcon()}
          </div>
          <div>
            {this.renderContents()}
          </div>
        </div>
      </Draggable>
    );
  }
}


export default Note;
