import React, { Component } from 'react';
import SignupForm from './Components/SignupForm';
import { registerUser } from './state/actions/reduxTokenAuthConfig';
import { connect } from 'react-redux';
import { Button, 
         Container,
         Grid  } from 'semantic-ui-react';

class App extends Component {
  state = {
    renderSignupForm: false,
    email: '',
    password: '',
    password_confirmation: '',
    nickname: '',
    name: '',
    city: '',
    country: 'Sweden'
  }

  renderSignup = () => {
    this.setState({
      renderSignupForm: !this.state.renderSignupForm
    })
  }

  inputChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSignup = () => {
    const { registerUser } = this.props;
    const { email, name, nickname, password, password_confirmation, city, country } = this.state;
    registerUser({ email, name, nickname, password, password_confirmation, city, country })
      .then(
        console.log('yiihaaaa')
      )
      .catch(error => {
        console.log(error)
      })
  }
  
  render() {
    let signupForm
    let welcomeMessage

    if (this.props.currentUser.isSignedIn) {
      welcomeMessage = <p id="welcome-message">Hello {this.props.currentUser.attributes.name}</p>
    } else {
      if (this.state.renderSignupForm) {
        signupForm = (
          <div>
            <SignupForm
              inputChangeHandler = {this.inputChangeHandler}
              handleSignup={this.handleSignup}
              renderSignup={this.renderSignup}
            />
          </div>
        )
      } else {
        signupForm = (
          <div>
            <Button id="signup-button" onClick={ this.renderSignup }>Sign Up</Button>
          </div>
        )
      }
    }

    return (
      <Container>
        <Grid centered columns={1}>
          <Grid.Column>
            <div>
              { signupForm }
              { welcomeMessage }
            </div>
          </Grid.Column>
        </Grid>   
      </Container>  
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.reduxTokenAuth.currentUser
  }
}

const mapDispatchToProps = {
  registerUser
}

export default connect(
  mapStateToProps,  
  mapDispatchToProps
)(App);
