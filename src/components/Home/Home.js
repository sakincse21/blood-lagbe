import React from 'react';
import donateImg from '../../imgs/Blood donation-amico.png';
import { Link, Route, Routes } from 'react-router-dom';
import '/node_modules/bootstrap/dist/css/bootstrap.css';
import './Home.css';
import HomeInfo from './HomeInfo';
import FindBlood from '../FindBlood/FindBlood';

const Home = () => {
    return (
        <div className='my-5 mx-1 d-flex row Home'>
            <div className="col-lg-6 d-flex flex-column justify-content-center align-items-center p-5">
                <Routes>
                    <Route Component={FindBlood} path='/FindBlood' />
                    <Route Component={HomeInfo} path='/' />
                    <Route Component={HomeInfo} path='/*' />
                </Routes>
            </div>
            <div className="col-lg-6 d-flex justify-content-center align-items-center p-5">
                <img src={donateImg} alt="donate" />
            </div>
        </div>
    );
};

export default Home;