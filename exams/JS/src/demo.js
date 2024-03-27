let numOfClicks = 0;
function q1(){
	document.getElementById("q1").innerHTML = "i've been clicked " + (++numOfClicks) + " times";
}


function q2(){
	const colors = ["red","yellow","green","pink","orange","black","blue","purple","grey"];
	const spans = document.getElementsByTagName("span");
	
	[...spans].forEach(spn => {
						spn.style.color = "white";
						spn.style.backgroundColor = colors[Math.floor(Math.random() *colors.length)];
						});
}

function q3(inputArr){
	document.getElementById("q3").innerHTML = squareArray(inputArr).toString();
}

function squareArray(inputArr){
	return inputArr.map(x => x*x);
}

function q4(inputArr){
	document.getElementById("q4").innerHTML = filterOnlyA(inputArr).toString();
}

function filterOnlyA(stringArr){
	return stringArr.filter(s => s.includes("a"));
}

function q5(buttonId){
	alert("was pressed by button with id: " + buttonId);
}

async function q6(){
	while(true){
		await sleep(1000);
		console.log("שלום");
	}
}

function sleep(milliseconds) {
	return new Promise(resolve => setTimeout(resolve, milliseconds));
}

function q13(selectTag){
	const selectedColor = selectTag.value;
	const bruhParagraph = document.getElementById("bruh");
	bruhParagraph.style.color = selectedColor;
}

function goToGoogle() {
    window.location.href = "https://www.google.com";
}
