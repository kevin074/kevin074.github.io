import React from 'react';
import { isSorting, isStopSorting, quickSortStop, currentSort, isNewBands } from './appState';
import { bubbleSort, selectionSort, mergeSort, quickSort } from './sorts/sortAdapter';
// import { mockBands } from './mockData/mockBands';

const length = 50;

const pauseSort = function(){
  isStopSorting.val  = true;
  isSorting.val = false;
  quickSortStop.val = true;
}

const continueSort = function(bands, setBands){
  if(!isStopSorting.val || !currentSort.val) { return }

  isStopSorting.val  = false;
  quickSortStop.val = false;
  currentSort.val(bands, setBands)
}

function setNewBands (setBands) {
  pauseSort()
  isNewBands.val = true;
  setBands( Array.from({length:length})
    .map(function(){ return { 
        val:Math.floor(Math.random() * length*10), 
        isActive:false,
        color:null
      } 
    }) 
  );
  // setBands(mockBands.slice()) 
}


function App() {
  const [bands, setBands] = React.useState([]);

  React.useEffect(()=>{ setNewBands(setBands); },[] )

  return (
    <div className="App">
      <button onClick={setNewBands.bind(null, setBands)}> New Bands </button>  

      <button onClick={bubbleSort.bind(null, bands, setBands)}>     Bubble Sort </button>  
      <button onClick={selectionSort.bind(null, bands, setBands)}>  Selection Sort </button>  
      <button onClick={mergeSort.bind(null, bands, setBands)}>      Merge Sort </button>  
      <button onClick={quickSort.bind(null, bands, setBands)}>      Quick Sort </button>  

      <button onClick={pauseSort}> Pause </button>  
      <button onClick={continueSort.bind(null, bands, setBands)}> Continue </button>  

      {bands.map(function(band, index){
          return <div key={'randomBand' + index} 
                      className={band.isActive ? 'bands isActive' : 'bands' }
                      style={{ width:band.val+'px', backgroundColor: band.color ? band.color : '' }}>
                      {band.index}
            </div>
      })}
    </div>
  );
}

export default App;