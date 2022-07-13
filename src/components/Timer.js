import React, { useState, useEffect } from 'react'
import AlertMessage from './AlertMessage';

const Timer = () => {
    const [popup, setpopup] = useState({
        alertMessage: "Time out ",
        success: false,
        popup: false,
      });
    const [seconds , setSeconds] = useState(15);
    useEffect(()=> {
        setTimeout(() => {
            if(seconds >0)
            {
                setSeconds(seconds => seconds-1);
            }else{

                // setpopup({
                //     alertMessage : 'Time out',
                //     success : false,
                //     popup : true
                // })
                // setSeconds(15)
            }
        } , 1000)
    } , [seconds])

    const setVisible = () => {
        setpopup({
          popup: !popup,
        });
      };
    return(
        <div className="timer" >
            <AlertMessage popup={popup} setVisible={() => setVisible()} />
          <h4>00:{seconds >= 10 ? seconds : "0"+seconds} <i class="fa fa-hourglass-half"></i></h4> 
        </div>
    )
}

export default Timer;