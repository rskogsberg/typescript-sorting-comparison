import React from 'react';
import logo from './logo.svg';
import './App.css';
import BubbleSort from './components/SortingVisualizer/SortingVisualizer';
import Navigation from './components/Navbar/Navigation';

import { BubbleProvider } from './context/BubbleContext';
import { InsertionProvider } from './context/InsertionContext';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars, faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { MergeProvider } from './context/MergeContext';

library.add(faBars, faSun, faMoon)

function App() {
  return (
    <BubbleProvider>
    <InsertionProvider>
    <MergeProvider>
      <Navigation></Navigation>
      <BubbleSort></BubbleSort>
    </MergeProvider>
    </InsertionProvider>
    </BubbleProvider>
  );
}

export default App;
