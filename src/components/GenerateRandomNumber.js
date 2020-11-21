import React from 'react'

class GenerateRandomNumber extends React.Component {
  render() {
    return (
      <div>
        <button onClick={this.props.resetAll}>RESET ALL NUMBERS</button>
        <h4>Generate random number</h4>
        <button onClick={this.props.generateRandomNumber}
          disabled={this.props.randomNumber}
        >Generate Random Number</button>
        <p>Number : {this.props.randomNumber}</p>
      </div>
    )
  }
}

export { GenerateRandomNumber }