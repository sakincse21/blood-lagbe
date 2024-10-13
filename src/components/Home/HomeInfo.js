import React from 'react';
import { Link } from 'react-router-dom';

const HomeInfo = () => {
    return (
        <div className='d-flex flex-column justify-content-center align-items-center p-3'>
            <h1 className=' fw-bold'>Give the Gift of life</h1>
            <p className='lightertxt'>Your donation can save up to three lives. <br /> Join our community of heroes and make a difference today.</p>
            <div className="buttons d-flex flex-row justify-content-center">
                <Link to={'/BecomeDonor'}><button className='donorbtn '>Be A Donor</button></Link>
                <Link to={'/FindBlood'}><button className='findbtn'>Find Blood</button></Link>
            </div>
        </div>
    );
};

export default HomeInfo;