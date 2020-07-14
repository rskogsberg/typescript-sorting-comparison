import { useContext } from 'react';
import { swap } from './swap';
import { delay } from './delay';
import { BubbleContext } from '../../context/BubbleContext';
import { GlobalContext } from '../../context/GlobalContext';

let awaitLength: number = 25;

export default function useBubbleSort () {

  const { setInitialArray, isRunning, setIsRunning  } = useContext(GlobalContext);
  const { currentlyBubbling, setCurrentlyBubbling } = useContext(BubbleContext);

  const bubbleSort = async (stateArray: number[]) => {
    let array = stateArray.slice(0);
    let isSorted: boolean = false;
    let counter: number = 0;

    while (!isSorted) {
      setIsRunning(!isRunning);
      isSorted = true;
      for (let i=0; i < array.length - counter - 1; i++) {
        setCurrentlyBubbling([i, i+1]);
        if (array[i] > array[i+1]) {
          swap(i, i+1, array);
          isSorted = false;
        }
        setInitialArray(array);
        await delay(awaitLength)
      }
      counter++
    }
    setIsRunning(isRunning);
    setCurrentlyBubbling([]);
  }

  return {
    currentlyBubbling,
    bubbleSort,
  };
}