import { isStopSorting } from '../appState';

let currentIndex= 0;

export function startNewSelectionSort(unsortedBands, setBands){
	currentIndex = 0;
	startSelectionSort (unsortedBands, setBands);
}

export function startSelectionSort (unsortedBands, setBands) {
	if(isStopSorting.val) { isStopSorting.val = false; return; }
	const newBands = unsortedBands.slice();

	const minIndex = findMin(newBands, currentIndex);

	if(minIndex === 'done') { return; }
	else {
		const holder = newBands[currentIndex];
		newBands[currentIndex].isActive = true;
		newBands[minIndex].isActive = true;
		setBands(newBands)
		setTimeout(function(){
			newBands[currentIndex] = newBands[minIndex];
			newBands[minIndex] = holder;
			setBands(newBands.slice())
			if(isStopSorting.val) { isStopSorting.val = false; return; }
			
			setTimeout(function(){
				newBands[currentIndex].isActive = false;
				newBands[minIndex].isActive = false;
				setBands(newBands.slice());

				if(isStopSorting.val) { isStopSorting.val = false; return; }

				startSelectionSort(newBands, setBands, ++currentIndex)
			}, 100)
		}, 50)
	}
}

function findMin (bands, startIndex) {
	if(startIndex === bands.length -1 ) { return 'done'; }

	let min = null;
	let minIndex = null;
	
	for (var i = startIndex; i < bands.length; i++) {
		const band = bands[i];
		if(band.val < min || min === null) { min = band.val; minIndex = i; }
	}

	return minIndex 
}