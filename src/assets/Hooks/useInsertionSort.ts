import React, { useContext } from 'react';
import { swap } from './swap';
import { delay } from './delay';
import { InsertionContext } from '../../context/InsertionContext';
import { GlobalContext } from '../../context/GlobalContext';

export default function useInsertionSort() {
  const { setInitialArray, setIsRunning } = useContext(GlobalContext);
  const { currentlyInserting, setCurrentlyInserting } = useContext(InsertionContext);

  const insertionSort = async (stateArray: number[]) => {
    setIsRunning(true);
    let array = stateArray.slice(0);
    for (let i=1; i < array.length; i++) {
      let j: number = i;
      while (j > 0 && array[j] < array[j-1]) {
        setCurrentlyInserting([j, j-1]);
        await delay(25)
        setInitialArray(array);
        swap(j, j-1, array);
        j -= 1;
      }
    }
    setIsRunning(false);
    setCurrentlyInserting([])
  }

  return {
    currentlyInserting,
    insertionSort
  };

}