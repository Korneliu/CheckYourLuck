import React from 'react'

import { AddNote } from './AddNote'
import { Notes } from './Notes'
import { GenerateUserNumber } from './GenerateUserNumber';
import { GenerateRandomNumber } from './GenerateRandomNumber.js';
import { Header } from './Header'

class LuckCheckingApp extends React.Component {
  state = {
    subtitle: 'Let computer generate random number and see how many tries you need to get the same number',
    randomNumber: 0,
    userNumber: 0,
    notes: [],
    tryCount: 0,
  }

  resetAll = () => {
    this.setState(() => ({
      randomNumber: 0,
      userNumber: 0,
      tryCount: 0
    })
    )
  }

  generateRandomNumber = () => {
    this.setState(() => ({ randomNumber: Math.ceil(Math.random() * 10) }))
  }

  generateUserNumber = () => {
    if (this.state.randomNumber === this.state.userNumber) {
      return alert('bingo')
    } else {
      this.setState((prevState) => {
        return {
          userNumber: Math.ceil(Math.random() * 10),
          tryCount: prevState.tryCount + 1,
        }
      })
    }
  }

  handleDeleteNotes = () => {
    this.setState(() => ({ notes: [] }))
  }

  handleAddNote = (e) => {
    e.preventDefault();
    const note = e.target.elements.note.value.trim();
    if (!note) {
      alert('Enter valid value to add note!');
    } else if (this.state.notes.indexOf(note) > -1) {
      e.target.elements.note.value = '';
      alert('This note already exists');
    } else {
      this.state.notes.push(note);
      e.target.elements.note.value = '';
      this.setState(() => ({ notes: this.state.notes }));
    }
  }

  handleDeleteNote = (noteToRemove) => {
    this.setState((prevState) => ({
      notes: prevState.notes.filter((note) => {
        return noteToRemove !== note
      })
    }))
  }

  componentDidMount() {
    try {
      const json = localStorage.getItem('notes')
      const notes = JSON.parse(json);
      if (notes) {
        this.setState(() => ({ notes }))
      }
    } catch (e) {
    }
  }

  /*   componentDidUpdate(prevProps, prevState) {
    if (prevState.notes.length !== state.notes.length) {
      const json = JSON.stringify(this.state.notes)
      localStorage.setItem('notes', json)
    }
  } */

  componentDidUpdate(prevProps, prevState) {
    console.log(prevState.notes.length)
    const json = JSON.stringify(this.state.notes)
    localStorage.setItem('notes', json)
  }


  render() {
    return (
      <div>
        <Header subtitle={this.state.subtitle} />
        <GenerateRandomNumber
          resetAll={this.resetAll}
          generateRandomNumber={this.generateRandomNumber}
          randomNumber={this.state.randomNumber}
        />
        <GenerateUserNumber
          generateUserNumber={this.generateUserNumber}
          userNumber={this.state.userNumber}
          randomNumber={this.state.randomNumber}
          tryCount={this.state.tryCount}
        />
        <Notes
          notes={this.state.notes}
          handleDeleteNotes={this.handleDeleteNotes}
          handleDeleteNote={this.handleDeleteNote}
        />
        <AddNote
          handleAddNote={this.handleAddNote}
        />

      </div>
    )
  }
}

export { LuckCheckingApp }