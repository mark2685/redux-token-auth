import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signIn } from './actions/sign-in'
import { signOut } from './actions/sign-out'
import { authRequest } from './actions/auth-action'
import './App.css'
import logo from './logo.svg'

class LoginButton extends Component {
  submit () {
    const credentials = {
      email: 'mark2685@gmail.com',
      password: 'Testpass1'
    }

    this.props.signIn(credentials)
  }
  render () {
    return (<button type='submit' onClick={this.submit.bind(this)}>Log In</button>)
  }
}

class TestAuthButton extends Component {
  submit () {
    this.props.authRequest()
  }
  render () {
    return (<button type='submit' onClick={this.submit.bind(this)}>Test authentication</button>)
  }
}

class LogoutButton extends Component {
  submit () {
    this.props.signOut()
  }
  render () {
    return (<button type='submit' onClick={this.submit.bind(this)}>Log Out</button>)
  }
}

class App extends Component {
  render () {
    let authStateButton

    if (this.props.auth.valid) {
      authStateButton = (
        <div>
          <LogoutButton signOut={this.props.signOut} />
          <TestAuthButton authRequest={this.props.authRequest} />
        </div>
      )
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
    signIn: data => dispatch(signIn(data)),
    signOut: () => dispatch(signOut()),
    authRequest: () => dispatch(authRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
