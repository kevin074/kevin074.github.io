import { isStopSorting } from './appState';

var index= 0, 
	hasChanged= {val:false}, 
	counter= 0;

export function startNewBubbleSort (unsortedBands, setBands){
   index = 0; 
   hasChanged.val = false;
   counter = unsortedBands.length-1;
   recurrSwapBand(unsortedBands.slice(), setBands);
} 

export function recurrSwapBand (bands, setBands) {
	if (isStopSorting.val) { return; }

	if (index === counter && hasChanged.val) {
	  hasChanged.val = false;
	  counter--;
	  index= 0;
	  recurrSwapBand (bands, setBands) 
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
	    index++;
	    recurrSwapBand(bands, setBands)
	  }, 50)
	}
}
