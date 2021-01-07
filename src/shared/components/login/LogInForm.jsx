import React, { PureComponent } from 'react';
import { Field, reduxForm, Form } from 'redux-form';
import { connect } from 'react-redux';
import EyeIcon from 'mdi-react/EyeIcon';
import KeyVariantIcon from 'mdi-react/KeyVariantIcon';
import AccountOutlineIcon from 'mdi-react/AccountOutlineIcon';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Alert, Button } from 'reactstrap';
import renderCheckBoxField from '../form/CheckBox';
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from '../../../config/firebase'


class LogInForm extends PureComponent {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    errorMessage: PropTypes.string,
    errorMsg: PropTypes.string,
    fieldUser: PropTypes.string,
    typeFieldUser: PropTypes.string,
    form: PropTypes.string.isRequired,
  };

  static defaultProps = {
    errorMessage: '',
    errorMsg: '',
    fieldUser: 'Username',
    typeFieldUser: 'text',
  }

  constructor() {
    super();
    this.state = {
      showPassword: false,
      username:'',
      password: "",
      userLoggedIn : false
    };
    this.handleChange = this.handleChange.bind(this);
    this.login   = this.login.bind(this);
    this.showPassword = this.showPassword.bind(this);
  }
   // Make login, onsubmit and handle change function function 
   login(e) {
    e.preventDefault()
    firebase.auth().signInWithEmailAndPassword(this.state.username,this.state.password).then(()=> {
      this.setState({userLoggedIn: true})
    setTimeout(()=>{ window.location.reload(true) } , 350)

      
    // return  <Redirect  to="/dashboard_default/" />
    setTimeout(()=>{ this.setState({userLoggedIn: false}) } , 1000)
  }).catch((err)=> console.log(err.message));
  }
  handleChange(e){
   this.setState({ [e.target.name] : e.target.value })
  }
    

  showPassword(e) {
    e.preventDefault();
    this.setState(prevState => ({ showPassword: !prevState.showPassword }));
  }
  
  render() {
    const {
      handleSubmit, errorMessage, errorMsg, fieldUser, typeFieldUser, form,
    } = this.props;
    const { showPassword,username,password,userLoggedIn } = this.state;
    console.log(userLoggedIn)
    return (
      <Form className="form login-form" onSubmit={handleSubmit}>
        <Alert
          color="danger"
          isOpen={!!errorMessage || !!errorMsg}
        >
          {errorMessage}
          {errorMsg}
        </Alert>
        <div className="form__form-group">
          <span className="form__form-group-label">{fieldUser}</span>
          <div className="form__form-group-field">
            <div className="form__form-group-icon">
              <AccountOutlineIcon />
            </div>
            <Field
              value = {username}
              name="username"
              component="input"
              type={typeFieldUser}
              placeholder={fieldUser}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="form__form-group">
          <span className="form__form-group-label">Password</span>
          <div className="form__form-group-field">
            <div className="form__form-group-icon">
              <KeyVariantIcon />
            </div>
            <Field
            value={password}
              name="password"
              component="input"
              type={showPassword ? 'text' : 'password'}
              onChange={this.handleChange}
              placeholder="Password"
            />
            <button
              type="button"
              className={`form__form-group-button${showPassword ? ' active' : ''}`}
              onClick={e => this.showPassword(e)}
            ><EyeIcon />
            </button>
            <div className="account__forgot-password">
              <a href="/">Forgot a password?</a>
            </div>
          </div>
        </div>
        <div className="form__form-group">
          <div className="form__form-group form__form-group-field">
            <Field
              name={`remember_me-${form}`}
              component={renderCheckBoxField}
              label="Remember me"
            />
          </div>
        </div>
        <div className="account__btns">

          {/* testing button */}
          
          {/* {userLoggedIn ? <Link className="account__btn btn btn-primary" to="/dashboard_default">
                  Sign In
                </Link> : <Button className="account__btn" onClick={this.login} color="primary">Sign In</Button> } */}
                
                {/* {userLoggedIn ? <Redirect  to="/dashboard_default/" /> : <Button className="account__btn" onClick={this.login} color="primary">Sign In</Button> } */}

                {userLoggedIn && <Redirect  to="/easydev/ui/alerts" />}
                <Button className="account__btn" onClick={this.login} color="primary">Sign In</Button>
          {/* {
            form === 'modal_login'
              ? <Button className="account__btn" onClick={this.login} submit="true" color="primary">Sign In</Button>
              : (
                <Link className="account__btn btn btn-primary" to="/dashboard_default">
                  Sign In
                </Link>
              )
          } */}

          <Link className="btn btn-outline-primary account__btn" to="/register">Create
            Account
          </Link>
        </div>
      </Form>
    );
  }
}

export default connect(state => ({
  errorMsg: state.user.error,
}))(reduxForm()(LogInForm));
