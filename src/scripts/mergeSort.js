export function startMergeSort (bands, setBands) {
	let splitBands = bands.map(function(band){ band.color = getRandomColor(); return [band]; });
	while (Array.isArray(splitBands[1])) {
		setTimeout(function(){
			const newArray = [];
			for (var i = 0; i < splitBands.length; i+=2) {
				newArray.push(merge(splitBands[i], splitBands[i+1]));
			}
			splitBands = newArray
		}, 500) 
	}
	setBands(splitBands[0].slice());
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

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

