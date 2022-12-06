import React from 'react';
import pageNotFound from '../assets/image/404.png'
import './index.css';
import {useNavigate} from "react-router-dom";

const PageNotFound = () => {
    const navigate = useNavigate();
    return (
        <div className='imgbox'>
            <img src={pageNotFound} alt="" className='center-fit' />
            <div className='text-center'><button className='home-button' onClick={()=>navigate("/dashboard")}>Go to Dashboard</button></div>
        </div>
    );
}

export default PageNotFound;
