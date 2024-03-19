import React, { useState } from 'react'
import './InputForm.css';

const InputForm = ({onSubmit}) => {
    const [dateTime, setDateTime] = useState('');
    const [error, setError] = useState('');
    const currentDate = new Date();

    const handleSubmit = (e) => {
        e.preventDefault();

        // const currentDate = new Date();
        const selectedDate = new Date(dateTime);

        const differenceInDays = Math.floor((selectedDate - currentDate) / (1000 * 60 * 60 *24));

        if(differenceInDays > 99){
            setError('Maximum countdown duration is 99 days.');
            return;
        }

          onSubmit(dateTime);
          setDateTime('');
          setError('');
    };

  return (
    <div className='input-form'>
      <form onSubmit={handleSubmit}>
        <input 
            type="datetime-local"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
            max={(new Date(currentDate.getTime() + 86400000 * 99)).toISOString().split('Z')[0]} 
        />
      </form>
      <button type='submit' onClick={handleSubmit}>Start Timer</button>
        {error && <p className='error'>{error}</p>}
    </div>
  )
}

export default InputForm
