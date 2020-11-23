import React from 'react'

const Note = (props) => {
  return (
    <div>
      {props.noteText}
      <button
        onClick={() => {
          props.handleDeleteNote(props.noteText);
        }}
      >Delete</button>
    </div>
  )
}

export { Note }

