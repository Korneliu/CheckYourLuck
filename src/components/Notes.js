import React from 'react'
import { Note } from './Note'

const Notes = (props) => (
  <div>
    <button onClick={props.handleDeleteNotes}>Remove All Notes</button>
    <form>
      <h3>Reminder</h3>
      {props.notes.length === 0 ? <p>Add Note</p> : <p>Notes for today</p>}
      {
        props.notes.map((note) =>
          <Note
            key={note}
            noteText={note}
            handleDeleteNote={props.handleDeleteNote}
          />)
      }
    </form>
  </div>
)


export { Notes }