import * as _ from 'lodash';
import { isStopSorting } from './appState';
import { getRandomColor } from './utils';

export function startMergeSort (bands, setBands) {
	if(isStopSorting.val) { isStopSorting.val = false; return; }

	let splitBands = !Array.isArray(bands[0]) ? 
		bands.slice().map(function(band){ band.color = getRandomColor(); return [band]; }) : 
		bands.slice();

	const newArray = [];
	for (var i = 0; i < splitBands.length; i+=2) {
		newArray.push(merge(splitBands[i], splitBands[i+1]));
	}
	splitBands = newArray

	if( Array.isArray(splitBands[1]) ){ 
		setBands(_.flatten(splitBands));
		setTimeout(startMergeSort.bind(null, splitBands, setBands), 1000)  
	}
	else{ 
		setBands(splitBands.slice()[0]) 
	}
}

function merge (arrayA, arrayB){
	if(!arrayB && arrayA) { return arrayA };

	const finalArray = [];
	let indexA = 0;
	let indexB = 0;
	var notDoneSorting = true;
	const commonColor = getRandomColor();
	while (notDoneSorting) {
		const bandA = arrayA[indexA];
		const bandB = arrayB[indexB];

		if(!bandA && bandB) {
			bandB.color = commonColor;
			finalArray.push(bandB);
			indexB += 1;
		}
		else if(bandA && !bandB) {
			bandA.color = commonColor;
			finalArray.push(bandA);
			indexA += 1;
		}
		else if (bandA.val > bandB.val) {
			bandB.color = commonColor;
			finalArray.push(bandB);
			indexB += 1;
		}
		else {
			bandA.color = commonColor;
			finalArray.push(bandA);
			indexA += 1;
		}

		if(finalArray.length === arrayA.length + arrayB.length) {
			notDoneSorting = false;
		}
	}

	return finalArray;
}
