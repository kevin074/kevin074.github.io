import React from 'react';
import { isSorting, isStopSorting, quickSortStop } from './appState';
import { startBubbleSort } from './bubbleSort';
import { startSelectionSort } from './selectionSort';
import { startMergeSort } from './mergeSort';
import { startQuickSort } from './quickSort';

const length = 50;

function initSort (cb){
  if(isSorting.val) { return }
  isSorting.val = true;
  isStopSorting.val = false;
  cb();
}

function App() {
  const [bands, setBands] = React.useState([]);
  const bubbleSort = function(){    initSort(startBubbleSort.bind(null, bands, setBands)) ; }
  const selectionSort = function(){ initSort(startSelectionSort.bind(null, bands, setBands, 0)); }
  const mergeSort = function(){     initSort(startMergeSort.bind(null, bands, setBands)); }
  const quickSort = function(){     quickSortStop.val = false; initSort(startQuickSort.bind(null, bands, setBands, 0, bands.length-1));}

  function setNewBands () {
    isStopSorting.val  = true;
    isSorting.val = false;
    quickSortStop.val = true;
    setBands( Array.from({length:length})
      .map(function(){ return { 
          val:Math.floor(Math.random() * length*10), 
          isActive:false,
          color:null
        } 
      }) 
    );
    // setBands(mock)
  }

  React.useEffect(()=>{ setNewBands(); },[] )

  return (
    <div className="App">
      <button onClick={setNewBands}> New Bands </button>  
      <button onClick={bubbleSort}> Bubble Sort </button>  
      <button onClick={selectionSort}> Selection Sort </button>  
      <button onClick={mergeSort}> Merge Sort </button>  
      <button onClick={quickSort}> Quick Sort </button>  

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


const mock = [
  {
    "val": 25,
    "isActive": false,
    "color": null,
    "index":1, 
  },
  {
    "val": 35,
    "isActive": false,
    "color": null,
    "index":2, 
  },
  {
    "val": 45,
    "isActive": false,
    "color": null,
    "index":3, 
  },
  {
    "val": 85,
    "isActive": false,
    "color": null,
    "index":7, 
  },
  {
    "val": 55,
    "isActive": false,
    "color": null,
    "index":4, 
  },
  {
    "val": 95,
    "isActive": false,
    "color": null,
    "index":8, 
  },
  {
    "val": 15,
    "isActive": false,
    "color": null,
    "index":0, 
  },
  {
    "val": 65,
    "isActive": false,
    "color": null,
    "index":5, 
  },
  {
    "val": 75,
    "isActive": false,
    "color": null,
    "index":6, 
  },
  {
    "val": 105,
    "isActive": false,
    "color": null,
    "index":9, 
  }
]