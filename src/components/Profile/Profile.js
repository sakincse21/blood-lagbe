import React, { useContext, useEffect } from 'react';
import { UserContext } from '../../App';
import { redirect, useNavigate } from 'react-router-dom';

const Profile = () => {
    const [loginEmail, setLoginEmail, decodedToken, isExpired, isDonor, setIsDonor, user, setUser] = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (loginEmail) {
            const encodedEmail = loginEmail.replace('@', '%40');
            // console.log(encodedEmail);

            fetch(`http://192.168.1.3:3001/isdonor?email=${encodedEmail}`)
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
        }
    }, [loginEmail]);

    console.log("hi this is it", isDonor);

    return (
        <div>
            <h3>{user.name}</h3>
            <h3>{user.email}</h3>
            <h3>{user.mobile}</h3>
            <h3>{user.bloodGroup}</h3>
            <h3>{user.area}</h3>
            <h3>{user.date}</h3>
        </div>
    );
};

export default Profile;