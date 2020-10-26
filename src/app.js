import React from 'react'
import ReactDOM from 'react-dom'
import 'normalize.css/normalize.css'
import './styles/styles.scss'
//import { template } from 'babel-core'



class LuckCheckingApp extends React.Component {
  render() {
    const title = 'Check Your Luck';
    const subtitle = 'Let computer generate random number and see how many tries you need to get the same number';
    const notes = ['one', 'two', 'three'];
    let number = 0;
    let luckyNumber = 0;
    let tryCounts = 0;


    return (
      <div>
        <Header title={title} subtitle={subtitle} />
        <GenerateNumber number={number} />
        <Notes notes={notes} />
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
  constructor(props) {
    super(props);
    this.generateNumber = this.generateNumber.bind(this)
  }
  generateNumber = () => {
    this.props.number = Math.ceil(Math.random() * 10)
  }
  render() {
    return (
      <div>
        <h4>Generate random number</h4>
        <button onClick={this.generateNumber}>Generate Random Number</button>
        <p>Number : {this.props.number}</p>
      </div>
    )
  }
}

class Notes extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddNotes = this.handleAddNotes.bind(this)
  }
  handleAddNotes = (e) => {
    e.preventDefault()
    const option = e.target.elements.option.value.trim()
    if (option) {
      this.props.notes.push(option)
      e.target.elements.option.value = ''
      console.log(option)
    }
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleAddNotes}>
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

class Note extends React.Component {
  onFormSubmit = (e) => {
    e.preventDefault()
    const option = e.target.elements.option.value;
    if (option) {
      this.props.notes.push(option)
      e.target.elements.option.value = ''
    }
  }
  render() {
    return (
      <div>

      </div>
    )
  }
}



let number = 0
let luckyNumber = 0

const generateNumber = () => {
  number = Math.ceil(Math.random() * 10)
  renderCheckYourLuck()
}

const generateLuckyNumber = () => {
  luckyNumber = Math.ceil(Math.random() * 10)
  app.tryCounts++
  if (number === luckyNumber) {
    alert(`BINGO you were able to generate random number on ${app.tryCounts} try!!!`)
  }
  renderCheckYourLuck()
}


const startOverButton = () => {
  number = 0
  luckyNumber = 0
  app.notes = []
  app.tryCounts = 0
  renderCheckYourLuck()
}

const renderCheckYourLuck = () => {
  const template = (
    <div>
      <p>Click button to see how quick you will get the same number</p>
      <button onClick={generateLuckyNumber}>Try your luck</button>
      <p>Lucky number : {luckyNumber} Try count : {app.tryCounts}</p>
      <button onClick={startOverButton}>START OVER</button>
      <form onSubmit={onFormSubmit}>
        <h3>Reminder</h3>
        {app.notes.length === 0 ? <p>Add Note</p> : <p>Notes for today</p>}
        <ul>
          {app.notes.map((option) => <li key={option}><p>{option}</p></li>)}
        </ul>
        <input type="text" name="option" placeholder="type note" />
        <button>Submit</button>
      </form>
    </div>
  )
  ReactDOM.render(template, document.getElementById('app'))
}



ReactDOM.render(<LuckCheckingApp />, document.getElementById('app'))
