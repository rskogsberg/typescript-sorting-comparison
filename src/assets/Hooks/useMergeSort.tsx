import { useContext } from 'react';
import { swap } from './swap';
import { delay } from './delay';
import { GlobalContext } from '../../context/GlobalContext';
import { mainModule } from 'process';
import { MergeContext } from '../../context/MergeContext';
import { start } from 'repl';
import { EALREADY } from 'constants';


export default function useMergeSort () {
  const { setInitialArray, isRunning, setIsRunning, setCurrentQuickSwappers } = useContext(GlobalContext);
  const { currentlyMerging, setCurrentlyMerging } = useContext(MergeContext);
  
  const mergeSort = async(array: number[], leftIndex: number, rightIndex: number) => {
    setIsRunning(true);
    const length: number = rightIndex - leftIndex;
    if (length < 2) {
      return array
    }
    const middleIndex: number = leftIndex + Math.floor(length / 2);
    await mergeSort(array, leftIndex, middleIndex);
    await mergeSort(array, middleIndex, rightIndex);
    await delay(25)
    await merge(array, leftIndex, middleIndex, rightIndex);
    //setCurrentQuickSwappers([])
    setCurrentlyMerging([])
    //setIsRunning(false);
    const tempArr: number[] = array.slice(0);
    const checkArr: number[] = tempArr.sort((a, b) => a - b);
    let sameOrderLength: number = 0;
    for (let i=0; i < array.length; i++) {
      if(array[i] == checkArr[i]){
        sameOrderLength += 1
      }
      if (array.length == sameOrderLength){
        setCurrentQuickSwappers([]);
        setIsRunning(isRunning);
      }
    }
    return
  }

  const merge = async(array: number[], leftIndex: number, middleIndex: number, rightIndex: number) => {
    let result: number[] = [];
    let l: number = leftIndex;
    let r: number = middleIndex;
    while (l < middleIndex && r < rightIndex) {
      if (array[l] < array[r]) {
        setCurrentQuickSwappers([l , r]);
        result.push(array[l++]);
      } else {
        setCurrentQuickSwappers([l, r]);
        result.push(array[r++])
      }
    }
    result = result.concat(array.slice(l, middleIndex)).concat(array.slice(r, rightIndex));
    for (let i = 0; i < rightIndex - leftIndex; i++) {
      setInitialArray([...array])
      setCurrentlyMerging([leftIndex + i])
      await delay(25)
      array[leftIndex + i] = result[i]
    }

  }
  

  return {
    currentlyMerging,
    mergeSort,
    setCurrentlyMerging
  }

}