import React from 'react';
import "../../style/Event.css"
// import { getCurrentFormattedDate, formatTimeTo12HourClock } from './Utils';

const CompetitionInformation = ({
    name,
    duration,
    paused,
    extended,
    pausedTime,
    extendedTime,
    memLimit,
    timeLimit,
    isJudge,
    onEdit,
    processTimeStart
}) => {
    // const formattedDate = getCurrentFormattedDate(date);
    // const formattedTime = formatTimeTo12HourClock(timeStarted);
    // const formattedPTime = formatTimeTo12HourClock(pausedTime);
    // const formattedETime = formatTimeTo12HourClock(extendedTime);
    
    const formatStartTime = new Date(processTimeStart);

    return (
        <div className="white-box">
            <h3>Contest Information</h3>
            <p><strong>Contest Name:</strong><br /> {name}</p>
             <p><strong>Contest Start Time:</strong><br /> {formatStartTime.toString()}</p>
            <p><strong>Duration(hour):</strong><br /> {duration}</p>
            
            {/* {paused && (
                <div>
                    <p><strong>Paused Time:</strong><br /> {formattedPTime}</p>
                </div>
            )}
            {extended && (
                <div>
                    <p><strong>Extended End Time:</strong><br /> {formattedETime}</p>
                </div>
            )}
            {isJudge && (
                <>
                    <p><strong>Judge0 Memory Limit (KB):</strong><br /> {memLimit}</p>
                    <p><strong>Judge0 Time Limit (s):</strong><br /> {timeLimit}</p>
                </>
            )} */}
            {isJudge && <button onClick={onEdit} className="custom-button">Edit</button>}
        </div>
    );
};

export default CompetitionInformation;



