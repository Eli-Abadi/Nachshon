const weak = "Weak";
const strong = "Strong";

function createNonDOMFighter(type) {
	const strength = randomizeStrength();
	const direction = animationDirection(type);

	const res = {
					kind: type,
					strength: strength,
					animationDirection: direction,
					fought: false
				};
	return res;	
}


function randomizeStrength() {
	const indicator = Math.floor(Math.random() * 2) + 1;
	if (indicator == 1) {
		return weak;//weakSpongebob
	} else {
		return strong;//strongSpongebob
	}
}

function animationDirection(type) {
	if (type == bobTypeId) {
		return -1;
	} else {
		return 1;
	}
}

function getPath(fighter) {
	let res;
	if (fighter.strength === weak && fighter.kind === bobTypeId) {
		res = "./static/weakSpongebob.png";
	}

	if (fighter.strength === strong && fighter.kind === bobTypeId) {
		res =  "./static/mascularSpongebob.png";
	}

	if (fighter.strength === weak && fighter.kind === patTypeId) {
		res =  "./static/weakPatrick.png";
	}

	if (fighter.strength === strong && fighter.kind === patTypeId) {
		res =  "./static/mascularPatrick.png";
	}

	return res;
}


function fight(f1,f2) {
	let score1 = isWeak(f1) ? 0 : 1;
	let score2 = isWeak(f2) ? 0 : 1;

	const res = (score1 > score2) ? f1.kind : ((score1 === score2) ? tieId : f2.kind);
	return res;
}

function isWeak(fighter) {
	if (fighter.strength === weak) {
		return true;
	} else {
		return false;
	}
}

function setFoughtTrueNonDomRepFighter(fighter){
	fighter.fought = true;
}