import { useState } from 'react';
import './App.css';
import InputForm from './components/InputForm/InputForm';
import CountdownTimer from './components/CountdownTimer/CountdownTimer';

function App() {
  const [targetDateTime, setTargetDateTime] = useState('');

  const handleFormSubmit = (dateTime) => {
    setTargetDateTime(dateTime);
  }

  return (
    <div className='app'>
      <h1>Countdown Timer</h1>
      <InputForm onSubmit={handleFormSubmit}/>
      {targetDateTime && <CountdownTimer targetDateTime={targetDateTime}/>}
    </div>
  );
}

export default App;
