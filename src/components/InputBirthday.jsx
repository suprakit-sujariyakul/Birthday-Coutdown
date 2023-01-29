import React from 'react'

export default function InputBirthday({ inputBirthday, dayInMonth, onChange }) {
    const monthList = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const dayList = [...Array(dayInMonth).keys()].map(day => day + 1);
    const hourList = [...Array(24).keys()];
    const minuteList = [...Array(60).keys()];

    const monthOption = monthList.map((month, index) => {
        return <option value={index}>{month}</option>
    })

    const dayOption = dayList.map(day => {
        if ((
            inputBirthday.month === 3 ||
            inputBirthday.month === 5 ||
            inputBirthday.month === 8 ||
            inputBirthday.month === 10
            ) &&
            day === 31
           ) {
            return;
        }
        return <option value={day}>{day}</option>
    })

    const hourOption = hourList.map(hour => {
        return <option value={hour}>{hour}</option>
    })

    const minuteOption = minuteList.map(minute => {
        return <option value={minute}>{minute}</option>
    })

    return (
        <>
            <div className='text-5xl text-center'>Your Birthday Countdown</div>
            <div className='flex justify-center'>
                <label for='month'>Month</label>
                <select name='month' id='select-month' onChange={onChange}>{monthOption}</select>

                <label for='day'>Day</label>
                <select name='day' id='select-day' onChange={onChange}>{dayOption}</select>

                <label for='hour'>Time</label>
                <select name='hour' id='select-hour' onChange={onChange}>{hourOption}</select>

                <label for='minute'>:</label>
                <select name='minute' id='select-minute' onChange={onChange}>{minuteOption}</select>
            </div>
        </>
    )
}
