import React from 'react'
import ReactDOM from 'react-dom'
import 'normalize.css/normalize.css'
import './styles/styles.scss'
//import { template } from 'babel-core'

const app = {
  title: 'Check Your Luck',
  options: [],
  tryCounts: 0
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
  renderCheckYourLuck()
}

const onFormSubmit = (e) => {
  e.preventDefault()
  const option = e.target.elements.option.value;
  if (option) {
    app.options.push(option)
    e.target.elements.option.value = ''
    renderCheckYourLuck()
    console.log(app.options)
  }
}

const startOverButton = () => {
  number = 0
  luckyNumber = 0
  app.options = []
  renderCheckYourLuck()
}

const renderCheckYourLuck = () => {
  const template = (
    <div>
      <h1>{app.title}</h1>
      <h3>Generate random number</h3>
      <button onClick={generateNumber}>Generate Random Number</button>
      <p>Number : {number}</p>
      <p>Click button to see how quick you will get the same number</p>
      <button onClick={generateLuckyNumber}>Try your luck</button>
      <p>Lucky number : {luckyNumber} Try count : {app.tryCounts}</p>
      <button onClick={startOverButton}>START OVER</button>
      <form onSubmit={onFormSubmit}>
        <h3>Reminder</h3>
        {app.options.length === 0 ? <p>Add Note</p> : <p>Notes for today</p>}
        <ul>
          {app.options.map((option) => <li key={option}><p>{option}</p></li>)}
        </ul>
        <input type="text" name="option" placeholder="type note" />
        <button>Submit</button>
      </form>
    </div>
  )
  ReactDOM.render(template, document.getElementById('app'))
}

renderCheckYourLuck()
