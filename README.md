# Basic Twitter Feed
 A basic Twitter feed app built with Node and React.

## Tech Stack
- JavaScript - for app and server
- Node.js - for server
- React - for app
- Axios - for API calls from app to server
- Ant Design - for quick, clean UI elements in app
- Jest - for unit testing on server

## Run Instructions

1. Clone repo
2. Run ```npm install``` in ```/app```
3. Run ```npm start``` in ```/app``` to run the React app.
4. Navigate to ```/server```
5. Run unit tests on server: ```npm run test```
6. Run server: ```node server.js```
7. Refresh React app as it will now be able to connect to the Node server.
8. Change ```user.txt``` or ```tweet.txt``` in ```/data``` for different input data.

## Assumptions

- Names are the unique ID of a user (as no other ID given)
- Names can contain spaces
- Names are case-sensitive
