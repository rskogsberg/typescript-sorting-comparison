import React, { useState, createContext, ReactNode, useContext } from 'react';
import { GlobalContext } from './GlobalContext';


export const BubbleContext = createContext<BubbleContextType>({
  currentlyBubbling: [],
  setCurrentlyBubbling: () => null
});

type BubbleContextType = {
  currentlyBubbling: number[],
  setCurrentlyBubbling: React.Dispatch<React.SetStateAction<number[]>>
}

type Props = {
  children: ReactNode
}

export const BubbleProvider: React.ComponentType<Props> = props => {
  const { initialArray } = useContext(GlobalContext);
  const [currentlyBubbling, setCurrentlyBubbling] = useState<number[]>([]);

  
  return(
    <BubbleContext.Provider value={ { currentlyBubbling, setCurrentlyBubbling }}>
      {props.children}
    </BubbleContext.Provider>
  );
}

function randomIntFromInterval(min: number, max: number): number {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
