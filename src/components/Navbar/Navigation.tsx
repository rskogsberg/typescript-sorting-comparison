import React, { useState, useContext} from 'react';
import useBubbleSort from '../../assets/Hooks/useBubbleSort'
import { BubbleContext } from '../../context/BubbleContext';
import { GlobalContext } from '../../context/GlobalContext';
import useInsertionSort from '../../assets/Hooks/useInsertionSort'
import { InsertionContext } from '../../context/InsertionContext'
import useResetArray from '../../assets/Hooks/useResetArray';
import useQuickSort from '../../assets/Hooks/useQuickSort';
import Timer from './Timer';
import { delay } from '../../assets/Hooks/delay'
import useTimer from '../../assets/Hooks/useTimer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  IconLookup,
  IconDefinition,
  findIconDefinition
} from '@fortawesome/fontawesome-svg-core'
import useMergeSort from '../../assets/Hooks/useMergeSort';

export default function Navigation() {

  const barsLookup: IconLookup = { prefix: 'fas', iconName: 'bars' }
  const barsIconDefinition: IconDefinition = findIconDefinition(barsLookup)
  const sunLookup: IconLookup = { prefix: 'fas', iconName: 'sun' }
  const sunIconDefinition: IconDefinition = findIconDefinition(sunLookup);
  const moonLookup: IconLookup = { prefix: 'fas', iconName: 'moon' }
  const moonIconDefinition: IconDefinition = findIconDefinition(moonLookup);

  const [menuActive, setMenuActive] = useState<boolean>(false);
  const [themeIcon, setThemeIcon] = useState<IconDefinition>(moonIconDefinition)
  const { initialArray, setInitialArray ,seconds, setSeconds, isRunning ,setIsRunning, theme, setTheme } = useContext(GlobalContext);
  const { bubbleSort } = useBubbleSort();
  const { insertionSort } = useInsertionSort();
  const { resetArray } = useResetArray();
  const { quickSort } = useQuickSort();
  const { AlgoTimer } = useTimer();
  const { mergeSort } = useMergeSort();

  function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
    setThemeIcon(theme === "light" ? sunIconDefinition : moonIconDefinition);
  }

  const handleMerge = async() => {
    setSeconds(0);
    await mergeSort(initialArray,0, initialArray.length);
    await delay(25)
    setInitialArray(initialArray);
  }

  return (
    <nav className={`site-navigation ${theme}`}>
      <span className='menu-title'>Sorting Algorithm Comparison</span>
      <Timer />
      <FontAwesomeIcon icon={themeIcon} className='toggle-button' onClick={toggleTheme}/>
      <div className={`menu-content-container ${menuActive && 'active'}`}>
        <ul>
          <li>
            <button disabled={isRunning} className='nav-text' onClick={() => resetArray()}>Reset</button>
          </li>
          <li>
            <button disabled={isRunning} className='nav-text' onClick={() => bubbleSort(initialArray)}>Bubble Sort</button>
          </li>
          <li>
            <button disabled={isRunning} className='nav-text' onClick={() => insertionSort(initialArray)}>Insertion Sort</button>
          </li>
          <li>
            <button disabled={isRunning} className='nav-text' onClick={() => quickSort(initialArray)}>Quick Sort</button>
          </li>
          <li>
            <button disabled={isRunning} className='nav-text' onClick={handleMerge}>Merge Sort</button>
          </li>
        </ul>
      </div>
      <FontAwesomeIcon icon={barsIconDefinition} className='menu-icon' onClick={() => setMenuActive(!menuActive)}/>
    </nav>)
}