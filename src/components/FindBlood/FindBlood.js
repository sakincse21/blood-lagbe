import React, { useEffect, useState } from 'react';
import './FindBlood.css';

const FindBlood = (props) => {
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

    function dateCalculation(date) {
        // Parse the string date '2024-10-02'
        const targetDate = new Date(date);
        // Get the current date
        const currentDate = new Date();

        // Calculate the time difference in milliseconds
        const timeDifference = targetDate - currentDate;

        // Convert the difference from milliseconds to days
        const millisecondsPerDay = 1000 * 60 * 60 * 24;
        const daysDifference = Math.floor(timeDifference / millisecondsPerDay);



        // Output the difference
        return daysDifference;

    }

    const [donors, setDonors, setBtnclick] = props.setter;
    const [bloodGroup, setBloodGroup] = useState('');
    const [area, setArea] = useState('');
    const searchNow = async () => {
        let encodedBloodGroup = bloodGroup;
        if (bloodGroup === 'A+') encodedBloodGroup = 'A%2B';
        else if (bloodGroup === 'B+') encodedBloodGroup = 'B%2B';
        else if (bloodGroup === 'O+') encodedBloodGroup = 'O%2B';
        else if (bloodGroup === 'AB+') encodedBloodGroup = 'AB%2B';
        console.log(bloodGroup);
        // setBtnclick(true);
        const temp = [];

        await fetch(`http://localhost:3001/donors?area=${area}&bloodGroup=${encodedBloodGroup}`)
            .then(res => res.json())
            .then(data => {
                data.map(user => {
                    console.log(Math.abs(dateCalculation(user.date[user.date.length-1])));
                    
                    if (Math.abs(dateCalculation(user.date[0])) > 90) {
                        temp.push(user);
                    }
                })
                console.log(donors);
                setDonors(temp);
                // setBtnclick(true);
            })
    }

    const handleAreaChange = (event) => {
        event.preventDefault();
        setArea(event.target.value);
        console.log("Selected area: ", event.target.value);  // For debugging or further use
    };

    const handleBloodGroupChange = (event) => {
        event.preventDefault();
        setBloodGroup(event.target.value);
        console.log("Selected area: ", event.target.value);  // For debugging or further use
    };


    return (
        <div className='FindBlood '>
            <label for="area" className=' form-label'>Area</label>
            <select id="area" value={area} onChange={handleAreaChange} className="form-select">
                <option value="">All Area</option>
                {areas.map((ar, index) => (
                    <option key={index} value={ar}>
                        {ar}
                    </option>
                ))}
            </select> <br />
            <label for="bloodGroup" className=' form-label'>Blood Group</label>
            <select id="area" value={bloodGroup} onChange={handleBloodGroupChange} className="form-select">
                <option value="">All Groups</option>
                {bloodGroups.map((bg, index) => (
                    <option key={index} value={bg}>
                        {bg}
                    </option>
                ))}
            </select><br />

            <button onClick={searchNow} className='btn form-control searchbtn'>Search</button>
        </div>
    );
};

export default FindBlood;