Welcome to my web dev 12 project! HungryGame is a showcase of Google's realtime database service "Firebase" to create a decentralized multiplayer sandbox game. 
Live demo on the website NT2M.online. If stuck on the loading screen, try restarting the webpage. If further issues persist, let me know.

About this project:
  Whilst this originated from an in-class project to learn the basic practices of cloud databases, I was inspired to push my limits and experiment 
  with Google's Firebase database program to create a 2d multiplayer experience.

  The user client makes API calls to firebase to update the database of movement delta and interact options, and the server returns the new "world json"
  which calculates the current position and state of the world. This allows players to see each other, move around, and craft objects with sticks and stones

  In terms of logic, the game is completely decentralized. there is no server-side script which manages the game, but instead clients take turns calculating 
  the current vector positions of objects and updates the database with the new information.

Tech Stack:
  Javascript: manages game logic and sends / fetches API requests from Firebase
  HTML + CSS: Is the project website and game canvas
  PHP: Functions adjacent to the main game, which allows users to create accounts and sign in
  PWA manifest
  Web assets such as game sprites and sound effects

Game Features:
  Player movement, animations, and combat
  Crafting system (axe, spear)
  Resource gathering (trees, rocks, berries)
  World Save/load using Firebase
  Mobile-compatible on-screen joystick
  Progressive Web App (PWA) support

Key Challenges:
  Developing the synchronous client-database update system
  Experimenting with workarounds for the lack of a server-side script
  Creating animations for players and tools

Future Improvements:
  Revamped canvas image display (screens not 1920x1080 will display objects at an offset, not representative of the "real" position)

