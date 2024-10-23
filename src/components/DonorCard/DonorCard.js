import React from 'react';
import '/node_modules/bootstrap/dist/css/bootstrap.css';
import './DonorCard.css';
import userIcon from '../../imgs/icons8-friend-100(1).png';


const DonorCard = (props) => {
    //console.log(name,area,bloodGroup,mobile);
    const [ name, area, bloodGroup, mobile, date ]=props.details;
    return (
        <div className="card text-center ">
            <div className="card-body d-flex flex-column gap-2 align-items-center ">
                <img src={userIcon} alt="user" className=' card-img my-3 pb-2' />
                <h6 className="card-title">Name: {name}</h6>
                <h6 className="card-title ">Area: {area}</h6>
                <h6 className="card-title ">Blood Group: <span className='blood'>{bloodGroup}</span></h6>
                <h6><a href={`tel+:${mobile}`} className='btn m-2 btn-success donorbtn fw-light'>Call Now</a>
                <a href="#" className=" m-2 findbtn btn fw-medium">Check History</a></h6>
            </div>
        </div>
    );
};

export default DonorCard;