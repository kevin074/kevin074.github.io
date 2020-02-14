import React from 'react';
import { isSorting, isStopSorting } from './appState';
import { startBubbleSort } from './bubbleSort';
import { startSelectionSort } from './selectionSort';
import { startMergeSort } from './mergeSort';

const length = 50;

function App() {
  const [bands, setBands] = React.useState([]);
  const bubbleSort = startBubbleSort.bind(null, bands, setBands);
  const selectionSort = startSelectionSort.bind(null, bands, setBands, 0);
  const mergeSort = startMergeSort.bind(null, bands, setBands);

  function setNewBands () {
    isStopSorting.val  = true;
    isSorting.val = false;
    setBands( Array.from({length:length})
      .map(function(){ return { 
          val:Math.floor(Math.random() * length), 
          isActive:false,
          color:null
        } 
      }) 
    );
  }

  React.useEffect(()=>{ setNewBands(); },[] )

  return (
    <div className="App">
      <button onClick={setNewBands}> New Bands </button>  
      <button onClick={bubbleSort}> Bubble Sort </button>  
      <button onClick={selectionSort}> Selection Sort </button>  
      <button onClick={mergeSort}> Merge Sort </button>  

      {bands.map(function(band, index){
          return <div key={'randomBand' + index} 
                      className={band.isActive ? 'bands isActive' : 'bands' }
                      style={{ width:band.val+'px', backgroundColor: band.color ? band.color : '' }}>
            </div>
      })}
    </div>
  );
}

export default App;