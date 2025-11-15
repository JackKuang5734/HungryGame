// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import {
	onValue,
	get,
	onDisconnect,
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js"; // NEW

import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
//import * as joystick from './joystick.js';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyDrgE3R2Ost3nmD-F6a-TRxlNdArwLHUkk",
	authDomain: "gimblefreerobux.firebaseapp.com",
	databaseURL: "https://hungrygame.firebaseio.com/",
	projectId: "gimblefreerobux",
	storageBucket: "gimblefreerobux.appspot.com",
	messagingSenderId: "1032048641919",
	appId: "1:1032048641919:web:90e5e97e98495529457c4a",
};

const deathScreenQuotes = [
  "In the game of life, hunger prevails. Your journey ends here.	- Gandi",
  "The hunger consumes you, leaving nothing but a void. Game over.	- Boungiorno Brovanna",
  "Feasting or famine, the Hungry Game claims another victim.	- Bojack Horseman",
  "Your appetite led you astray. It's time to rest, forever.	- Franklin D Roosevelt",
  "The hunt for sustenance was your downfall. You have met your final course.	- Martin Luther King Jr",
  "In the realm of hunger, your time has expired. Farewell.		- Krusty the Clown",
  "The hunger grows silent as your spirit fades away. Your hunger game has ended.	Napolean Bonaparte",
  "Starvation has claimed its toll. Your name shall be forever forgotten in the Hungry Game.	- John F Kennedy",
  "No feast shall satisfy your cravings now. It's time to depart, lost in the Hungry Game.	- Sage from the hit competitive first person shooter Valorant, released in 2022",
  "Your hunger drove you to the edge, but now you fall into eternal darkness. Game over.	- King Henry IIIIIIIIIX",
  "I have a dream... of a world where hamburgers rain from the sky. - Martin Luther King Jr.",
  "The only thing we have to fear is running out of pizza toppings. - Franklin D. Roosevelt",
  "Give me liberty or give me a chocolate cake! - Patrick Henry",
  "I cannot tell a lie, I really love donuts. - George Washington",
  "The greatest glory in living lies not in never eating, but in rising every time we fall. - Nelson Mandela",
  "I came, I saw, I devoured the buffet. - Julius Caesar",
  "I have not failed. I've just found 10,000 ways that won't satisfy my hunger. - Thomas Edison",
  "Tear down this vending machine and let us feast! - Ronald Reagan",
  "One small step for a sandwich, one giant leap for mankind. - Neil Armstrong",
  "It is not the spoon that bends; it is only yourself that craves more ice cream. - Dalai Lama",
  "In the arena of life, even the mighty fall. Farewell, brave soul. - Julius Caesar",
  "The hunger for victory can devour the strongest among us. Rest in eternal peace. - Alexander the Great",
  "In the face of defeat, remember that death is but a temporary pause in the grand symphony of existence. - Ludwig van Beethoven",
  "The game of life is filled with challenges, but death is the final move. May your spirit find solace beyond the hunger. - Sun Tzu",
  "Though you may have fallen in the game, your legacy will forever remain undefeated in our hearts. - Mahatma Gandhi",
  "The hunger that consumes us in life is replaced by the tranquility that awaits beyond the veil. Farewell, fellow traveler. - Buddha",
  "The hungry maw of fate claims us all in the end. May your journey into the unknown be met with peace. - Cleopatra",
  "The game is over, but your spirit lives on. May your name echo through the annals of time. - Joan of Arc",
  "We are but players in the grand theater of life, and death is the final act. Rest well, my friend. - William Shakespeare",
  "The hungriest games are played in the realm of mortality, but our souls are forever nourished by the realm of eternity. - Leonardo da Vinci",
  "In the game of survival, death is the ultimate equalizer. May your spirit find eternal harmony. - Confucius",
  "Like a flickering flame, life can be extinguished in an instant. May your light shine on in the realms beyond. - Eleanor Roosevelt",
  "The hunger for conquest leads many to their demise. May your legacy transcend the mortal realm. - Genghis Khan",
  "Life's battles may be lost, but the war of existence rages on. Rest now, weary warrior. - Winston Churchill",
  "From the ashes of defeat, the phoenix of resilience emerges. May your spirit soar beyond the hunger. - Frida Kahlo",
  "The game is but a fleeting moment, a fragment in the tapestry of eternity. Farewell, brave challenger. - Galileo Galilei",
  "In the face of mortality, remember that the human spirit is immortal. May your essence endure forever. - Anne Frank",
  "Though the game may be over, the legacy of your courage will forever inspire. Rest in eternal glory. - Amelia Earhart",
  "Death, the great equalizer, reminds us of our shared humanity. May you find peace beyond the hunger. - Nelson Mandela",
  "Life's trials may be treacherous, but death grants us respite. Rest now, and let your spirit find serenity. - Marie Curie",
  "In the grand scheme of existence, death is a mere comma. Farewell, dear soul, until we meet again. - Isaac Newton",
  "The game of life may be cruel, but the human spirit perseveres. May your legacy be a testament to resilience. - Rosa Parks",
  "Amidst the hunger, remember that your spirit is indomitable. May it find eternal nourishment. - Albert Einstein",
  "In the face of mortality, let us remember that death is but a punctuation mark in the story of our souls. - Emily Dickinson",
  "Though defeated in the game, your spirit remains unconquerable. Rest now, and let your essence thrive. - Martin Luther King Jr.",
  "The journey of life is filled with pitfalls, but in death, we find freedom from its grip. Farewell, valiant soul. - Joan Miró",
  "In the arena of existence, death is the final applause. May your spirit continue to resonate through eternity. - Ludwig van Beethoven",
  "The hunger for glory can be all-consuming, but in death, we find release. Rest now, gallant warrior. - Joan of Arc",
  "Though the game has claimed you, your legacy will endure like an ancient monument. Farewell, noble champion. - Cleopatra"
];

//Variable declaration
//------------------------------------
let signUp;
let signup;
let textBox;
let login;
let userName;
let loginExclusive;
let username = "Mr Hungry";

let nameElement = document.getElementById("name");
let toggle = "signUp";
let title;

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

const theWorld = 0.08;

const screenscale = 0.8;

const playerDataBase = ref(database, "playersOnline");

let canvas;
let ctx;
let playerRotation;

let numPlayers = 0;
let objectTemplate;

let up = false;
let down = false;
let left = false;
let right = false;

let entityArray = [];

let player;

let mapLength = 0;

let map = getMap();

let entities = [];

let server = null;
let playerSeed = null;
let seedUpdateOnce = 3;
let selectIcon;

let mousePos;
let gameJustStarted = true;
let angleDeg;
let isHost = false;
let hovering = null;
let tryToPickUp = null;
let tryToAttack = false;

let startButton;
let controlGUI;
let menu;
let banner;
let attackDebounce = 0;
let lastAttack = 0;
let death = false;

let checkIndex;
let gotPlayerIndexInTheFirstPlace = false;
let tenth = 0;
let deathHundreth = 100;

let entityListNotBroken;

let neverShowAgain = false;

let imageList = [];

var jsonData = {
  "animation": {
    "initialized": "0",
    "type": ""
  },
  "health": "0",
  "holding": "",
  "imageSrc": "",
  "lastX": {
    "lastPositionX": "",
    "xApplied": [
      {
        "delta": "",
        "initializedTime": ""
      }
    ]
  },
  "lastY": {
    "lastPositionY": "",
    "yApplied": [
      {
        "delta": "",
        "initializedTime": ""
      }
    ]
  },
  "name": "noName",
  "seed": 0,
  "userName": ""
};



function checkNotify(){
  return  localStorage.getItem("notiSent") === "true";
}

// Function to send the push notification
function sendWelcomeNotification() {
  if (Notification.permission === 'granted') {
    const notification = new Notification('Welcome to Our App!', {
      body: 'Thank you for downloading our app. We hope you enjoy using it!',
      icon: 'path/to/notification-icon.png' // Path to your notification icon
    });
      createNotifyCheck();
  }
}

//onload event, starts event listeners
window.onload = function () {
  
	usersCode();
  
	if ('serviceWorker' in navigator) {
		navigator.serviceWorker.register('sw.js');
	}//if
	
	//creates profile icon and button
	let profileButton = document.getElementById("loginSignup");
	let profilePage = document.getElementsByClassName("loginContainer");
	profilePage[0].style.display = "none";
	let toggle = false;
	
	//if the users clicks profile button then show login page
	profileButton.addEventListener('click', function(){
		if(toggle == false){
			toggle = true;
			profilePage[0].style.display = "block";
		}else{
			toggle = false;
			profilePage[0].style.display = "none";
		}//if else
	}); // eventListener
	
	//canvas initializaton
	//------------------------------------
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	startButton = document.getElementById("play");
	menu = document.getElementById("startScreen");
	controlGUI = document.getElementById("controls");
	banner = document.getElementById("banner");
	let instructions = document.getElementById("instructions");
	let imageInstructions = document.getElementById("imageInstructions");
	let instructionText = document.getElementById("instructionText");
	let alternate = document.getElementById("alternate");
	let absolute = document.getElementById("absolute");
	let box = document.getElementById("box");
	
	let isControlGui = true;
	let back = document.getElementById("back");
	let next = document.getElementById("next");
	
	let current = 0;
	
	let instructionQuotes = [
	"Welcome to Hungry Game. Survive in a post-apocalyptic world by gathering resources, crafting weapons, finding food, and defending yourself against other survivors. Remember, to survive is to claim victory!",
	"Controls: \n Use the WASD or arrow keys to move your character. \n Press the spacebar to jump. \n Left-click to attack. \n Press the F key to interact with objects on the ground and F again to drop them",
	"For mobile users: \n click on the screen to attack \n to move, refer to the touchpad \n to interact with objects, press the F icon",
	"Be wary of other players in the game, for some may be hostile. \n Approach cautiously and communicate if you encounter other survivors. \n Trade items, team up, or defend yourself against potential threats.",
	"The necessity of food is very apparent early on, use this food encyclopedia to understand what you can scavenge and eat",
	]
	
	back.addEventListener("click", function(){
		if(current != 3){
			current++;
			
			imageInstructions.src = "images/instructions" + current + ".png"
			instructionText.innerHTML = instructionQuotes[current];
		}
	});
	
	next.addEventListener("click", function(){
		if(current != 0){
			current--;
			
			imageInstructions.src = "images/instructions" + current + ".png"
			instructionText.innerHTML = instructionQuotes[current];
		}
	});
	
	//when gui clicked show either start page or instructions
	controlGUI.addEventListener("click", function(){
		
		imageInstructions.src = "images/instructions" + current + ".png"
		instructionText.innerHTML = instructionQuotes[current];
		
		if(isControlGui == true){
			
			controlGUI.innerHTML = "Return to Menu";
			alternate.style.display = "flex";
			instructions.style.display = "inline-block";
			absolute.style.right = 0;
			
			isControlGui = false;
		}else{
			
			controlGUI.innerHTML = "How to Play";
			alternate.style.display = "none";
			instructions.style.display = "none";
			absolute.style.right = "auto";
			
			isControlGui = true;
		}//if else
		
	});
	
	//when start button clicked start game and hide menu(start page)
	startButton.addEventListener("click", function(){
		
		death = false;
		menu.style.display = "none";
		document.getElementById("deathScreen").style.display = "none";
		
		loadStuff();
	});
	
};

// Starts game, step 1 of game initializaton
function startGame() {
	
	window.addEventListener('click', (event) => {
		//try to attack in game loop
		tryToAttack = true;	
			
	});
	
	//get angle deg basd on moues and center of screen everytime the mouse moves
	
	window.addEventListener("mousemove", (event) => {

			mousePos = getMousePos(canvas, event);

			angleDeg = Math.atan2(
				mousePos.y - canvas.height / 2 + 30,
				mousePos.x - canvas.width / 2 + 30,
			);
			
	});
	
	//If online, load real session, otherwise simulate session
	
	if (navigator.onLine) {

	  getSession();
	  
		// respond to user moving
		document.addEventListener("keydown", (event) => {
			
			if (event.keyCode === 65 && (event.keyCode === 68) == false) {
				changePlayerDelta("x", -5);
			} else if (event.keyCode === 68 && (event.keyCode === 65) == false) {
				changePlayerDelta("x", 5);
			} // else

			if (event.keyCode === 87 && (event.keyCode === 83) == false) {
				changePlayerDelta("y", -5);
			} else if (event.keyCode === 83 && (event.keyCode === 87) == false) {
				changePlayerDelta("y", 5);
			} // else

			if (event.keyCode === 70){
				tryToPickUp = true;
			}

		});

	// respond to user stopping
		document.addEventListener("keyup", (event) => {
			
			if (event.keyCode === 87) {
				//w
				up = false;
				//player.setDeltaY(0);
				changePlayerDelta("y", 0);
			}
			if (event.keyCode === 68) {
				//d
				right = false;
				//player.setDeltaX(0);
				changePlayerDelta("x", 0);
			}
			if (event.keyCode === 83) {
				//s
				down = false;
				//player.setDeltaY(0);
				changePlayerDelta("y", 0);
			}
			if (event.keyCode === 65) {
				//a
				left = false;
				changePlayerDelta("x", 0);
				//player.setDeltaX(0)
			}
		});
	  
	} else {
	
	// This runs simulation functions
		
	  createSimulation();
	  
	  document.addEventListener("keydown", (event) => {
			// respond to user moving

			if (event.keyCode === 65 && (event.keyCode === 68) == false) {
				SimulationChangePlayerDelta("x", -5);
			} else if (event.keyCode === 68 && (event.keyCode === 65) == false) {
				SimulationChangePlayerDelta("x", 5);
			} // else

			if (event.keyCode === 87 && (event.keyCode === 83) == false) {
				SimulationChangePlayerDelta("y", -5);
			} else if (event.keyCode === 83 && (event.keyCode === 87) == false) {
				SimulationChangePlayerDelta("y", 5);
			} // else

			if (event.keyCode === 70){
				tryToPickUp = true;
			}
		});

		document.addEventListener("keyup", (event) => {
			// respond to user stopping

			if (event.keyCode === 87) {
				//w
				up = false;
				SimulationChangePlayerDelta("y", 0);
			}
			if (event.keyCode === 68) {
				//d
				right = false;
				SimulationChangePlayerDelta("x", 0);
			}
			if (event.keyCode === 83) {
				//s
				down = false;
				SimulationChangePlayerDelta("y", 0);
			}
			if (event.keyCode === 65) {
				//a
				left = false;
				SimulationChangePlayerDelta("x", 0);
			}
		});
	}
	
	selectIcon = document.getElementById("pickup");
	
	let map = getMap();

	window.requestAnimationFrame(gameLoop);
}//startGame

const url = 'http://worldtimeapi.org/api/timezone/America/Vancouver';

let data;
let fetchedTime;
let ourTime;

async function getData() {
    const response = await fetch(url);
    data = await response.json();

	let millisec = (data.datetime).split("-")[2].split(":")[2].split(".")[1].substr(0,3);
	
	let time = data.unixtime;

	fetchedTime = time.toString() + millisec;
	
	ourTime = Date.now();
}

function getTime(){
	return (parseInt(fetchedTime) + parseInt(Date.now()) - parseInt(ourTime));
}

getData();

let warning = document.getElementById("warning");

// Runs the game. This does all calculations and whatnot
function gameLoop() {

	try{
		// Reset canvas
		canvas.width += 0;

		// Get the player entity from the list
		let playerX = 0;
		let playerY = 0;
		let playerIndex = 0;

		let entityPositions = new Array();
		let drawFirst = new Array();
		let drawLast = new Array();
		
		// Tree top positions
		let treeTops = new Array();
		
		// Check to see if the screen width is lesser than screen height. This usually means that they are a mobile user who has their phone rotated right side up
		
		if(getWidth() < getHeight()){
			
			if(neverShowAgain == false){
				
				warning.style.display = "flex";
			}
		}else{
			warning.style.display = "none";
		}
		
		// Run a loop before processing everything, gets the position of all objects at the relative time
		for (let i = 0; i < entities.length; i++) {
			
			if (
				entities[i]["name"] == "stick" ||
				entities[i]["name"] == "pebble" ||
				entities[i]["name"] == "axe" ||
				entities[i]["name"] == "spear" ||
				entities[i]["name"] == "deadPlayer" ||
				entities[i]["name"] == "berries"
			) {
				entities[i]["drawPriority"] = 2;
			}else if(entities[i]["name"] == "bush"){
				entities[i]["drawPriority"] = 0;
			}else{
				entities[i]["drawPriority"] = 1;
			}
			
			checkIndex	= i;
			entityPositions[i] = new Array();
			entityPositions[i]["x"] = entities[i]["lastX"]["lastPositionX"];
			entityPositions[i]["y"] = entities[i]["lastY"]["lastPositionY"];
			entityPositions[i]["hover"] = false;
			
			// Run this for all instances of delta, add them based off of the time that the delta was initialized and the time now. 
			//This is more complicated than it could be but there can be more possibilities with this
			for (let v = 0;
				v < Object.keys(entities[i]["lastX"]["xApplied"]).length;
				v++
			) {
				entityPositions[i]["x"] +=
					entities[i]["lastX"]["xApplied"][v]["delta"] *
					(getTime() - entities[i]["lastX"]["xApplied"][v]["initializedTime"]) *
					theWorld;
			}//for

			for (
				let v = 0;
				v < Object.keys(entities[i]["lastY"]["yApplied"]).length;
				v++
			) {
				entityPositions[i]["y"] +=
					entities[i]["lastY"]["yApplied"][v]["delta"] *
					(getTime() - entities[i]["lastY"]["yApplied"][v]["initializedTime"]) *
					theWorld;
			}//for
		
			// Save the positions exclusively if the entity is player, as all objects are drawn relative to it
			if (entities[i]["name"] === "player" && entities[i]["seed"] == playerSeed) {
				playerX = entityPositions[i]["x"];
				playerY = entityPositions[i]["y"];
				
				playerIndex = i;
				gotPlayerIndexInTheFirstPlace = true;
			}//if
			
			//if its a tree we want to draw tree tops on top of it that dont affect collisions, we use this at the bottom of the loop
			if(entities[i]["name"] == "tree"){
				
				let index = treeTops.length;
				
				treeTops[index] = new Array();
				treeTops[index]["x"] = entityPositions[i]["x"];
				treeTops[index]["y"] = entityPositions[i]["y"];
			}//if
			
			// In the case that the player has not loaded yet, simply return
			if (i == entities.length && playerX == 0) {
				console.log("fatal computation error #playerUndefined");
				updateEntities();
				return;
			}//if
		}//for
		
		// Check if the player is dead. For some reason the firebase sometimes removes player from the list so only run the death code if the player is missing for about a second
		if(playerIndex == 0 && gotPlayerIndexInTheFirstPlace == true && death == false){
			
			if (deathHundreth > 0){
				deathHundreth--;
			}else{
				let deathScreen = document.getElementById("deathScreen");
				let deathQuote = document.getElementById("deathQuote");
				death = true;
				
				deathScreen.style.display = "flex";
				console.log(Math.floor(Math.random() * deathScreenQuotes.length))
				deathQuote.innerHTML = deathScreenQuotes[Math.floor(Math.random() * deathScreenQuotes.length)];
			}
		}else{
			if(deathHundreth < 100){
				deathHundreth++;
			}//if
		}//if else

		// Update player health on the GUI
		changeHealth(playerIndex);

		// Add the hover property to entityPositions, so that the object glows if the player is over it
		entityPositions = checkHover(entityPositions, playerX, playerY);	
		
		// Call tryToAttack if it has been requested
		if(tryToAttack == true && server != undefined){
			
			tryToAttack = false;
			
			playerAttack(entityPositions, playerX, playerY, playerIndex);
		}//if
		
		// For all entities, draw relative to player with the entity positions, remove delta from the player they are colliding on something
		for (let v = 0; v < entities.length; v++) {
			if (playerIndex != v) {
				if (
					entities[playerIndex]["name"] != "player" ||
					entities[v]["name"] != "player"
				) {
					if (
						entities[playerIndex]["seed"] == playerSeed ||
						entities[v]["seed"] == playerSeed
					) {
						if (
							entities[v]["name"] == "stick" ||
							entities[v]["name"] == "pebble" ||
							entities[v]["name"] == "berries" ||
							entities[v]["name"] == "axe" ||
							entities[v]["name"] == "spear" ||
							entities[v]["name"] == "deadPlayer" ||
							entities[v]["name"] == "bush"
						) {
						} else {
							if (
								checkCollision(
									entities[playerIndex],
									entities[v],

									entityPositions[playerIndex]["x"] - playerX + canvas.width / 2 - 30,
									entityPositions[playerIndex]["y"] - playerY + canvas.height / 2 - 30,
									entityPositions[v]["x"] - playerX + canvas.width / 2 - 30,
									entityPositions[v]["y"] - playerY + canvas.height / 2 - 30
								)
							) {
								removeDelta(
									"sessionList/" +
										server +
										"/objects/" +
										playerIndex +
										"/lastX/xApplied/0"
								);
								removeDelta(
									"sessionList/" +
									server +
									"/objects/" +
									playerIndex +
									"/lastY/yApplied/0"
								);
							}//if
						}//if
					}//if
				}//if
			}//if
		}//for

		// Draw background
		drawTiles(playerX, playerY);
		
		// pick up item if requested
		if(tryToPickUp == true && hovering != null && entities[playerIndex]["holding"] == ""){
			entities[playerIndex]["holding"] = entities[hovering]["name"];
			
			let index = [];
			index[0] = hovering;
			
			// remove item from ground
			removeObject(index);	
		
		// drop items if requested
		}else if(tryToPickUp == true){
			
			if(entities[playerIndex]["holding"] != ""){

				let object = entities[playerIndex]["holding"];
				
				entities[playerIndex]["holding"] = "";
				set(ref(database, "sessionList/" + server + "/objects/" + playerIndex + "/holding"), "");
				
				entityPositions[entityPositions.length] = new Array();
				
				// Create object
				objectTemplate = Object.create(
						Object.getPrototypeOf(entities[0]),
						Object.getOwnPropertyDescriptors(entities[0])
					);
				
				// Give properties
				objectTemplate["imageSrc"] = "images/" + object + ".png";
				objectTemplate["seed"] = Math.floor(Math.random(1) * 90000);
				objectTemplate["name"] = object;
				
				// Create clientside version
				entities.push(objectTemplate);
				
				// Position it. Not sure why its done this way, but im not going to touch it
				entityPositions[entityPositions.length - 1]["x"] = playerX;
				entityPositions[entityPositions.length - 1]["y"] = playerY;
				
				if(checkCrafting(entityPositions.length - 1, entityPositions, playerX, playerY) == false){
					
				// Check collisions with the clientside version, make tool if theres the necessary materials	
					
					let seed = Math.floor(Math.random(1) * 90000);
		
					addObjectToServer(
							playerX - 50,
							playerY - 50,
							60,
							seed,
							object,
							"images/" + object + ".png",
							
					);	
				}//if
			}//if
		}//if else
		
		hovering = null;
		tryToPickUp = false;
		
		// Draw all entities onto background, and also check if its collisions if valid
		
		// Highority draws objects in ascending order, makes sure that items are drawn first and objects are drawn last
		let highority = 2;
		
		while(highority != -1){
			for (let i = 0; i < entities.length; i++) {

				// Only draw if it is at the highority
				if(entities[i]["drawPriority"] == highority){
					
					// Assign image based on weapon
					let weapon;
					
					if(entities[i]["holding"] == "axe"){
						weapon = "axe";
					}else if(entities[i]["holding"] == "spear"){
						weapon = "spear";
					}else{
						weapon = "fists";
					}
					
					let imageName = "";
					
					if(entityPositions[i]["hover"] == true){
						imageName = entities[i]["imageSrc"].split(".")[0] + "_hover." + entities[i]["imageSrc"].split(".")[1];
					}else{
						imageName = entities[i]["imageSrc"];
					}//if else
					
					if(entities[i]["holding"] != ""){
						imageName = entities[i]["imageSrc"].split(".")[0] + "_holding_" + entities[i]["holding"] + "." + entities[i]["imageSrc"].split(".")[1];
					}
					
					if(getTime() - entities[i]["animation"]["initialized"] <= 40 * attackSpecs[weapon]["frames"]){
						imageName = "images/" + entities[i]["name"] + weapon + "attack/" + Math.ceil((entities[i]["animation"]["initialized"] - getTime()) * -1 / 40) + ".png";
					}//if else
					
					// Check if this entity is a player, if so we want to just place the fella in the middle of the screen
					if (entities[i]["name"] === "player" && entities[i]["seed"] == playerSeed) {
						let W = getImage(imageName).width;
						let H = getImage(imageName).height;
						
						// Pivot screen to center, rotate and place the image then restore
						ctx.save();
						ctx.translate(
							canvas.width / 2,
							canvas.height / 2
						);
						
						ctx.rotate(angleDeg);
						
						ctx.drawImage(getImage(imageName), - W / 2, - H / 2);
						ctx.restore();
						
						// Draw a username if the object has one
						if(entities[i]["userName"] != ""){
							ctx.font = "10px Arial";
							ctx.fillText(entities[i]["userName"], canvas.width / 2 - 30, canvas.height / 2 + 30);	
						}

						// Otherwise, do some funky math
						// Basically, deltaX and deltaY are actually now forces, not exclusively a single vector but multiple that are stored in the firebase
						// This way, we can cheap out on having actual server scripts and instead link all positions based off time (this also fixes objects
						// Slowing under lag woo!). Every delta will have a start time and strength, and by basing that off the current time, the current
						// Position can easily be determined with a few for loops
					} else {
						// Draw it based off the new image, the just obtained position, and then make it relative to the player position
						
						ctx.drawImage(
							getImage(imageName),
							Math.floor(entityPositions[i]["x"] - playerX + canvas.width / 2 - getImage(imageName).width / 2),
							Math.floor(entityPositions[i]["y"] - playerY + canvas.height / 2 - getImage(imageName).height / 2)
						);
						
						// Draw a username if the object has one
						if(entities[i]["userName"] != ""){
							ctx.font = "30px Arial";
							ctx.fillText(entities[i]["userName"],Math.floor(entityPositions[i]["x"] - playerX + canvas.width / 2 - getImage(imageName).width / 2), Math.floor(entityPositions[i]["y"] - playerY + canvas.height / 2 - getImage(imageName).height / 2));	
						}
					}
				}
				
			}
			
			highority--;
		}
		
		
		//draw treeTops
		for(let i = 0; i < treeTops.length; i++){
			
			ctx.drawImage(
				getImage("images/tree.png"),
				Math.floor(treeTops[i]["x"] - playerX + canvas.width / 2 - getImage("images/tree.png").width / 2),
				Math.floor(treeTops[i]["y"] - playerY + canvas.height / 2 - getImage("images/tree.png").height / 2)
			);
		}//for
		
		window.requestAnimationFrame(gameLoop);
		
		// Last entitylist complied without issues, in case an error occurs in the firebase it resets in the catch
		entityListNotBroken = entities;
		
	}catch(error){
		
		console.log(error);
		console.log(checkIndex);
		
		set(ref(database, "sessionList/" + server + "/objects"), entityListNotBroken);
		window.requestAnimationFrame(gameLoop);
	}//try catch

}//gameLoop

class Tile {
	// constructor
	constructor(collision, tileImage) {
		this.collision = collision;
		this.tileImage = tileImage;
	} // Tile

	// sets the collision status of the tile
	setCollision(tf) {
		if (tf == true) {
			this.collision = true;
		} // if
		else {
			this.collision = false;
		} // else
	} // setCollision

	setTileImage(tileImage) {
		this.tileImage = tileImage;
	}

	// returns the sprite of the tile;
	get getTileImage() {
		return tileImage;
	} // getTileImage
} // Tile

// Supposed to get map, doesnt really do much though
function getMap() {
	let mapraw =
		"1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 " +
		"1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 " +
		"1 1 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 2 2 " +
		"1 0 2 2 0 1 0 0 0 0 0 0 0 0 0 0 0 0 2 2 2 0 " +
		"1 0 2 2 0 1 0 0 0 0 0 0 0 0 0 0 0 2 2 2 0 0 " +
		"1 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 2 2 0 0 0 0 " +
		"1 0 0 0 0 1 0 0 0 0 0 0 0 0 0 2 2 2 0 0 0 0 " +
		"0 0 0 0 1 0 0 0 0 0 0 0 0 0 2 2 0 0 0 0 0 0 " +
		"0 0 0 0 1 0 0 0 0 0 0 0 2 2 2 0 0 0 0 0 0 0 " +
		"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 " +
		"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 " +
		"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 " +
		"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 " +
		"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 " +
		"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 " +
		"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0";

	mapLength = mapraw.length;

	let mapGrid = [];
	for (let v = 0; v < 16; v++) {
		mapGrid[v] = new Array(23).fill(0);
	}//for

	for (let v = 0; v < 16; v++) {
		for (let i = 0; i <= 22; i++) {
			try {
				mapGrid[v][i] = mapraw.split(" ")[v * 22 + i];
			} catch {}
		}//for
	}//for

	return mapGrid;
}//getMap

// Draws all tiles on the screen relative to the player
function drawTiles(x, y) {
	
	let imageName = "images/newGrass.gif";

	for (let i = 0; i < 50; i++) {
		for (let v = 0; v < 50; v++) {
			//ctx.drawImage(tileImage, i * 100 - x + 400, v * 100 - y + 360);
			ctx.drawImage(getImage(imageName), i * 100 - x + 400, v * 100 - y + 360);
		}//for
	}//for
}//drawTiles

// checks collision of two objects
function checkCollision(a, b, aX, aY, bX, bY) {

	let imageA = new Image();

	if (a == null || a["imageSrc"] == undefined) {
		imageA.src = "images/player.png";

	} else {
		imageA.src = a["imageSrc"];
	}//if else

	let imageB = new Image();
	
	imageB.src = b["imageSrc"];
	
	if (aX + imageA.width >= bX && aX <= bX + imageB.width) {
		if (aY <= bY + imageB.height && aY + imageA.height >= bY) {
			return true;
		}//if
		return false;
	}//if

	return false;
}//checkCollision

// Gets state of firebase sessionlist, creates new session if one does not exist
function getSession() {
	get(ref(database, "sessionList")).then((snapshot) => {
		for (let i = 1; i < snapshot.val().length; i++) {
			if (snapshot.val()[i]["numPlayers"] > 0) {
				server = i;
				break;
			} else {
				set(ref(database, "sessionList/" + i), null);
			}//if else
		}//for
		
		if (server != null) {
			
			// if there is a server
			
			set(
				ref(database, "sessionList/" + server + "/numPlayers"),
				snapshot.val()[server]["numPlayers"] + 1
			);

			let newSession = snapshot.val()[server];

			// Fill the entitylist with the server number
			updateEntities(server);

			startOnValues();
		} else {
			
			// if there is not a server
			
			isHost = true;
			createSession();
		}//if else
	});
}//getSession

// Simulates creating a datastore
function createSimulation() {

		for(let i = 0; i < 5; i++){
			addObjectToClient(
				Math.floor(Math.random() * 3700 + 350),
				Math.floor(Math.random() * 3700 + 350),
				50,
				Math.floor(Math.random() * 90000),
				"rock",
				"images/rock.png"
			);
		}//for
		
		for(let i = 0; i < 5; i++){
			addObjectToClient(
				Math.floor(Math.random() * 3700 + 350),
				Math.floor(Math.random() * 3700 + 350),
				50,
				Math.floor(Math.random() * 90000 + 350),
				"bush",
				"images/bush.png"
			);
		}//for

		for (let i = 0; i < 5; i++) {
			addObjectToClient(
				Math.floor(Math.random() * 3700 + 350),
				Math.floor(Math.random() * 3700 + 350),
				50,
				Math.floor(Math.random(1) * 90000),
				"stick",
				"images/stick.png"
			);
		}//for

		for (let i = 0; i < 5; i++) {
			addObjectToClient(
				Math.floor(Math.random() * 3700 + 350),
				Math.floor(Math.random() * 3700 + 350),
				50,
				Math.floor(Math.random(1) * 90000 + 500),
				"pebble",
				"images/pebble.png"
			);
		}//for
		
		for (let i = 0; i < 5; i++) {
			addObjectToClient(
				Math.floor(Math.random() * 3700 + 350),
				Math.floor(Math.random() * 3700 + 350),
				50,
				Math.floor(Math.random() * 90000),
				"tree",
				"images/treeCollision.png"
			);
		}//for

		startSimulationOnValues();
}//createSimulation

// Create a new datastore in the firebase
function createSession() {
	// Fetch the sessionlist
	get(ref(database, "sessionList")).then((sessionListStuff) => {
		//console.log(sessionListStuff.val());
		let newSessionList = sessionListStuff.val();

		// copy template session
		let newSession = sessionListStuff.val()[0];

		//console.log(newSession);

		newSession["numPlayers"] = 1;
		server = 1;

		newSessionList.push(newSession);
		set(ref(database, "sessionList"), newSessionList);

		for(let i = 0; i < 15; i++){
			addObjectToServer(
				Math.floor(Math.random() * 3700 + 350),
				Math.floor(Math.random() * 3700 + 350),
				50,
				Math.floor(Math.random() * 90000),
				"rock",
				"images/rock.png"
			);
		}
		
		for(let i = 0; i < 15; i++){
			addObjectToServer(
				Math.floor(Math.random() * 3700 + 350),
				Math.floor(Math.random() * 3700 + 350),
				50,
				Math.floor(Math.random() * 90000 + 350),
				"bush",
				"images/bush.png"
			);
		}

		for (let i = 0; i < 15; i++) {
			addObjectToServer(
				Math.floor(Math.random() * 3700 + 350),
				Math.floor(Math.random() * 3700 + 350),
				50,
				Math.floor(Math.random(1) * 90000),
				"stick",
				"images/stick.png"
			);
		}

		for (let i = 0; i < 15; i++) {
			addObjectToServer(
				Math.floor(Math.random() * 3700 + 350),
				Math.floor(Math.random() * 3700 + 350),
				50,
				Math.floor(Math.random(1) * 90000 + 500),
				"pebble",
				"images/pebble.png"
			);
		}
		
		for (let i = 0; i < 15; i++) {
			addObjectToServer(
				Math.floor(Math.random() * 3700 + 350),
				Math.floor(Math.random() * 3700 + 350),
				50,
				Math.floor(Math.random() * 90000),
				"tree",
				"images/treeCollision.png"
			);
		}
		
		for (let i = 0; i < 5; i++) {
			addObjectToServer(
				Math.floor(Math.random() * 3700 + 350),
				Math.floor(Math.random() * 3700 + 350),
				50,
				Math.floor(Math.random() * 90000),
				"appleTree",
				"images/treeCollision.png"
			);
		}
		
		startOnValues();
	});
}//createSession

// Checks if the player is colliding with an object
function checkHover(entityPositions, playerX, playerY) {
	
	let a = false;
	
	for (let i = 0; i < entities.length; i++) {
		if (entities[i]["name"] == "pebble" || entities[i]["name"] == "stick" || entities[i]["name"] == "axe" || entities[i]["name"] == "spear") {
			if (
				checkCollision(
					null,
					entities[i],
					playerX,
					playerY,
					entityPositions[i]["x"],
					entityPositions[i]["y"]
				)
			) {
				a = true;
				entityPositions[i]["hover"] = true;
				hovering = i;
			}//if
		}//if
	}//for
	
	// Displays the pickup icon
	if(a == true){
		selectIcon.style.display = "block";
	}else{
		selectIcon.style.display = "none";
	}
	
	return entityPositions;
}

// Update client entityList if there is a change to the firebase
function updateEntities() {
	get(ref(database, "sessionList/" + server + "/objects")).then((snapshot) => {
		entities = snapshot.val();
	});
}//updateEntities

//Get Mouse Position
function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return {
		x: event.clientX - rect.left,
		y: event.clientY - rect.top,
	};
}//getMousePos

// Firebase onvalues and creates player in server
function startOnValues() {
	get(ref(database, "sessionList/" + server + "/objects")).then((snapshot) => {
		objectTemplate = Object.create(
			Object.getPrototypeOf(snapshot.val()[0]),
			Object.getOwnPropertyDescriptors(snapshot.val()[0])
		);
	});

	playerSeed = Math.random(1) * 900000;
	addObjectToServer(Math.random() * 1000, Math.random() * 1000, 100, playerSeed, "player", "images/player.png", userName);

	onValue(
		ref(database, "sessionList/" + server + "/numPlayers"),
		(snapshot) => {
			if (numPlayers > snapshot.val()) {
				//updatePositionsToServer();
			}

			numPlayers = snapshot.val();

			onDisconnect(ref(database, "sessionList/" + server + "/numPlayers")).set(
				snapshot.val() - 1
			);
		}//ref
	);

	onValue(ref(database, "sessionList/" + server + "/objects"), (snapshot) => {
		updateEntities(server);
	});
}//startOnValues

// Adds player to entityList
function startSimulationOnValues() {

	playerSeed = Math.random(1) * 900000;
	addObjectToClient(Math.random() * 1000, Math.random() * 1000, 100, playerSeed, "player", "images/player.png", userName);

}//startSimulationOnValues

function changePlayerDelta(variable, delta) {
	let savedEntityList = entities;

	let index;

	for (let i = 0; i < savedEntityList.length; i++) {
		if (entities[i]["seed"] == playerSeed) {
			index = i;
			break;
		}

		if (i == savedEntityList.length) {
			console.log("player not found in changePlayerDelta()");
			return;
		}
	}

	let time = getTime();

	if (delta == 0) {
		removeDelta(
			"sessionList/" +
				server +
				"/objects/" +
				index +
				"/last" +
				variable.toUpperCase() +
				"/" +
				variable +
				"Applied/0"
		);
	} else {
		if (
			entities[index]["last" + variable.toUpperCase()][variable + "Applied"][0][
				"delta"
			] != delta
		) {
			if (
				entities[index]["last" + variable.toUpperCase()][
					variable + "Applied"
				][0]["delta"] != 0
			) {
				replaceDelta(
					"sessionList/" +
						server +
						"/objects/" +
						index +
						"/last" +
						variable.toUpperCase() +
						"/" +
						variable +
						"Applied/0",
					delta
				);
			} else {
				set(
					ref(
						database,
						"sessionList/" +
							server +
							"/objects/" +
							index +
							"/last" +
							variable.toUpperCase() +
							"/" +
							variable +
							"Applied/0/delta"
					),
					delta
				);
				set(
					ref(
						database,
						"sessionList/" +
							server +
							"/objects/" +
							index +
							"/last" +
							variable.toUpperCase() +
							"/" +
							variable +
							"Applied/0/initializedTime"
					),
					time
				);
			}
		}
	}
}

function SimulationChangePlayerDelta(variable, delta) {
	let savedEntityList = entities;

	let index;

	for (let i = 0; i < savedEntityList.length; i++) {
		if (entities[i]["seed"] == playerSeed) {
			index = i;
			break;
		}

		if (i == savedEntityList.length) {
			console.log("player not found in changePlayerDelta()");
			return;
		}
	}

	let time = getTime();

	if (delta == 0) {
		simulateRemoveDelta(index, variable, 0);
	} else {
		if (
			entities[index]["last" + variable.toUpperCase()][variable + "Applied"][0][
				"delta"
			] != delta
		) {
			if (
				entities[index]["last" + variable.toUpperCase()][
					variable + "Applied"
				][0]["delta"] != 0
			) {
				console.log("save");
				simulateReplaceDelta(index, variable, 0, delta);
			} else {
				entities[index]["last" + variable.toUpperCase()][variable + "Applied"][0]["delta"] = delta;
				
				entities[index]["last" + variable.toUpperCase()][variable + "Applied"][0]["initializedTime"] = time;
			}
		}
	}
}

window.mobileControl = function mobileControl(xy, d, event) {

	changePlayerDelta(xy, d);
};

function removeDelta(reference) {
	let path = reference.split("/");

	let lastPositionRef = "";

	for (let i = 0; i < 5; i++) {
		lastPositionRef += path[i];

		if (i != 5) {
			lastPositionRef += "/";
		}
	}

	lastPositionRef += "lastPosition" + path[5].split("")[0].toUpperCase();

	get(ref(database, lastPositionRef)).then((oldPosition) => {
		get(ref(database, reference)).then((removedDelta) => {
			let position =
				oldPosition.val() +
				removedDelta.val()["delta"] *
					(getTime() - removedDelta.val()["initializedTime"]) *
					theWorld;

			set(ref(database, lastPositionRef), position);
			set(ref(database, reference + "/delta"), 0);
			set(ref(database, reference + "/initializedTime"), 0);
		});
	});
}

function replaceDelta(reference, delta) {
	let path = reference.split("/");

	let lastPositionRef = "";

	for (let i = 0; i < 5; i++) {
		lastPositionRef += path[i];

		if (i != 5) {
			lastPositionRef += "/";
		}
	}

	lastPositionRef += "lastPosition" + path[5].split("")[0].toUpperCase();

	get(ref(database, lastPositionRef)).then((oldPosition) => {
		get(ref(database, reference)).then((removedDelta) => {
			let position =
				oldPosition.val() +
				removedDelta.val()["delta"] *
					(getTime() - removedDelta.val()["initializedTime"]) *
					theWorld;

			set(ref(database, lastPositionRef), position);
			set(ref(database, reference + "/delta"), delta);
			set(ref(database, reference + "/initializedTime"), getTime());
		});
	});
}

function simulateRemoveDelta(i, d, spot) {
	entities[i]["last" + d.toUpperCase()]["lastPosition" + d.toUpperCase()] += entities[i]["last" + d.toUpperCase()][d + "Applied"][0]["delta"] * (getTime() - entities[i]["last" + d.toUpperCase()][d + "Applied"][0]["initializedTime"]) * theWorld;
	
	entities[i]["last" + d.toUpperCase()][d + "Applied"][0]["initializedTime"] = 0;
	entities[i]["last" + d.toUpperCase()][d + "Applied"][0]["delta"] = 0;

}

function simulateReplaceDelta(i, d, spot, delta) {
	entities[i]["last" + d.toUpperCase()]["lastPosition" + d.toUpperCase()] += entities[i]["last" + d.toUpperCase()][d + "Applied"][0]["delta"] * (getTime() - entities[i]["last" + d.toUpperCase()][d + "Applied"][0]["initializedTime"]) * theWorld;
	
	entities[i]["last" + d.toUpperCase()][d + "Applied"][0]["initializedTime"] = getTime();
	entities[i]["last" + d.toUpperCase()][d + "Applied"][0]["delta"] = delta;
}

// x, y, health, seed, object name, object image
function addObjectToServer(x, y, health, seed, objectName, Image, userName) {
	//console.log(objectName);

	let maxTimeOut = 60;

	let waitList = setInterval(function () {
		get(ref(database, "sessionList/" + server + "/objects")).then(
			(snapshot) => {
				if (snapshot.val() != undefined) {
					objectTemplate = Object.create(
						Object.getPrototypeOf(snapshot.val()[0]),
						Object.getOwnPropertyDescriptors(snapshot.val()[0])
					);

					objectTemplate["lastX"]["lastPositionX"] = x;
					objectTemplate["lastY"]["lastPositionY"] = y;
					objectTemplate["seed"] = seed;
					objectTemplate["name"] = objectName;
					objectTemplate["imageSrc"] = Image;
					objectTemplate["health"] = health;
					
					if(userName != undefined){
						console.log("fella");
						objectTemplate["userName"] = userName;
					}

					update(
						ref(
							database,
							"sessionList/" + server + "/objects/" + snapshot.val().length
						),
						objectTemplate
					);

					clearInterval(waitList);
				}

				if (maxTimeOut == 0) {
					clearInterval(waitList);
				}
				maxTimeOut--;
			}
		);
	}, 50);
}

function checkPlayerOptions(playerX, playerY) {
	for (let i = 0; i > entities.length; i++) {
		if (entities["name"] == "stick") {
		}
	}
}

function removeObject(index){

console.log(index);

let newList = [];	//Object.create(Object.getPrototypeOf(entities), Object.getOwnPropertyDescriptors(entities));

console.log("old list");
console.log(entities);
console.log("list over");


for(let i = 0; i < entities.length; i++){

	for(let v = 0; v < index.length; v++){
		if(index[v] == i){
			
			console.log("comparing " + index[v] + " to " + i);
	
			break;
		}
		if(v == index.length - 1){
			newList.push(entities[i]);
		}
	}
	
//console.log("iterate");
//newList.splice(index[i], 1);

}

if(index[1] != undefined){
	console.log("new list");
	console.log(newList);
	console.log("list over");
}


//console.log("start");


//console.log(newList);

//console.log("end");

set(ref(database, "sessionList/" + server + "/objects"), newList);
}
 
function checkCrafting(index, eP, playerX, playerY) {
	
	let items = new Array();
	
	let allImages = new Array();
	
	for(let i = 0; i < entities.length; i++){
		
		if(checkCollision(entities[index], entities[i], eP[index]["x"], eP[index]["y"], eP[i]["x"], eP[i]["y"])){
			
			items[items.length] = new Array();
			items[items.length - 1]["name"] = entities[i]["name"];
			items[items.length - 1]["seed"] = entities[i]["seed"];
			items[items.length - 1]["index"] = i;
		}
	}
	
	/*for(let v = 0; v < connectedImages.length; v++){
		
		
		for(let x = 0; x < entities.length; x++){
			if(x != index){
				
				if(checkCollision(entities[connectedImages[v]], entities[x], eP[v]["x"], eP[v]["y"], eP[x]["x"], eP[x]["y"])){

					allImages[allImages.length] = x;
				}
			}
		}
	}*/
	
	let sticks = 0;
	let pebbles = 0;
	
	//console.log(items);
	
	for(let i = 0; i < items.length; i++){
		
		
		if(items[i]["name"] == "pebble"){
			console.log("pebble");
			pebbles++;
		}
		if(items[i]["name"] == "stick"){
			sticks++;
			console.log("stick");
		}
	}
	
	console.log(sticks + " " + pebbles);
	
	if(sticks >= 3 && pebbles >= 1){
		
		console.log("can craft spear");
		
		let toRemove = [];
		
		
		for(let i = 0; i < 2; i++){
			for(let v = 0; v < items.length; v++){
				if(items[v]["name"] == "stick"){
					toRemove[toRemove.length] = items[v]["index"];
				}
			}
		}
		
		for(let i = 0; i < 0; i++){
			for(let v = 0; v < items.length; v++){
				if(items[v]["name"] == "pebble"){
					toRemove[toRemove.length] = items[v]["index"];
				}
			}
		}
		
		removeObject(toRemove);
		
		addObjectToServer(
						playerX,
						playerY,
						60,
						Math.floor(Math.random(1) * 90000),
						"spear",
						"images/spear.png"
				);
		
		return true;
	}
	
	if(sticks >= 2 && pebbles >= 2){
		
	let toRemove = [];	
	
		for(let i = 0; i < 1; i++){
			for(let v = 0; v < items.length; v++){
				if(items[v]["name"] == "stick"){
					toRemove[toRemove.length] = items[v]["index"];
				}
			}
		}
		
		for(let i = 0; i < 1; i++){
			for(let v = 0; v < items.length; v++){
				if(items[v]["name"] == "pebble"){
					toRemove[toRemove.length] = items[v]["index"];
				}
			}
		}
		
		removeObject(toRemove);
		
		addObjectToServer(
						playerX,
						playerY,
						200,
						Math.floor(Math.random(1) * 90000),
						"axe",
						"images/axe.png"
				);
		
		return true;
	}
	
	return false;
	
}

let attackSpecs = [];

attackSpecs["axe"] = new Array();
attackSpecs["fists"] = new Array();
attackSpecs["spear"] = new Array();

attackSpecs["axe"]["frames"] = 17;
attackSpecs["spear"]["frames"] = 11;
attackSpecs["fists"]["frames"] = 7;

attackSpecs["axe"]["damage"] = 25;
attackSpecs["spear"]["damage"] = 18;
attackSpecs["fists"]["damage"] = 8;

attackSpecs["axe"]["debounce"] = 700;
attackSpecs["spear"]["debounce"] = 400;
attackSpecs["fists"]["debounce"] = 250;

function playerAttack(entityPositions, playerX, playerY, playerIndex) {

	if(entities[playerIndex]["holding"] == "berries"){
		
	}else if(attackDebounce + lastAttack < getTime()){
		
		let newAnim = JSON.parse(
		  '{"initialized":' + getTime() + ', "type": "fist"}'
		);
		
		set(ref(database, "sessionList/" + server + "/objects/" + playerIndex + "/animation"), newAnim);
		
		lastAttack = getTime();
		
		let weapon;
		let audio;
				
		if(entities[playerIndex]["holding"] == "axe" || entities[playerIndex]["holding"] == "spear"){
			attackDebounce = attackSpecs[entities[playerIndex]["holding"]]["debounce"];
			weapon = "axe";
			audio = new Audio('sounds/clangberserk.mp3');
		}else{
			weapon = "fists";
			audio = new Audio('sounds/clangberserk.mp3');
			attackDebounce = attackSpecs["fists"]["debounce"];
		}
		
		let h = 50; // Hypotenuse
		let hitX = Math.sin(angleDeg - 1.5708) * -h + playerX;
		let hitY = Math.cos(angleDeg - 1.5708) * h + playerY;

		

		ctx.beginPath();
		ctx.arc(hitX - playerX + canvas.width / 2 - 30, hitY - playerY + canvas.height / 2 - 30, 5, 0, Math.PI * 2);
		ctx.fill();

		
		let attackCollide = false;
		
		for (let x = 0; x < entities.length; x++) {
		  if (entities[x]["seed"] != playerSeed) {
			  
			if (checkCollision(
						getImage("images/fistHitbox.png"),
						entities[x],
						hitX + 30,
						hitY - 30,
						entityPositions[x]["x"],
						entityPositions[x]["y"]
					)) {


			  if (true/*entities[x].name != "player"*/) {

				let dmg = attackSpecs[weapon]["damage"];
				
				audio.play();
				
				deductHealth(x, dmg);

				//healthBar(entities[x]["health"] - dmg);

				if (entities[x]["health"] <= 0 && entities[x]["name"]) {
				  if (entities[x]["name"] == "rock") {
						addObjectToServer(
						entityPositions[x]["x"],
						entityPositions[x]["y"],
						50,
						Math.floor(Math.random(1) * 90000),
						"pebble",
						"images/pebble.png"
					);
				  } else if (entities[x]["name"] == "tree") {
						addObjectToServer(
						entityPositions[x]["x"],
						entityPositions[x]["y"],
						50,
						Math.floor(Math.random(1) * 90000),
						"stick",
						"images/stick.png"
					);
				  } else if (entities[x]["name"] == "bush") {
						addObjectToServer(
						entityPositions[x]["x"],
						entityPositions[x]["y"],
						50,
						Math.floor(Math.random(1) * 90000),
						"berries",
						"images/berries.png"
					);
				  } else if (entities[x]["name"] == "player") {
						addObjectToServer(
						entityPositions[x]["x"],
						entityPositions[x]["y"],
						5000,
						Math.floor(Math.random(1) * 90000),
						"deadPlayer",
						"images/corpse.png"
					);
				  } else if (entities[x]["name"] == "tree") {
						addObjectToServer(
						entityPositions[x]["x"],
						entityPositions[x]["y"],
						50,
						Math.floor(Math.random(1) * 90000),
						"stick",
						"images/stick.png"
					);
				  }
				  
				  let index = [];
				index[0] = x;
				  
				  removeObject(index);

				}
			  }
			  break;
			}
		  }
		}
	}
}

function deductHealth(entity, damage){

	if(entities[entity]["health"] != undefined){
		set(ref(database, "sessionList/" + server + "/objects/" + entity + "/health"), entities[entity]["health"] - damage);
	}
	
}

let invalidImage = new Image();
invalidImage.src = "images/invalid.png";

function getImage(source){
	
	//console.log(imageList);
	
	if(imageList[source] == undefined){
		let newImage = new Image();
		newImage.src = source;
		
		newImage.onload = function(){
			imageList[source] = newImage;
		}
		
		newImage.onerror = function(){
			//console.log("whoops, error with " + source);
		}
		
		imageList[source] = invalidImage;
			
	}

	return imageList[source];

}



function loadStuff() {
  fetch("manifest.txt")
    .then(response => response.text())
    .then(text => {

      let list = (text.replace(/(\r\n|\n|\r)/gm, " ").split(" "));
	  let processed = 0;
	  let toBeProcessed = list.length;
	  
	  for(let i = 0; i < list.length; i++){
		  
		let preLoad = new Image();
		  
		preLoad.src = list[i];
		  
		preLoad.onload = function(){
			imageList[list[i]] = preLoad;
			processed++;
			ctx.drawImage(preLoad, Math.random() * canvas.width, Math.random() * canvas.height);			
			
		}
		
		preLoad.onerror = function(){
			processed++;
			imagelist[source] = invalidImage;
	 	}
	  }
	  
	  let interval = setInterval(function () {
		  
		  if(processed == toBeProcessed){
			  startGame();
			  clearInterval(interval);
		  }
		  
	  }, 500);
	  
	  /*
	  for(let i = 0; i < imageList.length; i++){
		  for(let v = 0; v < 3; v++){
			  //partList.push(imageList[i].split(\\\\)[v]);
		  }
		  
	  }
	  
	  */
	  
      // Process the data here (e.g., store it in an array or perform further operations)
    })
    .catch(error => console.log(error));
}


let healthBar = document.getElementById("healthReal");

function changeHealth(playerIndex){
	
	//console.log(entities[playerIndex]);
	
	if(entities[playerIndex] != undefined){
		healthBar.style.width = entities[playerIndex]["health"] + "%";
	}
	
}

function getWidth() {
  return Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
  );
}

function getHeight() {
  return Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.documentElement.clientHeight
  );
}

function usersCode(){
	textBox = document.getElementById("text");
	loginExclusive = document.getElementById("loginExclusive");
	
	//console.log(textBox.innerHTML);
	title = document.getElementById("title");
	signUp  = document.getElementById("signUp");
	signup = document.getElementById("signup");
	login = document.getElementById("login");
	
	let href = document.getElementById("signUp");
	
	if(toggle == "signUp"){
		title.innerHTML = "Sign Up";
		textBox.innerHTML = "Already a Hungry Gamer?";
		nameElement.style.display = "inline-block";
		href.innerHTML = "Login in!";
		loginExclusive.style.display = "none";
		signup.style.display = "inline-block";
		
	}else{
		title.innerHTML = "Login";
		textBox.innerHTML = "New Hungry Gamer?";
		nameElement.style.display = "none";
		href.innerHTML = "Sign up!";
		loginExclusive.style.display = "inline-block";
		signup.style.display = "none";
	}

	login.addEventListener('click', (e) => {
	let email = document.getElementById("email").value;
	let password = document.getElementById("password").value;

		signInWithEmailAndPassword(auth, email, password)
		  .then((userCredential) => {
			// Signed in 
			const user = userCredential.user;
			const dt = new Date();
			const dn = user.displayName;

			get(ref(database, "users/" + userCredential["user"]["uid"])).then((snapshot) => {
				userName = snapshot.val()["username"];
				username = snapshot.val()["username"];
			});
			
			update(ref(database, 'users/' + user.uid),{
				last_login: dt,
				name: dn,
			})
			alert('User logged in');
			//window.location.href = "index.html";


		  })
		  .catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			alert(errorMessage);
		  });

	});

	signup.addEventListener('click',(e) => {

		let name = document.getElementById("name").value;
		let email = document.getElementById("email").value;
		let password = document.getElementById("password").value;


		console.log("signup")
		createUserWithEmailAndPassword(auth, email, password)
		  .then((userCredential) => {
			// Signed in 
			const user = userCredential.user;

			set(ref(database, 'users/' + user.uid),{
				username: name,
				email: email
			})
			
			localStorage.setItem("notiSent", "false");
			// Request permission for push notifications
			Notification.requestPermission();
						
			// Schedule the push notification after 2 minutes
			if(!checkNotify()){
			  setTimeout(sendWelcomeNotification, 120000); // 2 minutes = 120000 milliseconds
			}

			function createNotifyCheck(){
			  localStorage.setItem("notiSent", "true");
			}
			
			alert('created user');
			window.location.href = "index.html";
			// ...
		  })
		  .catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			// ..

			alert(errorMessage);
		  });
	});
	
	signUp.addEventListener('click', (e) =>{
		
		if(toggle == "signUp"){
			toggle = "e";
		}else{
			toggle = "signUp";
		}

		if(toggle == "signUp"){
			title.innerHTML = "Sign Up";
			textBox.innerHTML = "Already a Hungry Gamer?";
			nameElement.style.display = "inline-block";
			href.innerHTML = "Login in!";
			loginExclusive.style.display = "none";
			signup.style.display = "inline-block";
		}else{
			title.innerHTML = "Login";
			textBox.innerHTML = "New Hungry Gamer?";
			nameElement.style.display = "none";
			href.innerHTML = "Sign up!";
			loginExclusive.style.display = "inline-block";
			signup.style.display = "none";
		}
		
		
	});

	const user = auth.currentUser;
	onAuthStateChanged(auth, (user) => {
		if (user) {
		  // User is signed in, see docs for a list of available properties
		  // https://firebase.google.com/docs/reference/js/auth.user
		  const uid = user.uid;
		  // ...
		} else {
		  // User is signed out
		  // ...
		}
	  });

	let logout = document.getElementById("logout");

	logout.addEventListener('click', (e)=>{
		signOut(auth).then(() => {
			alert('Signed out')
			window.location.href = "index.html";
			// Sign-out successful.
		  }).catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			// ..

			alert(errorMessage);
		  });

	});
}

function addObjectToClient(x, y, health, seed, objectName, Image, userName){
	
	let objectTemplate = Object.create(
	Object.getPrototypeOf(jsonData),
		Object.getOwnPropertyDescriptors(jsonData)
	);
	objectTemplate["lastX"]["lastPositionX"] = x;
	objectTemplate["lastY"]["lastPositionY"] = y;
	objectTemplate["seed"] = seed;
	objectTemplate["name"] = objectName;
	objectTemplate["imageSrc"] = Image;
	objectTemplate["health"] = health;
					
	if(userName != undefined){
		console.log("fella");
		objectTemplate["userName"] = userName;
	}
	
	entities.push(objectTemplate);
	console.log(entities);

}