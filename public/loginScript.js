  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
  import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-analytics.js";
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyDrgE3R2Ost3nmD-F6a-TRxlNdArwLHUkk",
	authDomain: "gimblefreerobux.firebaseapp.com",
	databaseURL: "https://hungrygame.firebaseio.com/",
	projectId: "gimblefreerobux",
	storageBucket: "gimblefreerobux.appspot.com",
	messagingSenderId: "1032048641919",
	appId: "1:1032048641919:web:90e5e97e98495529457c4a",
};

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);
  const analytics = getAnalytics(app);
  const auth = getAuth();

let signUp;
let signup;
let textBox;
let login;
let userName;
let loginExclusive;

let nameElement = document.getElementById("name");
let toggle = "signUp";
let title;

window.onload = function(){
	
	textBox = document.getElementById("text");
	loginExclusive = document.getElementById("loginExclusive");
	
	console.log(textBox.innerHTML);
	title = document.getElementById("title");
	signUp  = document.getElementById("signUp");
	signup = document.getElementById("signup");
	login = document.getElementById("login");
	
	let href = document.getElementById("a");
	
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
			
			update(ref(database, 'users/' + user.uid),{
				last_login: dt,
			})
			alert('User logged in');
			window.location.href = "index.html";


		  })
		  .catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			alert(errorMessage);
		  });

	});

	signup.addEventListener('click',(e) => {

		console.log("hello");

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

