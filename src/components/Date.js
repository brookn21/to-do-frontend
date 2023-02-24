import React, { useState, useEffect }  from "react";
import { ReactComponent as ClockIcon } from './icons/clock.svg';
import { ReactComponent as CalenderIcon } from './icons/calendar.svg';


function Date() {
    const [currentDate, setCurrentDate] = useState('')

    // useEffect(()=>{
    //     const date = new Date().getDate()
    //     const month = new Date().getMonth() 
    //     const year = new Date().getFullYear()
    //     setCurrentDate(
    //         date + '/' + month + '/' + year
    //     )
    // },[])
    return (
        <div className="App">
            {/* <CalenderIcon />
            <h1>{currentDate}</h1>
            <ClockIcon /> */}
        </div>
    );
}

export default Date;