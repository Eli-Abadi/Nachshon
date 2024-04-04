let animationInProgress = false;

async function startWar() {
	if (animationInProgress === true) {
		alert("wait for the animation to finish!!!");
	} else {

		animationInProgress = true;
		await animateFight();

		const bobFighter = getNonDomRepFighter(bobTypeId);
		const patFighter = getNonDomRepFighter(patTypeId);

		let winner = fight(bobFighter, patFighter);

		setFoughtTrueNonDomRepFighter(bobFighter);
		setFoughtTrueNonDomRepFighter(patFighter);

		if (winner === tieId) {
			await tie();
		}

		if (winner === patTypeId) {
			await loser(bobTypeId);
		}

		if (winner === bobTypeId) {
			await loser(patTypeId);
		}

		animationInProgress = false;
	}
}

function gameOverScreen(winner) {

	document.body.innerHTML = "";

	const gameOverScreenContent = document.createElement('div');
	gameOverScreenContent.classList.add("finalScreen");

	const fireworks = document.createElement('div');
	fireworks.textContent = gameOverMessage(winner);
	fireworks.id = "fireworks";

	const spongebobGif = document.createElement('img');
	spongebobGif.src = "./static/spongebobWin.GIF";
	spongebobGif.id = "bobWinGif";

	const patrickGif = document.createElement('img');
	patrickGif.src = "./static/patrickWin.GIF";
	patrickGif.id = "patWinGif";

	document.body.appendChild(gameOverScreenContent);

	gameOverScreenContent.appendChild(patrickGif);
	gameOverScreenContent.appendChild(fireworks);
	gameOverScreenContent.appendChild(spongebobGif);

}

function gameOverMessage(winner) {
	if (winner === bobTypeId) {
		return "Spongebob Won!";
	} else if (winner === patTypeId) {
		return "Patrick Won! \n spongebob is still better tho :)";
	} else {
		return "Tie! \n spongebob is still better tho :)";
	}
}

async function tie() {

	const numOfBobs = maxNumberOfFighters - availableBobSpots;
	const numOfPats = maxNumberOfFighters - availablePatSpots;

	await tieAnimation();


	if ((numOfBobs === 1) && (numOfPats === 1)) {
		gameOverScreen(tieId);
	} else if (numOfBobs === 1) {
		gameOverScreen(patTypeId);
	} else if (numOfPats === 1) {
		gameOverScreen(bobTypeId);
	}

	newCurrentFighter(bobTypeId);
	newCurrentFighter(patTypeId);

	increaseNumberOfAvailSpots(bobTypeId);
	increaseNumberOfAvailSpots(patTypeId);
}

async function loser(type) {

	const loserFightersContainer = getFightersContainer(type);
	const numOfFightersOfLoserType = loserFightersContainer.children.length;

	await loserAnimation(type);

	if (numOfFightersOfLoserType === 1) {
		gameOverScreen(getOpositeType(type));
	}

	newCurrentFighter(type);

	increaseNumberOfAvailSpots(type);
}

function newCurrentFighter(type) {
	if (type === bobTypeId) {
		bobsContainer.removeChild(DOMCurrentBobFighter);
		DOMCurrentBobFighter = bobsContainer.lastElementChild;
		bobFightersNonDomRepresentations.pop();
	} else {
		patsContainer.removeChild(DOMCurrentPatFighter);
		DOMCurrentPatFighter = patsContainer.lastElementChild;
		patFightersNonDomRepresentations.pop();
	}
}