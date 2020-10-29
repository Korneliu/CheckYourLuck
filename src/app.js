import React from 'react'
import ReactDOM from 'react-dom'
import 'normalize.css/normalize.css'
import './styles/styles.scss'
//import { template } from 'babel-core'


class LuckCheckingApp extends React.Component {
  constructor(props) {
    super(props)
    this.handleDeleteNotes = this.handleDeleteNotes.bind(this)
    this.generateRandomNumber = this.generateRandomNumber.bind(this)
    this.state = {
      title: 'Check Your Luck',
      subtitle: 'Let computer generate random number and see how many tries you need to get the same number',
      number: 0,
      notes: ['one'],
      tryCount: 0
    }
  }
  generateRandomNumber() {
    this.setState((prevState) => {
      return {
        tryCount: prevState.tryCount + 1,
        number: Math.ceil(Math.random() * 10)

      }
    })
  }

  handleDeleteNotes() {
    this.setState(() => {
      return {
        notes: []
      }
    })
  }
  render() {
    return (
      <div>
        <Header title={this.state.title} subtitle={this.state.subtitle} />
        <GenerateNumber
          generateRandomNumber={this.generateRandomNumber}
          number={this.state.number}
          tryCount={this.state.tryCount} />
        <Notes
          notes={this.state.notes}
          handleDeleteNotes={this.handleDeleteNotes}
          handleAddNote={this.handleAddNote}
        />
        <AddNote
          handleAddNotes={this.handleAddNote}
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

class GenerateNumber extends React.Component {
  render() {
    return (
      <div>
        <h4>Generate random number</h4>
        <button onClick={this.props.generateRandomNumber}>Generate Random Number</button>
        <p>Number : {this.props.number}</p>
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
        <form onSubmit={this.props.handleAddNote}>
          <h3>Reminder</h3>
          {this.props.notes.length === 0 ? <p>Add Note</p> : <p>Notes for today</p>}
          <ul>
            {this.props.notes.map((note) => <li key={note}><p>{note}</p></li>)}
          </ul>
          <input type="text" name="option" placeholder="type note" />
          <button>Submit</button>
        </form>
      </div>
    )
  }
}



class AddNote extends React.Component {
  constructor(props) {
    super(props)
    this.handleAddNote = this.handleAddNote.bind(this)
  }
  handleAddNote(e) {
    e.prevent.defaul()
    const note = e.target.elements.note.value.trim()
    if (note) {
      this.props.handleAddNote(note)
    }
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleAddNote}>
          <input type="text" name="note" />
          <button>ADD NOTE</button>
        </form>
      </div>
    )
  }
}




ReactDOM.render(<LuckCheckingApp />, document.getElementById('app'))