import React, { useState, createContext, ReactNode } from 'react';

export const GlobalContext = createContext<GlobalContextType>({
  initialArray: [],
  setInitialArray: () => null,
  seconds: 0,
  setSeconds: () => null,
  isRunning: false,
  setIsRunning: () => null,
  pivot: undefined,
  setPivot: () => null,
  currentQuickSwappers: [],
  setCurrentQuickSwappers: () => null,
  theme: 'light',
  setTheme: () => null
});

type GlobalContextType = {
  initialArray: number[],
  setInitialArray: React.Dispatch<React.SetStateAction<number[]>>,
  seconds: number,
  setSeconds: React.Dispatch<React.SetStateAction<number>>,
  isRunning: boolean,
  setIsRunning: React.Dispatch<React.SetStateAction<boolean>>,
  pivot: number | undefined,
  setPivot: React.Dispatch<React.SetStateAction<number | undefined>>,
  currentQuickSwappers: number[],
  setCurrentQuickSwappers: React.Dispatch<React.SetStateAction<number[]>>,
  theme: Theme,
  setTheme: React.Dispatch<React.SetStateAction<Theme>>
}

type Theme = 'light' | 'dark';

type Props = {
  children: ReactNode
}

export const GlobalProvider: React.ComponentType<Props> = props => {
  const [initialArray, setInitialArray] = useState<number[]>([]);
  const [pivot, setPivot] = useState<number>();
  const [seconds, setSeconds] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [currentQuickSwappers, setCurrentQuickSwappers] = useState<number[]>([]);
  const [theme, setTheme] = useState<Theme>('light');
  
  return(
    <GlobalContext.Provider value={ { initialArray, setInitialArray, seconds, setSeconds, isRunning, setIsRunning, pivot, setPivot, currentQuickSwappers, setCurrentQuickSwappers, theme, setTheme }}>
      {props.children}
    </GlobalContext.Provider>
  );
}

function randomIntFromInterval(min: number, max: number): number {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
