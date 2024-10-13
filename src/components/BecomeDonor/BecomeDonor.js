import React, { useEffect, useState } from 'react';
import heroimg from '../../imgs/Superhero-amico.png';
import './BecomeDonor.css';

const BecomeDonor = () => {
    const [name, setName] = useState('');
    const [area, setArea] = useState('');
    const [mobile, setMobile] = useState(0);
    const [bloodGroup, setBloodGroup] = useState('');
    const [age, setAge] = useState(0);
    const [lastdonation, setLastdonation] = useState('');

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
    
    
        const handleSelectChange = (event) => {
            event.preventDefault();
            setArea(event.target.value);
            console.log("Selected area: ", event.target.value);  // For debugging or further use
        };
    return (
        <div className='my-5 mx-1 d-flex row Home'>
            <div className="col-lg-6 d-flex justify-content-center align-items-center px-2 ">
                <div>
                    <label for="name">Name</label> <br />
                    <input type="text" name="name" id="name" className=' form-select' /><br />
                    <label for="area">Area</label><br />
                    <select id="area" value={area} onChange={handleSelectChange} className="form-select">
                        {areas.map((ar, index) => (
                            <option key={index} value={ar}>
                                {ar}
                            </option>
                        ))}
                    </select>
                    <br />
                    <label for="mobile">Mobile</label><br />
                    <input type="tel" name="mobile" id="mobile" className=' form-select'/><br />
                    <label for="bloodGroup">Blood Group</label><br />
                    <input type="text" name="bloodGroup" id="bloodGroup" className=' form-select' /><br />
                    <label for="age">Age</label><br />
                    <input type="number" name="age" id="age" className=' form-select' /><br />
                    <label for="date">Last Donation</label><br />
                    <input type="date" name="date" id="date" className=' form-select'/> <br />
                    <button id="submit" className=' form-select'>Submit</button>
                </div>
            </div>
            <div className="col-lg-6 d-flex justify-content-center align-items-center p-5">
                <img src={heroimg} alt="donate" />
            </div>
        </div>
    );
};

export default BecomeDonor;