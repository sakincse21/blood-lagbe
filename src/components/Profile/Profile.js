import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import userToken from '../Login/token';

const Profile = () => {
    const [loginEmail, setLoginEmail, clientDecodedToken, setClientDecodedToken, checkExpired, setCheckExpired, isDonor, setIsDonor, user, setUser] = useContext(UserContext);
    const navigate = useNavigate();
    const currentDate = new Date();
    const [lastDonation, setLastDonation] = useState(currentDate);

    useEffect(() => {
        if (loginEmail) {
            const encodedEmail = loginEmail.replace('@', '%40');
            // console.log(encodedEmail);

            fetch(`http://localhost:3001/isdonor?email=${encodedEmail}`)
                .then(res => res.json())
                .then(data => {
                    // console.log(data);
                    console.log(data);
                    if (data.isDonor === false) {
                        setUser({});
                    } else {
                        setUser(data);
                    }

                    if (!data.isDonor) {
                        navigate('/BecomeDonor');
                    }
                    // console.log(data);

                })
        }else if(!isDonor){
            navigate('/BecomeDonor');
        }else if(!user){
            navigate('/BecomeDonor');
        }
    }, []);
    console.log(user);
    
    const handleLastDonation=(e)=>{
        e.preventDefault();
        setLastDonation(e.target.value);
    }

    const handleSave=()=>{
        fetch('http://localhost:3001/update', {
            method: "PATCH",
            body: JSON.stringify({
                token: localStorage.getItem('token'),
                email: loginEmail,
                lastDonation
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(res => res.json())
            .then(data => {
                 console.log(data);
            })
    }

    return (
        <div>
            <h3>{user.name}</h3>
            <h3>{user.email}</h3>
            <h3>{user.mobile}</h3>
            <h3>{user.bloodGroup}</h3>
            <h3>{user.area}</h3>
            {user.date && <h3>{user.date.map(dt=><h2>{dt}</h2>)}</h3>}
            <input type="date" name="newDate" id="newDate" onChange={handleLastDonation}/>
            <button type="button" onClick={handleSave}>Save</button>
        </div>
    );
};

export default Profile;