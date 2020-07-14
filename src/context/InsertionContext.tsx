import React, { useState, createContext, ReactNode, useEffect } from 'react';
import { GlobalContext } from './GlobalContext';

export const InsertionContext = createContext<InsertionContextType>({
  currentlyInserting: [],
  setCurrentlyInserting: () => null
});

type InsertionContextType = {
  currentlyInserting: number[],
  setCurrentlyInserting: React.Dispatch<React.SetStateAction<number[]>>
}

type Props = {
  children: ReactNode
}

export const InsertionProvider: React.ComponentType<Props> = props => {
  const [currentlyInserting, setCurrentlyInserting] = useState<number[]>([]);
  
  return(
    <InsertionContext.Provider value={ { currentlyInserting, setCurrentlyInserting }}>
      {props.children}
    </InsertionContext.Provider>
  );
}

function randomIntFromInterval(min: number, max: number): number {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
