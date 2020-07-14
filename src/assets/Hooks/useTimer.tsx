import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../../context/GlobalContext';

export default function useTimer() {
  const { seconds, setSeconds, isRunning ,setIsRunning } = useContext(GlobalContext);

  const AlgoTimer = () => {

    useEffect(() => {
      let interval: any = null;
      if (isRunning) {
        interval = setInterval(() => {
          setSeconds(seconds => seconds + 1);
        }, 1000);
      } else if(!isRunning && seconds !== 0) {
        clearInterval(interval);
      }
      return () => clearInterval(interval);
    }, [isRunning, seconds]);
  }

  return {
    AlgoTimer,
    seconds,
    isRunning,
    setSeconds,
    setIsRunning
  }
}