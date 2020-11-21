import React from 'react'
import ReactDOM from 'react-dom'
import 'normalize.css/normalize.css'
import './styles/styles.scss'
import AddNote from './components/AddNote'
import { Notes } from './components/Notes'
import { GenerateUserNumber } from './components/GenerateUserNumber';
import { GenerateRandomNumber } from './components/GenerateRandomNumber.js';



class LuckCheckingApp extends React.Component {
  constructor(props) {
    super(props)
    this.resetAll = this.resetAll.bind(this);
    this.handleDeleteNotes = this.handleDeleteNotes.bind(this);
    this.generateRandomNumber = this.generateRandomNumber.bind(this);
    this.generateUserNumber = this.generateUserNumber.bind(this);
    this.handleAddNote = this.handleAddNote.bind(this);
    this.handleDeleteNote = this.handleDeleteNote.bind(this);
    this.state = {
      subtitle: 'Let computer generate random number and see how many tries you need to get the same number',
      randomNumber: 0,
      userNumber: 0,
      notes: [],
      tryCount: 0,
    }
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


  componentDidUpdate(prevProps, prevState) {
    const json = JSON.stringify(this.state.notes)
    localStorage.setItem('notes', json)
  }

  resetAll() {
    this.setState(() => ({
      randomNumber: 0,
      userNumber: 0,
      tryCount: 0
    })
    )
  }

  generateRandomNumber() {
    this.setState(() => ({ randomNumber: Math.ceil(Math.random() * 10) }))
  }

  generateUserNumber() {
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

  handleDeleteNotes() {
    this.setState(() => ({ notes: [] }))
  }

  handleAddNote(e) {
    e.preventDefault()
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

  handleDeleteNote(noteToRemove) {
    this.setState((prevState) => ({
      notes: prevState.notes.filter((note) => {
        return noteToRemove !== note
      })
    }))
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

const Header = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
      <h3>{props.subtitle}</h3>
    </div>
  )
}

Header.defaultProps = {
  title: 'Check Your Luck'
}



ReactDOM.render(<LuckCheckingApp />, document.getElementById('app'))