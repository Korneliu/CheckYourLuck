import React from 'react';


export default class AddNote extends React.Component {
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleAddNote}>
          <input type="text" name="note" />
          <button>ADD NOTE</button>
        </form>
      </div>
    )
  }
}



