import { quickSortStop, isNewBands } from './appState';
import { getRandomColor, getRandomInt } from './utils';

export function startQuickSort (bands, setBands, startIndex, endIndex) {
	if(startIndex >= endIndex) { return; }

	const pivotIndex = getRandomInt(startIndex, endIndex)
	const pivot = bands[pivotIndex];
	const bandEndsColor = getRandomColor();
	bands[startIndex].color = bandEndsColor;
	bands[endIndex].color = bandEndsColor;
	pivot.isActive = true;
	pivot.index = "PIVOT"
	setBands(bands.slice());

	let greaterThanPivotIndex = startIndex;
	let lesserThanPivotIndex = endIndex;

	while( greaterThanPivotIndex < lesserThanPivotIndex ) {		
		greaterThanPivotIndex = findGreater(bands, greaterThanPivotIndex, pivot, endIndex);
		lesserThanPivotIndex = findLesser(bands, lesserThanPivotIndex, pivot, startIndex);

		if(greaterThanPivotIndex === -999 && lesserThanPivotIndex === -999){
			break;
		}

		greaterThanPivotIndex = greaterThanPivotIndex === -999 ? bands.indexOf(pivot) : greaterThanPivotIndex;
		lesserThanPivotIndex = lesserThanPivotIndex === -999 ? bands.indexOf(pivot) : lesserThanPivotIndex;
		//bands.indexOf(pivot) because the pivot itself may change position, 
		//such as when 0 is at the end of array at first is moved to the first of array as expected

		if (greaterThanPivotIndex < lesserThanPivotIndex ) {
			swap(bands, greaterThanPivotIndex, lesserThanPivotIndex);
		}

		else { break }
	}
	setBands(bands.slice());

	const timeOut = setTimeout(function(){

		if(quickSortStop.val) { 
			if(!isNewBands.val) {
				setBands(bands.slice().map(function(band){
					band.isActive = null;
					band.index = '';
					band.color = null;
					return band
				}));
			} 

			return 
		}

		bands[startIndex].color = null;
		bands[endIndex].color = null;
		pivot.isActive = false;
		pivot.index = null;
		setBands(bands.slice());		
		
		if(greaterThanPivotIndex === -999 && lesserThanPivotIndex === -999) { return ;}

		const splitIndex = findSplitIndex(pivot, bands, startIndex, endIndex);
		if(splitIndex){
			startQuickSort(bands, setBands, startIndex, splitIndex-1);  //left
		 	startQuickSort(bands, setBands, splitIndex, endIndex);  //right
		}
		else {
			startQuickSort(bands, setBands, startIndex, endIndex);  //left
		}
	}, 1000);
}	

function swap (array, indexA, indexB) {
	const objA = array[indexA];
	array[indexA] = array[indexB];
	array[indexB] = objA;
}

function findGreater(array, startIndex, pivot, terminateIndex) {
	if(!array[startIndex] || startIndex > terminateIndex) { return -999; }
	else if(array[startIndex].val > pivot.val) { return startIndex }
	else{ return findGreater(array, ++startIndex, pivot, terminateIndex)}
}

function findLesser(array, startIndex, pivot, terminateIndex) {
	if(!array[startIndex] || startIndex < terminateIndex) { return -999; }
	else if(array[startIndex].val < pivot.val) { return startIndex }
	else{ return findLesser(array, --startIndex, pivot, terminateIndex)}
}

function findSplitIndex(pivot, bands, startIndex, endIndex){
	let foundIndex = null;
	for (var i = startIndex; i <= endIndex; i++) {
		const band = bands[i];
		if(band.val > pivot.val){
			 foundIndex = i; 
			 break;
		}
	};
	return foundIndex;
}