import React, { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalContext'
import useTimer from '../../assets/Hooks/useTimer';

export default function Timer() {
  const { AlgoTimer } = useTimer();
  const { seconds } = useContext(GlobalContext);

  AlgoTimer();

  return (
    <div className="timer">
      <div className="time">
        {seconds}s
      </div>
      <div className="row">
      </div>
    </div>
  );
}