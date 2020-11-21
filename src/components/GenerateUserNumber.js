import React from 'react'

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

export { GenerateUserNumber }