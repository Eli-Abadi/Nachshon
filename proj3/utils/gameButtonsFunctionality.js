function addPatrick() {
	if (animationInProgress != 0) {
		alert("wait for the animation to finish!!!");
	} else {
		if (availablePatSpots === 0) {
			alert(tooManyFightersMessage("patrick"));
		} else {
			fixPosition(patTypeId);
			prependFighterToContainer(patsContainer, patTypeId);
			availablePatSpots--;
		}
	}
}

function addSpongebob() {
	if (animationInProgress != 0) {
		alert("wait for the animation to finish!!!");
	} else {
		if (availableBobSpots === 0) {
			alert(tooManyFightersMessage("spongebob"));
		} else {
			fixPosition(patTypeId);
			prependFighterToContainer(bobsContainer, bobTypeId);
			availableBobSpots--;
		}
	}
}
function tooManyFightersMessage(fighterType) {
	return "Cannot add " + fighterType + "." +
		"\n There could be " + maxNumberOfFighters.toString() + " at most!";
}