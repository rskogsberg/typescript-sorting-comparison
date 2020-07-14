import { useContext } from 'react';
import { swap } from './swap';
import { delay } from './delay';
import { GlobalContext } from '../../context/GlobalContext';


export default function useQuickSort () {
  const { setInitialArray, pivot, setPivot, currentQuickSwappers, setCurrentQuickSwappers, isRunning, setIsRunning } = useContext(GlobalContext);
  
  const quickSort = async(stateArray: number[]) => {
    const array = stateArray.slice(0);
    setIsRunning(!isRunning);
    const tempArr: number[] = array.slice(0);
    const checkArr: number[] = tempArr.sort((a, b) => a - b);
    await quickSortHelper(array, 0, array.length - 1, checkArr);
  }

  const quickSortHelper = async(array: number[], startIndex: number, endIndex: number, checkArr: number[]) => {
    if (startIndex >= endIndex) {
      let sameOrderLength: number = 0;
      for (let i=0; i < array.length; i++) {
        if(array[i] == checkArr[i]){
          sameOrderLength += 1
        } 
      }
      if (array.length == sameOrderLength){
        setPivot(undefined);
        setCurrentQuickSwappers([]);
        setIsRunning(isRunning);
      }
      return
    }
    let pivotIndex = startIndex;
    let leftIndex = startIndex + 1;
    let rightIndex = endIndex;
    setPivot(pivotIndex);
    setCurrentQuickSwappers([leftIndex, rightIndex]);
    while (rightIndex >= leftIndex) {
      if (array[leftIndex] > array[pivotIndex] && array[rightIndex] < array[pivotIndex]){
        setCurrentQuickSwappers([leftIndex, rightIndex]);
        setInitialArray(array)
        swap(leftIndex, rightIndex, array);
      }
      await delay(25);
      if (array[leftIndex] <= array[pivotIndex]) {
        setCurrentQuickSwappers([leftIndex, rightIndex]);
        leftIndex++;
      }
      if (array[rightIndex] >= array[pivotIndex]){
        setCurrentQuickSwappers([leftIndex, rightIndex]);
        rightIndex--;
      }
    }
    swap(pivotIndex, rightIndex, array);
    setCurrentQuickSwappers([pivotIndex, rightIndex]);
    setInitialArray(array);
    const leftSubarrayIsSmaller = rightIndex - 1 - startIndex < endIndex - (rightIndex + 1);
    if (leftSubarrayIsSmaller) {
      quickSortHelper(array, startIndex, rightIndex - 1, checkArr);
      quickSortHelper(array, rightIndex + 1, endIndex, checkArr);
    } else {
      quickSortHelper(array, rightIndex + 1, endIndex, checkArr);
      quickSortHelper(array, startIndex, rightIndex - 1, checkArr);
    }
  }

  return {
    pivot,
    currentQuickSwappers,
    quickSort,
  }

}
