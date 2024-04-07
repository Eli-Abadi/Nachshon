 const maxNumberOfFighters = 5;
 const upperLimitInitRandomFighters = 3;
 
 
 let availableBobSpots = maxNumberOfFighters;
 let availablePatSpots = maxNumberOfFighters;
  
 let bobsContainer;
 let patsContainer;
  
 let currentBobFighter;
 let currentPatFighter;
  
 let animationInProgress = 0;
  
 //these two are in miliseconds
 const fadeTime = 1000;
 const frameTime = 5;
  
  
 function initGame(){
  	initScreen();
  	document.getElementById('startWarButton').addEventListener('click', startWar);
  	document.getElementById('addSpongebobButton').addEventListener('click', addSpongebob);
  	document.getElementById('addPatrickButton').addEventListener('click', addPatrick);
 }
 
 
 function initScreen(){
  	cleanScreenInitial();
 	createAndDisplayFighters();
  	createArena();
 	initButtons();
 }
 
 function initAuras(){
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
  
 function cleanScreenInitial(){
  	document.getElementById("start").innerHTML = "";
 }
 
 
 function initCurrentFightersData(){
 	currentBobFighter = bobsContainer.lastElementChild;
 	currentPatFighter = patsContainer.lastElementChild;
 }
 
 function createAndDisplayFighters(){
  	const fightersContainer = document.createElement('div');
  	fightersContainer.id = "fighters-container";
  	fightersContainer.classList.add("fighters-container");
  	
  	createFighters("pat", fightersContainer);
	appendAuras(fightersContainer);
  	createFighters("bob", fightersContainer);
 	
  	initCurrentFightersData();
 	
 	fightersContainer.classList.add("mainScreenElements");
  	document.body.appendChild(fightersContainer);
 }
  
function appendAuras(fightersContainer){
	initAuras();
	fightersContainer.appendChild(document.getElementById("auras"));
}
 
 
 function createFighters(type, fightersContainer){
  	const numberOfFighters = Math.floor(Math.random() * upperLimitInitRandomFighters)+2;
  	
  	if(type == "bob"){
  		availableBobSpots = maxNumberOfFighters - numberOfFighters;
  	} else{
  		availablePatSpots = maxNumberOfFighters - numberOfFighters;
  	}
  	
  	const container = document.createElement('div');
  	
  	if(type == "pat"){
  		container.classList.add("pats-container");
  		container.id = "patsContainer";
 		patsContainer = container;
  	} else{
  		container.classList.add("bobs-container");
  		container.id = "bobsContainer";
 		bobsContainer = container;
  	}
  	
  	for(let i = 0; i < numberOfFighters; i++){	
  		appendFighterToContainerViaAppendingFunction(container, type ,"appendChild");
  	}
  	
  	fightersContainer.appendChild(container);
 }
  
 function appendFighterToContainerViaAppendingFunction(container, type, appFuncIndicator){
  	let f = new Fighter(type);
  		
  	const path = f.getPath();
  	const fImg = document.createElement("img");
	
	fImg.fighterData = f;
  	fImg.src = path;
  	if(type == "pat"){
  		fImg.classList.add("patrick");
  	} else{
  		fImg.classList.add("spongebob");
  	}
  	
	fImg.fought = false;
	
  	if(appFuncIndicator == "appendChild"){
  		container.appendChild(fImg);
  	} else if(appFuncIndicator == "prepend"){
  		container.prepend(fImg);
  	} else{
  		return -1;
  	}
 }
  
  
 function createArena(){
  	const arena = document.createElement('div');
  	arena.id = "arena";
 	arena.classList.add("mainScreenElements");
 		
  	document.body.appendChild(arena);
 }
  
 function initButtons(){
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
  	
 	buttonsDiv.classList.add("mainScreenElements");
 	
  	buttonsDiv.appendChild(buttonSpongebob);
  	buttonsDiv.appendChild(buttonPatrick);
  	buttonsDiv.appendChild(buttonStartWar);
  	
  	document.body.appendChild(buttonsDiv);
 }

 async function startWar(){
  	if(animationInProgress != 0){
  		alert("wait for the animation to finish!!!");
  	} else {
  	
  		animationInProgress = 1;
 		await animateFight();
		
		const bobFighter = currentBobFighter.fighterData;
  		const patFighter = currentPatFighter.fighterData;
  		
  		let winner = bobFighter.fight(patFighter);
		
		bobFighter.fought = true;
		patFighter.fought = true;
		
 		
 		if(winner=="tie"){
			await tie();
 		}
  		
  		if(winner == "pat"){
			await loser("bob");
  		}
  		
  		if(winner == "bob"){
			await loser("pat");
  		}
		
  		animationInProgress = 0;
  	}
 }
 
 
 function gameOverScreen(winner){
	
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
 
 function gameOverMessage(winner){
	if(winner == "bob"){
		return "Spongebob Won!";
	} else if(winner == "pat"){
		return "Patrick Won! \n spongebob is still better tho :)";
	} else{
		return "Tie! \n spongebob is still better tho :)";
	}
 }
 
 async function tie(){

	const numOfBobs = bobsContainer.children.length;
	const numOfPats = patsContainer.children.length;
	
	await tieAnimation();
	
	
	if( (numOfBobs == 1) && (numOfPats == 1) ){
		gameOverScreen("tie");
	} else if (numOfBobs == 1){
		gameOverScreen("pat");
	} else if(numOfPats == 1){
		gameOverScreen("bob");
	}
	
	bobsContainer.removeChild(currentBobFighter);
	currentBobFighter = bobsContainer.lastElementChild;
	
	patsContainer.removeChild(currentPatFighter);
	currentPatFighter = patsContainer.lastElementChild;
	
 }
 
 async function tieAnimation(){
	
	const destination = bobsContainer.getBoundingClientRect().top;
	const startingPosBob = currentBobFighter.getBoundingClientRect().top;
	const startingPosPat = currentPatFighter.getBoundingClientRect().top;
	let distBob = Math.abs(startingPosBob - destination);
	let distPat = Math.abs(startingPosPat - destination);
	
	await fadeOutFighters();
	setVisable();
	setImages();
	setInvisible();
	await fadeInFighters();
	
	let posOffsetBob = startingPosBob;
	let posOffsetPat = startingPosPat;
	
	while((distBob>0) && (distPat>0)){
		await sleep(frameTime);
		
		if(distBob >0){
			currentBobFighter.style.top = posOffsetBob + 'px';
		}
		
		if(distPat > 0){
			currentPatFighter.style.top = posOffsetPat + 'px';
		}
		
		distBob --;
		posOffsetBob--;
		
		distPat --;
		posOffsetPat --;
	}
	await fadeOutFighters();
 }
 
 function setInvisible(){
	currentBobFighter.style.opacity = 1;
	currentPatFighter.style.opacity = 1;
 }
 
 function setVisable(){
	currentBobFighter.style.opacity = 0;
	currentPatFighter.style.opacity = 0;
 }
 
 function setImages(){
	getPathLoserImage("bob");
	getPathLoserImage("pat");
 }
 
 async function fadeOutFighters(){
	setVisable();
	currentBobFighter.classList.add("fadeOut");
	currentPatFighter.classList.add("fadeOut");
	await sleep(fadeTime);
	currentBobFighter.classList.remove("fadeOut");
	currentPatFighter.classList.remove("fadeOut");
 }
 
 async function fadeInFighters(){
	setInvisible();
	currentPatFighter.classList.add("fadeIn");
	currentBobFighter.classList.add("fadeIn");
	await sleep(fadeTime);
	currentPatFighter.classList.remove("fadeIn");
	currentBobFighter.classList.remove("fadeIn");
 }
 
 async function loser(type){
	 
	const loserFightersContainer = getFightersContainer(type);
	let currentFighterLoserType = getCurrentFighter(type);
	const numOfFightersOfLoserType = loserFightersContainer.children.length;
		
	await loserAnimation(type);

	if( numOfFightersOfLoserType == 1 ){
		gameOverScreen(getOpositeType(type));
	}
	
	newCurrentFighter(type);
	setFoughtFalse(type);
	fixPosition(getOpositeType(type));
 }
 
function fixPosition(type){
	const currentFighter = getCurrentFighter(type);
	
	typeRect = currentFighter.getBoundingClientRect();
	currentFighter.style.bottom = (typeRect.bottom+typeRect.height).toString() + 'px';
}
 
 
 function newCurrentFighter(type){
	 if(type == "bob"){
		bobsContainer.removeChild(currentBobFighter);
		currentBobFighter = bobsContainer.lastElementChild;
	 } else{
		patsContainer.removeChild(currentPatFighter);
		currentPatFighter = patsContainer.lastElementChild;
	 }
 }
 
 function setFoughtFalse(type){
	 if(type == "bob"){
		 currentBobFighter.fighterData.fought = false;
	 } else{
		 currentPatFighter.fighterData.fought = false;
	 }
 }
 
function getFightersContainer(type){
	if(type == "bob"){
		return bobsContainer;
	} else{
		return patsContainer;
	}
}
 
 function getCurrentFighter(type){
	 if(type == "bob"){
		 return currentBobFighter;
	 } else{
		 return currentPatFighter;
	 }
 }
 
async function loserAnimation(type){
	
	const currentFighter = getCurrentFighter(type);
	const destination = bobsContainer.getBoundingClientRect().top;
	const startingPos = currentBobFighter.getBoundingClientRect().top;
	let dist = Math.abs(startingPos - destination);
	

	await fadeOutFighter(type);
	getPathLoserImage(type);
	currentFighter.style.opacity = 1;
	await fadeInFighter(type);
	
	
	let posOffset = startingPos;

	while(dist>0){
		await sleep(frameTime);
		currentFighter.style.top = posOffset.toString() + 'px';
		dist --;
		posOffset--;
	}
	await fadeOutFighter(type);
}

async function fadeOutFighter(type){
	if(type == "bob"){
		currentBobFighter.style.opacity = 0;
		currentBobFighter.classList.add("fadeOut");
		await sleep(fadeTime);
		currentBobFighter.classList.remove("fadeOut");
		currentBobFighter.style.opacity = 1;
	} else {
		currentPatFighter.style.opacity = 0;
		currentPatFighter.classList.add("fadeOut");
		await sleep(fadeTime);
		currentPatFighter.classList.remove("fadeOut");
		currentPatFighter.style.opacity = 1;
	}
}

async function fadeInFighter(type){
	if(type == "bob"){
		currentBobFighter.style.opacity = 1;
		currentBobFighter.classList.add("fadeIn");
		await sleep(fadeTime);
		currentBobFighter.classList.remove("fadeIn");
	} else {
		currentPatFighter.style.opacity = 1;
		currentPatFighter.classList.add("fadeIn");
		await sleep(fadeTime);
		currentPatFighter.classList.remove("fadeIn");
	}
}

function getPathLoserImage(type){
	if(type=="bob"){
		currentBobFighter.src = "./static/spongebobGohst.png";
	}else{
		currentPatFighter.src = "./static/patrickGohst.png";
	}
}

function getOpositeType(type){
	if(type == "bob"){
		return "pat";
	} else{
		return "bob";
	}
}	

 async function animateFight() {
 	await animateToArena();
 	await animateToEachOther();
 }
 
 async function animateToEachOther(){

	const arena = document.querySelector("#arena");
  	const arenaBoundingRect = arena.getBoundingClientRect();
	
	const arenaCenter = arenaBoundingRect.left + (arenaBoundingRect.width / 2);
	let dist = 0.7*arenaCenter;
	let posOffset = 0;
	
	const animateBob = toAnimate(currentBobFighter);
	const animatePat = toAnimate(currentPatFighter);

	while(dist>0){
		await sleep(frameTime);
		
		if(animateBob){
			currentBobFighter.style.left = (-1*posOffset) + 'px';
		}
		
		if(animatePat){
			currentPatFighter.style.left = posOffset + 'px';
		}
		
		dist --;
		posOffset++;
	}
 }
 
 function toAnimate(fighterDOMRepresentation){
	return !(fighterDOMRepresentation.fighterData.fought);
 }
 
 async function animateToArena(){

 	const arena = document.querySelector("#arena");
  	const arenaTop = arena.getBoundingClientRect().top;
 	let bobTop = currentBobFighter.getBoundingClientRect().top;
 	let patTop = currentPatFighter.getBoundingClientRect().top;
 	
 	let bobDistance = bobTop - arenaTop;
 	let patDistance = patTop - arenaTop;
 	
 	let posOffset = 0;
	
	const animateBob = toAnimate(currentBobFighter);
	const animatePat = toAnimate(currentPatFighter);
	
 	while(	((bobDistance < 0)&&(toAnimate(currentBobFighter)))
			|| 
			((patDistance < 0)&&(toAnimate(currentPatFighter)))){
 		
 		await sleep(frameTime);	
 		
 		if((bobDistance < 0)  && animateBob){
			bobDistance++;
			currentBobFighter.style.top = posOffset + 'px';
 		}
  
 		if((patDistance < 0)  && animatePat){
			patDistance++;
			currentPatFighter.style.top = posOffset + 'px'; 
 		}
  
 		posOffset++;
 	}
 }
 
	
 
 function sleep(milliseconds) {
 	return new Promise(resolve => setTimeout(resolve, milliseconds));
 }

  
 function addSpongebob(){
 	if(animationInProgress != 0){
  		alert("wait for the animation to finish!!!");
  	} else {
 		if(availableBobSpots == 0){
			alert(tooManyFightersMessage("spongebob"));
 		} else{
		  appendFighterToContainerViaAppendingFunction(bobsContainer, "bob" ,"prepend");
		  availableBobSpots--;
 		}
 	}
 }
  
 function addPatrick(){
 	if(animationInProgress != 0){
  		alert("wait for the animation to finish!!!");
  	} else {
 		if(availablePatSpots == 0){
			alert(tooManyFightersMessage("patrick"));
 		} else{
			appendFighterToContainerViaAppendingFunction(patsContainer, "pat" ,"prepend");
			availablePatSpots--;
 		}
 	}
 }
  
 function tooManyFightersMessage(fighterType){
  	return 	"Cannot add " + fighterType + "." +
  "\n There could be " + maxNumberOfFighters.toString() + " at most!";
 }