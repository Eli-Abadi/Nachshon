function initScreen() {
	cleanScreenInitial();
	const mainScreenElementsDiv = document.createElement("div");
	mainScreenElementsDiv.id = "mainScreenElements";
	mainScreenElementsDiv.classList.add("mainScreenElements");
	document.body.appendChild(mainScreenElementsDiv);

	createAndDisplayFighters();
	createArena();
	initButtons();
}

function initAuras() {
	const aurasDiv = document.createElement("div");
	aurasDiv.id = "auras";
	aurasDiv.classList.add("auras");

	const bobAura = document.createElement("img");
	bobAura.src = "./static/bobAura.png";
	bobAura.id = "bobAura";

	const spaceBetweenAuras = document.createElement('img');
	spaceBetweenAuras.src = "./static/spacing.png";
	spaceBetweenAuras.id = "spaceBetweenAuras";

	const patAura = document.createElement("img");
	patAura.src = "./static/patAura.png";
	bobAura.id = "patAura";

	aurasDiv.appendChild(patAura);
	aurasDiv.appendChild(spaceBetweenAuras);
	aurasDiv.appendChild(bobAura);

	document.body.appendChild(aurasDiv);
}

function cleanScreenInitial() {
	document.body.innerHTML = "";
}

function initCurrentFightersData() {
	DOMCurrentBobFighter = bobsContainer.lastElementChild;
	DOMCurrentPatFighter = patsContainer.lastElementChild;
}

function createAndDisplayFighters() {
	const fightersContainer = document.createElement('div');
	fightersContainer.id = "fighters-container";
	fightersContainer.classList.add("fighters-container");

	createFighters(patTypeId, fightersContainer);
	appendAuras(fightersContainer);
	createFighters(bobTypeId, fightersContainer);

	initCurrentFightersData();

	document.getElementById("mainScreenElements").appendChild(fightersContainer);
}

function appendAuras(fightersContainer) {
	initAuras();
	fightersContainer.appendChild(document.getElementById("auras"));
}

function createFighters(type, fightersContainer) {
	const numberOfFighters = Math.ceil(Math.random() * upperLimitInitRandomFighters) + 1;

	if (type === bobTypeId) {
		availableBobSpots = maxNumberOfFighters - numberOfFighters;
	} else {
		availablePatSpots = maxNumberOfFighters - numberOfFighters;
	}

	const container = document.createElement('div');

	if (type === patTypeId) {
		container.classList.add("pats-container");
		container.id = "patsContainer";
		patsContainer = container;
	} else {
		container.classList.add("bobs-container");
		container.id = "bobsContainer";
		bobsContainer = container;
	}

	for (let i = 0; i < numberOfFighters; i++) {
		appendFighterToContainer(container, type);
	}

	fightersContainer.appendChild(container);
}

function appendFighterToContainer(container, type) {
	const res = createDOMAndNonDOMFighter(type);
	container.appendChild(res.ImgElement);
	appendNonDomContainer(res.fighter);
}

function prependFighterToContainer(container, type) {
	const res = createDOMAndNonDOMFighter(type);
	container.prepend(res.ImgElement);
	prependNonDomContainer(res.fighter);
}

function createDOMAndNonDOMFighter(type) {
	const f = new createNonDOMFighter(type);
	const path = getPath(f);
	const fImg = document.createElement("img");
	fImg.src = path;
	return {ImgElement: fImg, fighter: f};
}

function appendNonDomContainer(fighter){
	if(fighter.kind === bobTypeId){
		bobFightersNonDomRepresentations.push(fighter);
	} else{
		patFightersNonDomRepresentations.push(fighter);
	}
}

function prependNonDomContainer(fighter){
	if(fighter.kind === bobTypeId){
		bobFightersNonDomRepresentations = [fighter, ...bobFightersNonDomRepresentations];
	} else{
		patFightersNonDomRepresentations =[fighter, ...patFightersNonDomRepresentations];;
	}
}

function createArena() {
	const arena = document.createElement('div');
	arena.id = "arena";
	document.getElementById("mainScreenElements").appendChild(arena);
}

function initButtons() {
	const buttonsDiv = document.createElement('div');
	buttonsDiv.id = "buttonsDiv";

	const buttonSpongebob = document.createElement('button');
	const buttonPatrick = document.createElement('button');
	const buttonStartWar = document.createElement('button');

	buttonSpongebob.id = "addSpongebobButton";
	buttonPatrick.id = "addPatrickButton";
	buttonStartWar.id = "startWarButton";


	buttonSpongebob.textContent = "Add Spongebob";
	buttonPatrick.textContent = "Add Patrick";
	buttonStartWar.textContent = "Start War";


	buttonsDiv.appendChild(buttonPatrick);
	buttonsDiv.appendChild(buttonStartWar);
	buttonsDiv.appendChild(buttonSpongebob);

	document.getElementById("mainScreenElements").appendChild(buttonsDiv);
}