import React from 'react'
import ReactDOM from 'react-dom'
import 'normalize.css/normalize.css'
import './styles/styles.scss'

import { LuckCheckingApp } from './components/LuckCheckingApp'




ReactDOM.render(<LuckCheckingApp />, document.getElementById('app'))

class OldSyntax {
  constructor() {
    this.name = 'Majk'
  }
}
const oldSyntax = new OldSyntax()

console.log(oldSyntax)

// _____________________

class NewSyntax {
  name = 'Max';
}
const newSyntax = new NewSyntax()
console.log(newSyntax)