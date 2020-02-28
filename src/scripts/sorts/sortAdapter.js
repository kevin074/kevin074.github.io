import { startNewBubbleSort, recurrSwapBand as restartBubbleSort } from './bubbleSort';
import { startSelectionSort, startNewSelectionSort } from './selectionSort';
import { startMergeSort } from './mergeSort';
import { startQuickSort } from './quickSort';
import { isSorting, isStopSorting, quickSortStop, currentSort } from '../appState';

function initSort (cb){
  if(isSorting.val) { return }
  isSorting.val = true;
  isStopSorting.val = false;
  cb();
}

export const bubbleSort = function(bands, setBands){    
  currentSort.val = restartBubbleSort;
  initSort(startNewBubbleSort.bind(null, bands, setBands)); 
}
export const selectionSort = function(bands, setBands){ 
  currentSort.val = startSelectionSort;
  initSort(startNewSelectionSort.bind(null, bands, setBands, 0)); 
}
export const mergeSort = function(bands, setBands){     
  currentSort.val = mergeSort;
  initSort(startMergeSort.bind(null, bands, setBands)); 
}
export const quickSort = function(bands, setBands){     
  quickSortStop.val = false; 
  currentSort.val = quickSort;
  initSort(startQuickSort.bind(null, bands, setBands, 0, bands.length-1));
}



