function setPathLoserImage(type) {
	if (type === bobTypeId) {
		DOMCurrentBobFighter.src = "./static/spongebobGohst.png";
	} else {
		DOMCurrentPatFighter.src = "./static/patrickGohst.png";
	}
}

function getTypeId(type){
	if(type === bobTypeId){
		return bobTypeId;
	} else{
		return patTypeId;
	}
}

function getTypeName(type){
	if(type === bobTypeId){
		return "spongebob";
	} else{
		return "patrick";
	}
}

function getOpositeType(type) {
	if (type === bobTypeId) {
		return patTypeId;
	} else {
		return bobTypeId;
	}
}

function getAvailSpots(type){
	if(type===bobTypeId){
		return availableBobSpots;
	} else{
		return availablePatSpots;
	}
}

function getFightersContainer(type) {
	if (type === bobTypeId) {
		return bobsContainer;
	} else {
		return patsContainer;
	}
}

function getCurrentDOMRepFighter(type) {
	if (type === bobTypeId) {
		return DOMCurrentBobFighter;
	} else {
		return DOMCurrentPatFighter;
	}
}

function setImages() {
	setPathLoserImage(bobTypeId);
	setPathLoserImage(patTypeId);
}

function getNonDomRepFighter(type){
	if(type===bobTypeId){
		return bobFightersNonDomRepresentations[bobFightersNonDomRepresentations.length-1];
	} else{
		return patFightersNonDomRepresentations[patFightersNonDomRepresentations.length-1];	
	}
}

function increaseNumberOfAvailSpots(type){
	if(type === bobTypeId){
		availableBobSpots++;
	} else {
		availablePatSpots++;
	}
}