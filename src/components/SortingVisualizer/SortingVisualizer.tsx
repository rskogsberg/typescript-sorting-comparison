import React, { useState, useEffect, useReducer, useContext } from 'react';
import useBubbleSort from '../../assets/Hooks/useBubbleSort';
import useResetArray from '../../assets/Hooks/useResetArray';
import useInsertionSort from '../../assets/Hooks/useInsertionSort';
import useQuickSort from '../../assets/Hooks/useQuickSort';
import { GlobalContext } from '../../context/GlobalContext';
import useMergeSort from '../../assets/Hooks/useMergeSort';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS: number = 10;
const NUMBER_OF_ARRAY_BARS: number = Math.floor(window.innerWidth / 40);
const PRIMARY_COLOR: string = '#03DAC6';
const SECONDARY_COLOR: string = '#3700B3';

export default function BubbleSort () {
  let delay: number = 5;
  const { theme } = useContext(GlobalContext);
  const { currentlyBubbling, bubbleSort } = useBubbleSort();
  const { currentlyInserting } = useInsertionSort();
  const { initialArray, resetArray } = useResetArray();
  const { pivot, currentQuickSwappers } = useQuickSort(); 
  const { currentlyMerging } = useMergeSort(); 
  //const { resetArray } = useResetArray();

  useEffect(() => {
    resetArray()
  }, []);

  return (
    <div className={`array-container ${theme}`}>
      <div className="array-card">
      {initialArray.map((value, idx) => (
        <div className="array-bar"
        key={idx}
        style={{
          backgroundColor: currentlyBubbling.includes(idx) ? PRIMARY_COLOR : currentlyInserting.includes(idx) ? PRIMARY_COLOR : currentQuickSwappers.includes(idx) ? PRIMARY_COLOR : currentlyMerging.includes(idx) ? PRIMARY_COLOR : pivot === idx ? SECONDARY_COLOR : '#674AEE',
          height: `${value}px`,
          boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
        }}></div>
      ))}
      </div>
    </div>
  )
}

function randomIntFromInterval(min: number, max: number): number {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}