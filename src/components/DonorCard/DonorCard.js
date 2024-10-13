import React from 'react';
import '/node_modules/bootstrap/dist/css/bootstrap.css';
import './DonorCard.css';


const DonorCard = (props) => {
    //console.log(name,area,bloodGroup,mobile);
    const [ name, area, bloodGroup, mobile ]=props.details;
    return (
        <div class="card text-center ">
            <div class="card-body d-flex flex-column gap-2">
                <h5 class="card-title">Name: {name}</h5>
                <h5 class="card-title">Area: {area}</h5>
                <h5 class="card-title">Blood Group: <span className='blood'>{bloodGroup}</span></h5>
                <h5><a href={`callto:${mobile}`} className='btn m-2 btn-success donorbtn'>Call Now</a>
                <a href="#" className="btn btn-primary m-2 findbtn">Check History</a></h5>
            </div>
        </div>
    );
};

export default DonorCard;