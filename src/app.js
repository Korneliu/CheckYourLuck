import React from 'react'
import ReactDOM from 'react-dom'
import 'normalize.css/normalize.css'
import './styles/styles.scss'
//import { template } from 'babel-core'


class LuckCheckingApp extends React.Component {
  constructor(props) {
    super(props)
    this.resetAll = this.resetAll.bind(this)
    this.handleDeleteNotes = this.handleDeleteNotes.bind(this)
    this.generateRandomNumber = this.generateRandomNumber.bind(this)
    this.generateUserNumber = this.generateUserNumber.bind(this)
    this.handleAddNote = this.handleAddNote.bind(this)
    this.state = {
      title: 'Check Your Luck',
      subtitle: 'Let computer generate random number and see how many tries you need to get the same number',
      randomNumber: 0,
      userNumber: 0,
      notes: [],
      tryCount: 0,
    }
  }
  resetAll() {
    this.setState(() => {
      return {
        randomNumber: 0,
        userNumber: 0,
        tryCount: 0
      }
    })
  }

  generateRandomNumber() {
    this.setState(() => {
      return {
        randomNumber: Math.ceil(Math.random() * 10)
      }
    })
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
    this.setState(() => {
      return {
        notes: []
      }
    })
  }

  handleAddNote(e) {
    e.preventDefault()
    const note = e.target.elements.note.value.trim()
    this.state.notes.push(note)
    e.target.elements.note.value = ''
    console.log(this.state.notes)
    this.setState(() => {
      return {
        notes: this.state.notes
      }
    })
  }

  render() {
    return (
      <div>
        <Header title={this.state.title} subtitle={this.state.subtitle} />
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
        />
        <AddNote
          handleAddNote={this.handleAddNote}
          notes={this.state.notes}
        />
      </div>
    )
  }
}

class Header extends React.Component {
  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        <h3>{this.props.subtitle}</h3>
      </div>
    )
  }
}

class GenerateRandomNumber extends React.Component {
  render() {
    return (
      <div>
        <button onClick={this.props.resetAll}>RESET ALL</button>
        <h4>Generate random number</h4>
        <button onClick={this.props.generateRandomNumber}
          disabled={this.props.randomNumber}
        >Generate Random Number</button>
        <p>Number : {this.props.randomNumber}</p>
      </div>
    )
  }
}

class GenerateUserNumber extends React.Component {
  render() {
    return (
      <div>
        <h4>Generate User number</h4>
        <button onClick={this.props.generateUserNumber}
          disabled={!this.props.randomNumber}
        >Generate User Number</button>
        <p>Number : {this.props.userNumber}</p>
        <p>Try count : {this.props.tryCount}</p>
      </div>
    )
  }
}

class Notes extends React.Component {
  render() {
    return (
      <div>
        <button onClick={this.props.handleDeleteNotes}>Delete All Notes</button>
        <form>
          <h3>Reminder</h3>
          {this.props.notes.length === 0 ? <p>Add Note</p> : <p>Notes for today</p>}
          {
            this.props.notes.map((note) => <Note key={note} noteText={note} />)
          }
        </form>
      </div>
    )
  }
}

class Note extends React.Component {
  render() {
    return (
      <div>
        {this.props.noteText}
      </div>
    )
  }
}

class AddNote extends React.Component {
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


ReactDOM.render(<LuckCheckingApp />, document.getElementById('app'))