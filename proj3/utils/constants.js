const maxNumberOfFighters = 5;
const upperLimitInitRandomFighters = 3;

const bobTypeId = "bob";
const patTypeId = "pat";
const tieId = "tie";

 //these two are in miliseconds
 const fadeTime = 1000;
 const frameTime = 5;

let availableBobSpots = maxNumberOfFighters;
let availablePatSpots = maxNumberOfFighters;

let bobsContainer;
let patsContainer;

let DOMCurrentBobFighter;
let DOMCurrentPatFighter;

let bobFightersNonDomRepresentations = [];
let patFightersNonDomRepresentations = [];