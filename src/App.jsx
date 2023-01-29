import { useEffect, useState, useReducer } from 'react';
import InputBirthday from './components/InputBirthday';
import CountdownDisplay from './components/CountdownDisplay';

function reducer(inputBirthday, action) {
  switch (action.type) {
    case 'select-month':
      return {...inputBirthday, month: Number(action.payload)};
    case 'select-day':
      return {...inputBirthday, day: action.payload};
    case 'select-hour':
      return {...inputBirthday, hour: action.payload};
    case 'select-minute':
      return {...inputBirthday, minute: action.payload};
  }
}

function App() {
  const [time, setTime] = useState(new Date());
  const [inputBirthday, dispatch] = useReducer(reducer, {
    month: 0,
    day: 1,
    hour: 0,
    minute: 0
  });
  const [dayInMonth, setDayInMonth] = useState(31);

  function getBirthDateCountdown(month, day, hour, minute) {
    const timeNow = new Date().getTime();
    let timeBirth = new Date(time.getFullYear(), month, day, hour, minute).getTime();

    if (timeBirth < timeNow) {
      timeBirth = new Date(time.getFullYear() + 1, month, day, hour, minute).getTime();
    } 

    const timeCountDown = Math.floor((timeBirth - timeNow)/1000); 

    const dayCountDown = Math.floor(timeCountDown / (24 * 60 * 60));
    const hourCountDown = Math.floor((timeCountDown % (24 * 60 * 60)) / (60 * 60));
    const minuteCountDown = Math.floor((timeCountDown % (60 * 60)) / 60);
    const secondCountDown = Math.floor(timeCountDown % 60);

    return {dayCountDown, hourCountDown, minuteCountDown, secondCountDown};
  };

  function getVirtualBirthdayYear(month, day, hour, minute) {
    const timeNow = new Date().getTime();
    let timeBirth = new Date(time.getFullYear(), month, day, hour, minute).getTime();

    if (timeBirth < timeNow) {
      return time.getFullYear() + 1;
    } 
    return time.getFullYear();
  }

  function handleOnChange(event) {
    dispatch({ type: event.target.id, payload: event.target.value })
  }

  const countDown = getBirthDateCountdown(inputBirthday.month, inputBirthday.day, inputBirthday.hour, inputBirthday.minute);
  const virtualBirthdayYear = getVirtualBirthdayYear(inputBirthday.month, inputBirthday.day, inputBirthday.hour, inputBirthday.minute);

  useEffect(() => {
    const intervalTask = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(intervalTask);
  }, [])

  useEffect(() => {
    if (inputBirthday.month === 1) {
      if (virtualBirthdayYear % 4 === 0) {
        setDayInMonth(29);
        return;
      }
      setDayInMonth(28);
    } else if ((inputBirthday.month === 3 || inputBirthday.month === 5 || inputBirthday.month === 8 || inputBirthday.month === 10)) {
      setDayInMonth(30);
    } else {
      setDayInMonth(31);
    }
  }, [inputBirthday.month])

  return (
    <div className='flex flex-col justify-center align-middle h-screen w-screen'>
      <InputBirthday inputBirthday={inputBirthday} dayInMonth={dayInMonth} onChange={handleOnChange} />
      <CountdownDisplay countDown={countDown} />
    </div>
  )
}

export default App
