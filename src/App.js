import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import logo from './logo.svg'

import { signIn } from './actions/sign-in'
import './App.css'

class LoginButton extends Component {
  submit () {
    const credentials = {
      "email": "sample string 1",
      "password": "sample string 2"
    }

    this.props.signIn(credentials)
  }
  render () {
    return (<button type="submit" onClick={this.submit.bind(this)}>Log In</button>)
  }
}

class LogoutButton extends Component {
  submit () {
    this.props.signOut()
  }
  render () {
    return (<button type="submit" onClick={this.submit.bind(this)}>Log Out</button>)
  }
}

class App extends Component {
  render () {
    let authStateButton

    console.log(this.props)

    if (this.props.auth.valid) {
      authStateButton = <LogoutButton signOut={this.props.signOut} />
    } else {
      authStateButton = <LoginButton signIn={this.props.signIn} />
    }

    return (
      <div className='App'>
        <div className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h2>Redux Token Authentication</h2>
        </div>
        <p className='App-intro'>Token authentication system that supports refresh tokens.</p>
        {authStateButton}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { auth: state.authenticate }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: bindActionCreators(signIn, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
