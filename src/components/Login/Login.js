import React from 'react';
import firebaseConfig from './fbaseinfo';
import googleIcon from '../../imgs/icons8-google-96.png';
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import firebase from 'firebase/compat/app';

firebase.initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

const auth = getAuth();
const Login = (props) => {
    const setLoginEmail=props.setLoginEmail;
    const handleClick = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.idToken;
                sessionStorage.setItem('token',token);
                const user = result.user;
                setLoginEmail(user.email);
                console.log(user.email);
                
            }).catch((error) => {
                console.log(error);
                
            });

    }

    return (
        <div>
            <button className='btn btn-primary' onClick={handleClick}>
                <img src={googleIcon} alt="google" style={{ width: "48px" }} /> <span>Sign In</span>
            </button>
        </div>
    );
};

export default Login;