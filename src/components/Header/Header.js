import React, { useContext } from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.css';
import logo from '../../imgs/icons8-blood-drop-100.png';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import { UserContext } from '../../App';

const Header = () => {
    const [loginEmail, setLoginEmail, decodedToken, isExpired, isDonor, setIsDonor, user, setUser] = useContext(UserContext);
    const navigate=useNavigate();
    const handleLogOut=()=>{
        localStorage.removeItem('token');
        setIsDonor(false);
        setLoginEmail('');
        setUser({});
        navigate("/");
    }
    return (
        <div className='Header justify-content-between d-flex flex-row my-2 mx-2'>
            <Link className='mylink' to={'/'}>
                <div className='d-flex justify-content-start align-items-end'>
                    <img src={logo} alt="logo" className='logo-img' />
                    <h2 className='mx-2 text-dark'>Blood Lagbe</h2>
                </div>
            </Link>
            <div className='d-flex flex-row'>
                <ul className="nav justify-content-end">
                    <li className="nav-item">
                        <Link className='mylink' to={"/FindBlood"}><span className="nav-link">Find Blood</span></Link>
                    </li>
                    <li className="nav-item">
                        {(!loginEmail) && <Link className='mylink' to={"/BecomeDonor"}><span className="nav-link">Be A Donor</span></Link>}
                        {(loginEmail) && <Link className='mylink' to={"/profile"}><span className="nav-link">Profile</span></Link>}
                    </li>
                    {/* <li className="nav-item">
                        <Link className='mylink' to={"/About"}><span className="nav-link">About</span></Link>
                    </li> */}
                    <li className="nav-item">
                        <Link className='mylink' to={"/ContactUs"}><span className="nav-link">Contact Us</span></Link>
                    </li>
                    {
                        isDonor&&<li className="nav-item">
                            <button className='btn logoutbtn' onClick={handleLogOut}>Log Out</button>
                        </li>
                    }
                </ul>
            </div>

        </div>
    );
};

export default Header;