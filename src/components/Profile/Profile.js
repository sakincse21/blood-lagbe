import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import calendar from '../../imgs/icons8-calendar-48.png';
import { validateBDPhoneNumber } from '../BecomeDonor/RegexFuncs';

const Profile = () => {
    const [loginEmail, setLoginEmail, clientDecodedToken, setClientDecodedToken, checkExpired, setCheckExpired, isDonor, setIsDonor, user, setUser] = useContext(UserContext);
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [area, setArea] = useState('');
    const [mobile, setMobile] = useState(0);
    const [bloodGroup, setBloodGroup] = useState('');
    const [age, setAge] = useState(0);
    const currentDate = new Date('1998-07-14');
    const [lastDonation, setLastDonation] = useState(currentDate);

    const [edit, setEdit] = useState(false);

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
                    if (data.isDonor === false) {
                        setUser({});
                    } else {
                        setUser(data);
                        setName(data.name);
                        setMobile(data.mobile);
                        setAge(data.age);
                        setArea(data.area);
                        setBloodGroup(data.bloodGroup);
                    }

                    if (!data.isDonor) {
                        navigate('/BecomeDonor');
                    }
                    // console.log(data);

                })
        } else if (!isDonor) {
            navigate('/BecomeDonor');
        } else if (!user) {
            navigate('/BecomeDonor');
        }
    }, []);
    console.log(user);




    const handleSave = () => {

        if (validateBDPhoneNumber(mobile)) {
            fetch('https://blood-lagbe-server2.vercel.app/update', {
                method: "PATCH",
                body: JSON.stringify({
                    token: localStorage.getItem('token'),
                    email: loginEmail,
                    lastDonation,
                    name, area, age, bloodGroup, mobile
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setEdit(false);
                })
        }

    }

    return (
        <div>
            <span className="edittag">Email:</span><h3> {user.email}</h3>

            <span className="edittag">Donation Dates: </span>
            {user.date && <h3>{user.date.map(dt => <h3><img src={calendar} alt="cl" style={{ width: '20px' }} />{dt}</h3>)}</h3>}


            {!edit && <><span className="edittag">Name: </span> <h3>{user.name}</h3> </>}
            {edit && <> <span className="edittag">Name: </span> <input type="text" className='form-control' name="name" id="name" value={name} onChange={(e) => {
                e.preventDefault();
                setName(e.target.value);
            }} /> <br /> </>}


            {!edit && <><span className="edittag">Mobile: </span> <h3> {user.mobile}</h3>  </>}
            {edit && <> <span className="edittag">Mobile: </span> <input type="tel" className=' form-control' name="mobile" id="mobile" value={mobile} onChange={(e) => {
                e.preventDefault();
                setMobile(e.target.value);
            }} /> {!validateBDPhoneNumber(mobile) && <span style={{ fontWeight: 300, color: 'red', fontSize: '10px' }}>Enter Valid Number</span>} <br /> </>}


            {!edit && <><span className="edittag">Area: </span> <h3> {user.area}</h3>  </>}
            {edit && <> <span className="edittag">Area: </span>

                <select id="area" value={area} onChange={(e) => { setArea(e.target.value) }} className=" form-select" required={true}>
                    {/* <option value="" key={-1}>{user.area}</option> */}
                    {areas.map((ar, index) => (
                        <option key={index} value={ar}>
                            {ar}
                        </option>
                    ))}
                </select>
                <br /> </>}


            {!edit && <><span className="edittag">Blood Group: </span> <h3> {user.bloodGroup}</h3>  </>}
            {edit && <> <span className="edittag">Blood Group: </span>

                <select id="area" value={bloodGroup} onChange={(e) => { setBloodGroup(e.target.vlue) }} className="form-select" required={true}>
                    {/* <option value="" key={-1}>{user.bloodGroup}</option> */}
                    {bloodGroups.map((bg, index) => (
                        <option key={index} value={bg}>
                            {bg}
                        </option>
                    ))}
                </select>
                <br /> </>}

            {edit && <> <span className="edittag">Last Donation: </span> <input type="date" className=' form-control' name="newDate" id="newDate" onChange={(e) => {
                e.preventDefault();
                setLastDonation(e.target.value);
            }} />  <br /> <br /> </>}

            {edit && <button className='btn profbtn' type="button" onClick={handleSave}>Save</button>}
            {edit && <button className='btn profbtn' type='button' onClick={() => { setEdit(false) }}>Cancel</button>}
            {!edit && <button className='btn profbtn' type='button' onClick={() => { setEdit(true) }}>Edit</button>}
        </div>
    );
};

export default Profile;