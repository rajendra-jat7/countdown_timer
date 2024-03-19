import React, { useState, useEffect } from 'react';
import './CountdownTimer.css';

const CountdownTimer = ({ targetDateTime }) => {
  const calculateTimeLeft = () => {
    const difference = new Date(targetDateTime) - new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [timerActive, setTimerActive] = useState(true);

  useEffect(() => {
    if (!timerActive) return;

    const timer = setTimeout(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);

      if (Object.values(newTimeLeft).every(value => value === 0)) {
        playNotificationSound(); // Play notification sound when countdown completes
        setTimerActive(false); // Stop the timer
      }
    }, 1000);

    return () => clearTimeout(timer);
  });

  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
  };

  const { days, hours, minutes, seconds } = timeLeft;

  const handleCancel = () => {
    setTimerActive(false);
  };

  const playNotificationSound = () => {
    const audio = new Audio('/myalarm.mp3'); // Path to your sound file
    audio.play();
  };

  return (
    <div className="countdown-timer">
      <h2>Countdown Timer</h2>
      <div className='countdown-container'>
          <div className="countdown-box">
            <p className="countdown-value">{days ? `${days}d` : ''}</p>
          </div>
          <div className="countdown-box">
            <p className="countdown-value">{hours ? `${formatTime(hours)}:` : ''}</p>
          </div>
          <div className="countdown-box">
            <p className="countdown-value">{minutes ? `${formatTime(minutes)}:` : ''}</p>
          </div>
          <div className="countdown-box">
            <p className="countdown-value">{seconds ? formatTime(seconds) : ''}</p>
          </div>
      </div>
      {timerActive && (
        <button onClick={handleCancel}>Cancel Countdown</button>
      )}
    </div>
  );
};

export default CountdownTimer;
