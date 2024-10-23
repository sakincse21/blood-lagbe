import React from 'react';
import heart from '../../imgs/icons8-heart-90.png';
import './footer.css';

const imgStyle={
    width: "30px",
}

const Footer = () => {
    return (
        <div className=' d-flex justify-content-center align-items-center w-100 bg-black text-white mt-5 py-3 footer'>
                <h5>Developed by <a href="http://saleheensarena.netlify.app">Saleheen <img src={heart} alt="heart" style={imgStyle} /></a></h5>
        </div>
    );
};

export default Footer;