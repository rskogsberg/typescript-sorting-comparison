import { useContext, useEffect } from 'react';
import { GlobalContext } from '../../context/GlobalContext';
import useQuickSort from './useQuickSort';

const NUMBER_OF_ARRAY_BARS: number = Math.floor(window.innerWidth / 40);

export default function useResetArray() {
  const { initialArray, setInitialArray, setSeconds, theme, setTheme } = useContext(GlobalContext);
  const { quickSort } = useQuickSort();

  const resetArray = () => {
    const array: number[] = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(5, window.innerHeight*0.69));
    }
    //const tempArr: number[] = array.slice(0);
    //const checkArr: number[] = tempArr.sort((a, b) => a - b).reverse();
    setInitialArray(array);
    setSeconds(0);
  }

  useEffect(() => {
    resetArray()
  }, [])

  function randomIntFromInterval(min: number, max: number): number {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  return {
    initialArray,
    resetArray,
  };

}