import { isStopSorting } from './appState';

export function startBubbleSort (unsortedBands, setBands){
  recurrSwapBand(unsortedBands.slice(), 0, {val:false}, unsortedBands.length-1, setBands);
} 

function recurrSwapBand (bands, index, hasChanged, counter, setBands) {
	if(isStopSorting.val) { isStopSorting.val = false; return; }

	if(index === counter && hasChanged.val){
	  hasChanged.val = false;
	  recurrSwapBand (bands, 0, hasChanged, counter-1, setBands) 
	  return;
	}
	else if(index === counter && hasChanged.val){ return; }

	const current = bands[index];
	const next = bands[index+1];
	current.isActive = true;
	next.isActive = true;

	if (current.val > next.val) {
	  bands[index] = next;
	  bands[index+1] = current;
	  hasChanged.val = true;
	}

	setBands(bands.slice());

	if (index !== counter) {
	  setTimeout(function(){
	    current.isActive = false;
	    next.isActive = false;
	    recurrSwapBand(bands, index+1, hasChanged, counter, setBands)
	  }, 50)
	}
}
