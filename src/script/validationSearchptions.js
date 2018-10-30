var filledOptions; //array.push(obj)

function validateSearchOptions(){
	if (!validateBasicOptions()){
		//bad
		return false;
	}
	if (!validateMagnitudes()){
		//bad
		return false;
	}
	if (!validateMagnitudes()){
		//bad
		return false;
	}
	if (!validateDates()){
		//bad
		return false;
	}
	if (!validateCoordinates()){
		//bad
		return false;
	}
	return true;
}

// ObjectId, Class, SublClass, Number of Observations
// Class Probability, Period, Has CrossMatch
function validateBasicOptions(){
	//TODO ObjectId, Class, SublClass, Has crossmatch
	if (!validateRangeVars("minobs","maxnobs") && !validateRangeVars("minpclass","maxpclass")
		&& !validateRangeVars("minp","maxp")){
		return false;
	}
	return true;
}

// for all bands
function validateMagnitudes(){
	var anyBand = document.getElementbyId("anyBand").checked;
	if (anyBand){
		return validateBandMagnitude("G");
	} else {
		return validateBandMagnitude("U") && validateBandMagnitude("G") 
				&& validateBandMagnitude("R") && validateBandMagnitude("I")
				&& validateBandMagnitude("Z") && validateBandMagnitude("Y");
	}
}

// String band=U,G,R,I,Z,Y
// Min, Max, Slope, Mean, RMS,last magn.
function validateBandMagnitude(band){
	var strMin="min";
	var strMax="max";
	var strSlope="Slope";
	var strMean="Mean";
	var strRms="Rms";
	var strLast="Lastmag";

	var min = strMin.concat(band);
	var max = strMax.concat(band);
	var minSlope = strMin.concat(strSlope,band);
	var maxSlope = strMax.concat(strSlope,band);
	var minMean = strMin.concat(strMean,band);
	var maxMean = strMax.concat(strMean,band);
	var minRms = strMin.concat(strRms,band);
	var maxRms = strMax.concat(strRms,band);
	var minLast = strMin.concat(strLast,band);
	var maxLast = strMax.concat(strLast,band);

	//TODO min & max

	if (!validateRangeVars(minSlope,maxSlope) && !validateRangeVars(minMean,maxMean)
		&& !validateRangeVars(minRms,maxRms) && !validateRangeVars(minLast,maxLast)){
		return false;
	}
	return true;
}

// First Alert, Last Alert, delta JD
function validateDates(){
	if (!validateRangeVars("minjd","maxjd")){
		return false;
	}
	
	//TODO Firt Alert, Last Alert
}

// Single or List
function validateCoordinates(){
	var single = document.getElementbyId("single-tab").checked;
	var list = document.getElementbyId("list-tab").checked;
	if (single && !list){
		return validateSingle();
	} else {
		return validateList();
	}
}

function validateSingle(){

}


function validateList(){

}

function isFilled(id){
	var value =document.getElementbyId(id).value;
	if (value != ""){
		filledOptions.push(id);
		return true;
	} else {
		return false;
	}
}

function validateRangeVars(minId,maxId){
	var min = document.getElementbyId(minId);
	var max = document.getElementbyId(maxId);
	if (isFilled(min.value) && isFilled(max.value)){
		if (min.value <= max.value){
			return true;
		} else {
			min.setCustomValidity("Are you sure this is a minimum?");
			max.setCustomValidity("Are you sure this is a maximum?");
			return false;
		}
	}
	return true;
}
