import React, { useEffect, useState } from 'react';
import './FindBlood.css';

const FindBlood = () => {
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
    const areaSelect = document.getElementById("area");

    useEffect(() => {
        while (areaSelect !== null) {
            areas.map(optn => {
                let el = document.createElement("option");
                el.textContent = optn;
                el.value = optn;
                areaSelect.appendChild(el);
            })
        }
    }, )

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
    
    const [donors, setDonors]=useState([]);
    const [bloodGroup, setBloodGroup]=useState('');
    const [area, setArea]=useState('');
    const searchNow = ()=>{
        // setArea(document.getElementById('area').value);
        // setBloodGroup(document.getElementById('bloodGroup').value);
        if (bloodGroup[1] === '+') {
            const temp = bloodGroup[0] + "%2B";
            setBloodGroup(temp);
        }
        console.log(bloodGroup);


        fetch(`http://192.168.1.3:3001/donors?area=${area}&bloodGroup=${bloodGroup}`)
            .then(res => res.json())
            .then(data => {
                data.map(user => {
                    if(Math.abs(dateCalculation(user.date))>90){
                        donors.push(user);
                    }
                })
                console.log(donors);
                
            })
    }
    return (
        <div className='FindBlood '>
            <label for="area">Area</label><br />
            <select id="area" className='form-control' onBlur={(e)=>{setArea(e.target.value)}}/><br />
            <label for="bloodGroup">Blood Group</label><br />
            <input type="text" name="bloodGroup" id="bloodGroup" className='form-control' onBlur={(e)=>{setBloodGroup(e.target.value)}}/><br />
            <button onClick={searchNow}>Search</button>
        </div>
    );
};

export default FindBlood;