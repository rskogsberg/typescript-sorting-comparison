import React, { useState, createContext, ReactNode, useContext } from 'react';
import { GlobalContext } from './GlobalContext';

export const MergeContext = createContext<MergeContextType>({
  currentlyMerging: [],
  setCurrentlyMerging: () => null
});

type MergeContextType = {
  currentlyMerging: number[],
  setCurrentlyMerging: React.Dispatch<React.SetStateAction<number[]>>
}

type Props = {
  children: ReactNode
}

export const MergeProvider: React.ComponentType<Props> = props => {
  const { initialArray } = useContext(GlobalContext);
  const [currentlyMerging, setCurrentlyMerging] = useState<number[]>([]);
  
  return(
    <MergeContext.Provider value={ { currentlyMerging, setCurrentlyMerging }}>
      {props.children}
    </MergeContext.Provider>
  );
}

function randomIntFromInterval(min: number, max: number): number {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
