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
    const areaSelect = document.getElementById("area");

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
    
    const [donors, setDonors, setBtnclick]=props.setter;
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
        setBtnclick(true);
        const temp=[];

        fetch(`http://192.168.1.3:3001/donors?area=${area}&bloodGroup=${bloodGroup}`)
            .then(res => res.json())
            .then(data => {
                data.map(user => {
                    if(Math.abs(dateCalculation(user.date))>90){
                        temp.push(user);
                    }
                })
                console.log(donors);
                setDonors(temp);
                setBtnclick(true);
            })
    }

    const handleSelectChange = (event) => {
        event.preventDefault();
        setArea(event.target.value);
        console.log("Selected area: ", event.target.value);  // For debugging or further use
    };


    return (
        <div className='FindBlood '>
            <label for="area">Area</label><br />
            <select id="area" value={area} onChange={handleSelectChange} className="form-select">
                        {areas.map((ar, index) => (
                            <option key={index} value={ar}>
                                {ar}
                            </option>
                        ))}
                    </select>
            <label for="bloodGroup">Blood Group</label><br />
            <input type="text" name="bloodGroup" id="bloodGroup" className='form-control' onBlur={(e)=>{
            e.preventDefault();;setBloodGroup(e.target.value)}}/><br />
            <button onClick={searchNow} className='btn form-control'>Search</button>
        </div>
    );
};

export default FindBlood;