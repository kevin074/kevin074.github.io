import { isSorting, isStopSorting } from './appState';

export function startSelectionSort (unsortedBands, setBands, currentIndex) {
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

			
			setTimeout(function(){
				newBands[currentIndex].isActive = false;
				newBands[minIndex].isActive = false;
				setBands(newBands.slice());

				startSelectionSort(newBands, setBands, currentIndex+1)
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