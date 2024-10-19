import React, { useContext } from 'react';
import './Login.css';
import firebaseConfig from './fbaseinfo';
import googleIcon from '../../imgs/icons8-google-96.png';
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import firebase from 'firebase/compat/app';
import { UserContext } from '../../App';
import { initializeApp } from 'firebase/app';

// firebase.initializeApp(firebaseConfig);

const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

const auth = getAuth();
const Login = () => {
    const [loginEmail, setLoginEmail, decodedToken, isExpired, isDonor, setIsDonor, user, setUser] = useContext(UserContext);
    const handleClick = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const user = result.user;
                setLoginEmail(user.email);
                setIsDonor(false);
                // console.log(user.email);
                localStorage.setItem('token',credential.idToken);
                
            }).catch((error) => {
                console.log(error);
                
            });

    }

    return (
        <div className='logindiv'>
            <button className='loginbtn ' onClick={handleClick}>
                <img src={googleIcon} alt="google" style={{ width: "36px" }} /> <span className='text'>Sign In</span>
            </button>
        </div>
    );
};

export default Login;