import React from 'react'
import ReactDOM from 'react-dom'
import 'normalize.css/normalize.css'
import './styles/styles.scss'
//import { template } from 'babel-core'

const app = {
  title: 'Check Your Luck',
  options: [],
  tryCounts: []
}

let number = 0
let luckyNumber = 0

const generateNumber = () => {
  number = Math.ceil(Math.random() * 10)
  renderCheckYourLuck()
}

const generateLuckyNumber = () => {
  luckyNumber = Math.floor(Math.random() * 11)
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
  renderCheckYourLuck()
}


const renderCheckYourLuck = () => {
  const template = (
    <div>
      <h1>{app.title}</h1>
      <h3>Generate random number</h3>
      <button onClick={generateNumber}>Generate</button>
      <p>Number : {number}</p>
      <p>Try generate same numbers</p>
      <button onClick={generateLuckyNumber}>Try your luck</button>
      <p>Lucky number : {luckyNumber}</p>
      <form onSubmit={onFormSubmit}>
        <h3>Reminder</h3>
        <p>Note for today</p>
        <input type="text" name="option" placeholder="type note" />
        <button>Submit</button>
      </form>
      <button onClick={startOverButton}>START OVER</button>
    </div>
  )
  ReactDOM.render(template, document.getElementById('app'))
}

renderCheckYourLuck()
