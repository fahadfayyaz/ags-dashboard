import React,{useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import FirebaseIcon from 'mdi-react/FirebaseIcon';
import withAuthFirebase from '../auth/withAuthFirebase';
import { useAuth0 } from '../auth/withAuth0';
import Loading from '../Loading';
import LogInForm from './LogInForm';
import GoogleAuthBtn from '../../../containers/Account/AuthBtn/googleAuthBtn';
import FacebookAuthBtn from '../../../containers/Account/AuthBtn/fbAuthBtn';

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from '../../../config/firebase'
// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";

// Firebase Config
// For Firebase JS SDK v7.20.0 and later, measurementId is optional




const auth0Icon = `${process.env.PUBLIC_URL}/img/auth0.svg`;
const LoginCard = ({ changeIsOpenModalFireBase }) => {
  


  const {
    loginWithRedirect, loading,
  } = useAuth0();
  if (loading) {
    return (<Loading loading={loading} />);
  }
  // Make a method to check the authenticity, and also make state to check whether User is here or not
      const [user,setUser] = useState(null);
      // const [email,setEmail] =useState(null);
      // const [password,setPassword] =useState(null);

      function authListener(){
        firebase.auth().onAuthStateChanged((us)=> {
          if(us){
            setUser(us)
          }
          else{ 
            setUser(null) 
          }
        })
      }
        // Use effect for authentication 
        useEffect(() => authListener(),[])
     

  return (
    <div className="account__wrapper">
      <div className="account__card">
        <div className="account__head">
          <h3 className="account__title">Welcome to
            <span className="account__logo"> Easy
              <span className="account__logo-accent">DEV</span>
            </span>
          </h3>
          <h4 className="account__subhead subhead">Start your business easily</h4>
        </div>
        {/* to show the message whether it is logged in or not */}
        {user ? <h1> User Logged in </h1> : <h1> User not Logged in </h1> }
        
        <LogInForm
          onSubmin
          form="log_in_form"
        />
        <div className="account__or">
          <p>Or Easily Using</p>
        </div>
        <div className="account__social">
          <FacebookAuthBtn />
          <GoogleAuthBtn />
          <Button
            className="account__social-btn account__social-btn--firebase"
            onClick={changeIsOpenModalFireBase}
          ><FirebaseIcon />
          </Button>
          <Button className="account__social-btn account__social-btn--auth0" onClick={() => loginWithRedirect({})}>
            <img className="customizer__btn-icon" src={auth0Icon} alt="icon" />
          </Button>
        </div>
      </div>
    </div>
  );
};

LoginCard.propTypes = {
  changeIsOpenModalFireBase: PropTypes.func.isRequired,
};

export default withAuthFirebase(LoginCard);
