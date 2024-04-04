function initGame() {
	initScreen();
	document.getElementById('startWarButton').addEventListener('click', startWar);
	document.getElementById('addSpongebobButton').addEventListener('click', addSpongebob);
	document.getElementById('addPatrickButton').addEventListener('click', addPatrick);
}