import React from 'react';

export default function CountdownDisplay({ countDown }) {
    return (
        <div className='flex justify-around'>
            <div>{countDown.dayCountDown}</div>
            <div>{countDown.hourCountDown}</div>
            <div>{countDown.minuteCountDown}</div>
            <div>{countDown.secondCountDown}</div>
        </div>
    )
}
