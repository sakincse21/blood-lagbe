import React, { useState } from 'react';
import donateImg from '../../imgs/Blood donation-amico.png';
import { Link, Route, Routes } from 'react-router-dom';
import '/node_modules/bootstrap/dist/css/bootstrap.css';
import './Home.css';
import HomeInfo from './HomeInfo';
import FindBlood from '../FindBlood/FindBlood';
import DonorCard from '../DonorCard/DonorCard';

const Home = () => {
    const [donors, setDonors] = useState([]);
    const [btnclick, setBtnclick] = useState(false);

    return (
        <div className="d-flex flex-column">
            <div className='my-5 mx-1 d-flex row Home'>
                <div className="col-lg-6 d-flex flex-column justify-content-center align-items-center p-5">
                    <Routes>
                        <Route path='/FindBlood' element={<FindBlood setter={[donors, setDonors, setBtnclick]}></FindBlood>} />
                        <Route Component={HomeInfo} path='/' />
                        <Route Component={HomeInfo} path='/*' />
                    </Routes>
                </div>
                <div className="col-lg-6 d-flex justify-content-center align-items-center p-5 donorimg">
                    <img src={donateImg} alt="donate"  />
                </div>
            </div>
            <div>
                <Routes>
                    <Route path='/FindBlood' element={
                        <div className=" d-flex flex-row flex-wrap gap-4 justify-content-center align-items-center">
                            {
                                donors.map(donor =>
                                    (<DonorCard details={[donor.name, donor.area, donor.bloodGroup, donor.mobile, donor.date]} key={donor.id} />)
                                )
                            }
                        </div>
                    } />
                </Routes>
            </div>
        </div>
    );
};

export default Home;