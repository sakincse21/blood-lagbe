import React, { useContext, useEffect, useState } from 'react';
import heroimg from '../../imgs/Superhero-amico.png';
import './BecomeDonor.css';
import Login from '../Login/Login';
import { validateBDPhoneNumber } from './RegexFuncs';
import { UserContext } from '../../App';
import { useNavigate } from 'react-router-dom';
// console.log(token);


const BecomeDonor = () => {
    // console.log(decodedToken);
    const [loginEmail, setLoginEmail, clientDecodedToken, setClientDecodedToken, checkExpired, setCheckExpired, isDonor, setIsDonor, user, setUser] = useContext(UserContext);
    const [name, setName] = useState('');
    const [area, setArea] = useState('');
    const [mobile, setMobile] = useState(0);
    const [bloodGroup, setBloodGroup] = useState('');
    const [age, setAge] = useState(0);
    const currentDate = new Date();
    const [lastdonation, setLastdonation] = useState(currentDate);


    const navigate = useNavigate();

    if (clientDecodedToken) {
        // console.log(isExpired);
        if (checkExpired) {
            setLoginEmail('');
        } else {
            setLoginEmail(clientDecodedToken.email);
        }
        // console.log('yee');

    }

    // console.log('check', loginEmail);
    // console.log(isDonor);



    const areas = [
        "Jhiltuly",
        "South Jhiltuly",
        "Charkamlapur",
        "Niltuly",
        "Tepakhola",
        "Purbo Khabaspur",
        "Poschim Khabaspur",
        "Harokandi",
        "Chanmari",
        "Ambikapur",
        "New Market"
    ];

    const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];



    const handleBloodGroupChange = (event) => {
        event.preventDefault();
        setBloodGroup(event.target.value);
        // console.log("Selected area: ", event.target.value);  // For debugging or further use
    };

    const handleAreaChange = (event) => {
        event.preventDefault();
        setArea(event.target.value);
        // console.log("Selected area: ", event.target.value);  // For debugging or further use
    };

    const handleSubmit = () => {
        const mobilechk = validateBDPhoneNumber(mobile);
        // console.log("hi ",loginEmail);

        setUser({
            name, age, area, mobile, bloodGroup,
            email: loginEmail,
            date: [lastdonation]
        });

        if (mobilechk && name && area && (age >= 18 && age <= 50) && bloodGroup && lastdonation) {
            fetch('https://blood-lagbe-server2.vercel.app/beadonor', {
                method: "POST",
                body: JSON.stringify({
                    name, age, area, mobile, bloodGroup,
                    email: loginEmail,
                    date: [lastdonation],
                    isDonor: true
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
                .then(res => res.json())
                .then(data => {
                    setUser(data)
                    setIsDonor(data.isDonor);
                    // console.log(data);
                })
        }
    }

    useEffect(() => {
        if (loginEmail) {
            const encodedEmail = loginEmail.replace('@', '%40');
            const token=localStorage.getItem('token');
            // console.log(encodedEmail);

            fetch(`https://blood-lagbe-server2.vercel.app/isdonor?email=${encodedEmail}`, {
                method: 'GET',
                headers: {
                  'Authorization': `Bearer ${token}`,  // Pass the token in the Authorization header
                  'Content-Type': 'application/json'
                }
              })
                .then(res => res.json())
                .then(data => {
                    // console.log(data);
                    console.log(data);
                    if(data.isDonor===false){
                        setUser({});
                    }else{
                        setUser(data);
                    }
                    setIsDonor(data.isDonor);

                    // console.log(data);

                })
        }
    }, [loginEmail]);

    if (isDonor) {
        navigate('/profile');
    }

    return (
        <div className='my-5 mx-1 d-flex row Home justify-content-center'>
            <div className="col-lg-6 d-flex justify-content-center align-items-center px-2 ">


                {
                    // (isDonor && loginEmail) && <Profile user={user}></Profile>
                }

                {
                    (loginEmail && (!isDonor)) && <div>

                        <h3 className=' text-bg-danger'>Donor Registration</h3> <br />

                        <label for="name" className=' form-label'>Name</label>
                        <input type="text" placeholder='Full Name' name="name" id="name" className=' form-control find-select' onChange={(e) => {
                            e.preventDefault(); setName(e.target.value);
                        }} required={true} /> <br />

                        <label for="area" className=' form-label'>Area</label>
                        <select id="area" value={area} onChange={handleAreaChange} className="form-select find-select" required={true}>
                            <option value="" key={-1}>Select Area</option>
                            {areas.map((ar, index) => (
                                <option key={index} value={ar}>
                                    {ar}
                                </option>
                            ))}
                        </select> <br />

                        <label for="mobile" className=' form-label'>Mobile</label>
                        <input type="tel" placeholder={'+8801#########'} name="mobile" id="mobile" className=' form-control find-select' onChange={(e) => {
                            e.preventDefault(); setMobile(e.target.value);
                        }} required={true} /><br />

                        <label for="bloodGroup" className=' form-label'>Blood Group</label>
                        <select id="area" value={bloodGroup} onChange={handleBloodGroupChange} className="form-select find-select" required={true}>
                            <option value="" key={-1}>Select Group</option>
                            {bloodGroups.map((bg, index) => (
                                <option key={index} value={bg}>
                                    {bg}
                                </option>
                            ))}
                        </select> <br />

                        <label for="age" className=' form-label'>Age</label>
                        <input type="number" name="age" id="age" className=' form-control find-select' onChange={(e) => {
                            e.preventDefault(); setAge(e.target.value);
                        }} required={true} /><br />

                        <label for="date" className=' form-label'>Last Donation</label>
                        <input type="date" placeholder={currentDate} name="date" id="date" className=' form-control find-select' onChange={(e) => {
                            e.preventDefault(); setLastdonation(e.target.value);
                        }} required={true} /> <br />

                        <button id="submit" className=' btn' onClick={handleSubmit}>Submit</button>

                    </div>
                }

                {
                    ((!isDonor) && (!loginEmail)) && <Login setLoginEmail={setLoginEmail}></Login>
                }


            </div>
            {(!isDonor) && <div className="col-lg-6 d-flex flex-column justify-content-center align-items-center p-5">
                <h3 className='px-3'>"Be a Hero, Save a Life! Donate Blood Today and Make a Difference!"</h3>
                <img src={heroimg} alt="donate" />
            </div>}
        </div>
    );
};

export default BecomeDonor;