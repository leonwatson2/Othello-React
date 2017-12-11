import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'

export default class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <div className="social-icons">
          <a target="_blank"
              href="https://github.com/vlw0052/Othello-React"
              rel="noopener noreferrer">
            <FontAwesome 
              name="github"
              size="3x"
              />
          </a>
          <a target="_blank"
              href="https://twitter.com/_leonwatson2"
              rel="noopener noreferrer">
            <FontAwesome 
              name="twitter"
              size="3x"
            />
          </a>
        </div>
        <div className="creator">Developed By: Leon Watson</div>
      </div>
    )
  }
}
