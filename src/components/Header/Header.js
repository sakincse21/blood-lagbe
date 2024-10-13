import React from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <div className='Header justify-content-between d-flex flex-row'>
            <div className='d-flex justify-content-start'>
                <h2 className='mx-2'>LifeDrop</h2>
            </div>
            <div className='d-flex flex-row'>
            <ul className="nav justify-content-end">
                <li className="nav-item">
                    <Link to={"/FindBlood"}><span className="nav-link">Find Blood</span></Link>
                </li>
                <li className="nav-item">
                    <Link to={"/BecomeDonor"}><span className="nav-link">Be A Donor</span></Link>
                </li>
                <li className="nav-item">
                    <Link to={"/About"}><span className="nav-link">About</span></Link>
                </li>
                <li className="nav-item">
                    <Link to={"/ContactUs"}><span className="nav-link">Contact Us</span></Link>
                </li>
            </ul>
            </div>
            
        </div>
    );
};

export default Header;