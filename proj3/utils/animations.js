function sleep(milliseconds) {
	return new Promise(resolve => setTimeout(resolve, milliseconds));
}

async function tieAnimation() {

	const arenaTop = document.getElementById("arena").getBoundingClientRect().top;

	let posOffsetBob = Math.abs(DOMCurrentBobFighter.getBoundingClientRect().top - DOMCurrentBobFighter.getBoundingClientRect().bottom);
	let posOffsetPat = Math.abs(DOMCurrentPatFighter.getBoundingClientRect().top - DOMCurrentPatFighter.getBoundingClientRect().bottom);
	let distBob = Math.abs(arenaTop - posOffsetBob);
	let distPat = Math.abs(arenaTop - posOffsetPat);

	await fadeOutFighters();
	setVisable();
	setImages();
	setInvisible();
	await fadeInFighters();

	while ((DOMCurrentBobFighter.getBoundingClientRect().top > 0) || (DOMCurrentPatFighter.getBoundingClientRect().top > 0)) {
		await sleep(frameTime);

		if (DOMCurrentBobFighter.getBoundingClientRect().top > 0) {
			DOMCurrentBobFighter.style.top = posOffsetBob + 'px';
			distBob--;
			posOffsetBob--;
		}

		if (DOMCurrentPatFighter.getBoundingClientRect().top > 0) {
			DOMCurrentPatFighter.style.top = posOffsetPat + 'px';
			distPat--;
			posOffsetPat--;
		}
	}
	await fadeOutFighters();
}

function setInvisible() {
	DOMCurrentBobFighter.style.opacity = 1;
	DOMCurrentPatFighter.style.opacity = 1;
}

function setVisable() {
	DOMCurrentBobFighter.style.opacity = 0;
	DOMCurrentPatFighter.style.opacity = 0;
}

async function fadeOutFighters() {
	setVisable();
	DOMCurrentBobFighter.classList.add("fadeOut");
	DOMCurrentPatFighter.classList.add("fadeOut");
	await sleep(fadeTime);
	DOMCurrentBobFighter.classList.remove("fadeOut");
	DOMCurrentPatFighter.classList.remove("fadeOut");
}

async function fadeInFighters() {
	setInvisible();
	DOMCurrentPatFighter.classList.add("fadeIn");
	DOMCurrentBobFighter.classList.add("fadeIn");
	await sleep(fadeTime);
	DOMCurrentPatFighter.classList.remove("fadeIn");
	DOMCurrentBobFighter.classList.remove("fadeIn");
}

function fixPosition(type) {
	const currentFighterNonDomRep = getNonDomRepFighter(type);
	if(currentFighterNonDomRep.fought){
		const currentFighter = getCurrentDOMRepFighter(type);
		typeRect = currentFighter.getBoundingClientRect();
		currentFighter.style.top = (typeRect.top - typeRect.height).toString() + 'px';
	}
}


async function loserAnimation(type) {

	const currentFighter = getCurrentDOMRepFighter(type);
	const arenaTop = document.getElementById("arena").getBoundingClientRect().top;

	let posOffset = Math.abs(currentFighter.getBoundingClientRect().top - currentFighter.getBoundingClientRect().bottom);
	let dist = Math.abs(arenaTop - posOffset);


	await fadeOutFighter(type);
	setPathLoserImage(type);
	currentFighter.style.opacity = 1;
	await fadeInFighter(type);


	while (currentFighter.getBoundingClientRect().top > 0) {
		await sleep(frameTime);
		currentFighter.style.top = posOffset.toString() + 'px';
		dist--;
		posOffset--;
	}
	await fadeOutFighter(type);
}

async function fadeInFighter(type) {
	if (type === bobTypeId) {
		DOMCurrentBobFighter.style.opacity = 1;
		DOMCurrentBobFighter.classList.add("fadeIn");
		await sleep(fadeTime);
		DOMCurrentBobFighter.classList.remove("fadeIn");
	} else {
		DOMCurrentPatFighter.style.opacity = 1;
		DOMCurrentPatFighter.classList.add("fadeIn");
		await sleep(fadeTime);
		DOMCurrentPatFighter.classList.remove("fadeIn");
	}
}

async function animateFight() {
	await animateToArena();
	await animateToEachOther();
}

async function animateToEachOther() {

	const arena = document.querySelector("#arena");
	const arenaBoundingRect = arena.getBoundingClientRect();

	const arenaCenter = arenaBoundingRect.left + (arenaBoundingRect.width / 2);
	let dist = 0.7 * arenaCenter;
	let posOffset = 0;

	const animateBob = toAnimate(bobTypeId);
	const animatePat = toAnimate(patTypeId);

	while (dist > 0) {
		await sleep(frameTime);

		if (animateBob) {
			DOMCurrentBobFighter.style.left = (-1 * posOffset) + 'px';
		}

		if (animatePat) {
			DOMCurrentPatFighter.style.left = posOffset + 'px';
		}

		dist--;
		posOffset++;
	}
}

function toAnimate(type) {
	const curr = getNonDomRepFighter(type);
	return !(curr.fought);
}

async function animateToArena() {

	const arena = document.querySelector("#arena");
	const arenaTop = arena.getBoundingClientRect().top;
	let bobTop = DOMCurrentBobFighter.getBoundingClientRect().top;
	let patTop = DOMCurrentPatFighter.getBoundingClientRect().top;

	let bobDistance = bobTop - arenaTop;
	let patDistance = patTop - arenaTop;

	let posOffset = 0;

	const animateBob = toAnimate(bobTypeId);
	const animatePat = toAnimate(patTypeId);

	while (((bobDistance < 0) && (toAnimate(bobTypeId)))
		||
		((patDistance < 0) && (toAnimate(patTypeId)))) {

		await sleep(frameTime);

		if ((bobDistance < 0) && animateBob) {
			bobDistance++;
			DOMCurrentBobFighter.style.top = posOffset + 'px';
		}

		if ((patDistance < 0) && animatePat) {
			patDistance++;
			DOMCurrentPatFighter.style.top = posOffset + 'px';
		}

		posOffset++;
	}
}

async function fadeOutFighter(type) {
	if (type === bobTypeId) {
		DOMCurrentBobFighter.style.opacity = 0;
		DOMCurrentBobFighter.classList.add("fadeOut");
		await sleep(fadeTime);
		DOMCurrentBobFighter.classList.remove("fadeOut");
		DOMCurrentBobFighter.style.opacity = 1;
	} else {
		DOMCurrentPatFighter.style.opacity = 0;
		DOMCurrentPatFighter.classList.add("fadeOut");
		await sleep(fadeTime);
		DOMCurrentPatFighter.classList.remove("fadeOut");
		DOMCurrentPatFighter.style.opacity = 1;
	}
}