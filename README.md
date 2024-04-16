# Movie Rater
Startup application for BYU CS 260

## Elevator Pitch:
Have you ever been faced with the question of “What is your favorite movie?” or even “What are some of your favorite movies?”  When this question comes up, my mind typically goes blank and I seem to forget every movie I’ve ever seen.  With the Movie Rater app, you’ll be able to keep track of the movies you watch and how highly you rated them on a 10 star rating system.  

## Design:
#### Login Screen:
<picture>
  <img alt="Image Alt Text" src="/images/LoginPage.png" height=250 width=300>
</picture>

#### Library:
<picture>
  <img alt="Image Alt Text" src="/images/LibraryPage.png" height=250 width=400>
</picture>

## Key Features:
- Secure login over HTTPS
- Keep track of movies you’ve seen in a personal library
- Rate those movies on a scale from 1 to 10
- See what others are rating movies in real time

## Technologies:

I will be using the required technologies in the following ways:
- HTML: This will be used for the structure of the application and will involve two HTML pages.  The first page will be for user login and the second page will be the personal library with the ability to add movies with an associated rating.
- CSS: This will be used for the styling of the web application so it looks professional and works on various browser sizes.
- Javascript: This will be used for login, movie rating and adding, and backend endpoint calls.
- Web service: Backend service with endpoints for the following -
  - Login
  - Retrieving movie information
  - Submitting ratings
  - Retrieving libraries
- Authentication and DB persistence: This will be used to store users, movie libraries, and ratings in a database.  This will be used to register and login users whose credentials are securely stored in the database.  Users must be authenticated before adding movies to a library.
- WebSocket: As people rate movies, their ratings will be broadcast to all other users real time as shown in the library page design above.
- React: The application will be ported to use the React web framework.

# HTML Deliverable
For this deliverable I built out the structure of my application using HTML.
- HTML Pages: Three HTML pages
  - index.html: The home page for my app where people can log in to their account with a username and password
  - library.html: This page will be each user's personal library that they've been adding movie ratings too.  This addition of movies will be done with Javascript and can be done from this same page.  Also, when adding movies it will use an external API to get more information about the movie such as release date, rating, and a link to a poster.
  - leaderboard.html: There will also be a page that will display the top ten movies based on average rating from each user, including how many reviews that movie received
- Links: There is a navigation bar at the top of the screen with links to each html page.  Each page also has a footer linking my github repo.
- Text: I have represented the user library with a very rudimentary table filled with example text of what a user's library might look like.
- Images: On my Library page I incorporated images which are posters that corespond to the user's movie entry.  I will use an API to get these posters once the user has submitted the title of the movie they would like to add.
- DB/Login - Input box and submit button for login. The user's library represents data pulled from the database.  Same for the leaderboard.
- WebSocket - On the library page you will be able to see realtime what other people are rating movies.

# CSS Deliverable
For this deliverable I properly styled the application into its final appearance using CSS.
 - Header, footer, and main content body are structured where they need to be
 - Navigation elements - I created a navigation bar that spans the top of the page.  There are three links that change color when hovered or clicked and link to each page
 - Responsive to window resizing - My app uses flex and grid to fit to each screen size optimally
 - Application elements - used good contrast and whitespace
 - Application text content - Conisistent fonts and sizing
 - Application images - Images are placed into a grid with even spacing that wraps to the next line if the screen gets too small to fit multiple images side by side

# JavaScript Deliverable
For this deliverable I implemented my JavaScript so that the application works for a single user. I also added placeholders for future technology.
 - login - When you press the login button it takes you to the library page and saves your username to display on the page
 - library - My JavaScript does a few things on this page but essentially it takes in a movie title and a rating and if everything works out, it looks up the movie poster and displays it in your library with the title and rating below it.  If the title is not completely accurate it may not find the poster and will instead alert you with an error.  Other errors thrown include a rating out of range (0 - 10) or a rating that is text instead of a number. This is all stored in local storage for now but will be replaced with the database data later.
 - WebSocket - I used the setInterval function to periodically say that a random user has rated a random movie with a random rating.  I made it so that after the list reaches 5 lines it will cycle out the oldest line before adding the new line.
 - leaderboard logic - The leaderboard takes an average rating for each movie and orders the top ten rated movies, also listing how many ratings they have received.  For now it is only based on what is in the local storage so it will only be for the one user but this will be updated later.

# Service Deliverable
For this deliverable I added backend endpoints that receives username at login and returns that username on the library page -- when a new user logs in it replaces the current user and clears all info (This will be updated so that data persists tied to a specific user when we do login).  I also have endpoints which receives movie data and stores it as well as retrieves that movie information for display.
 - Node.js/Express HTTP service - done!
 - Static middleware for frontend - done!
 - Calls to third party endpoints - done! (This is how I obtain the posters for display on the library screen -- I call an api called OMDBapi)
 - Backend service endpoints - Placeholders for login is there -- Endpoints for adding and retrieving movie data are implemented.
 - Frontend calls service endpoints - I replaced all instances of local storage with calls to my backend services using the fetch function.

# DB/Login Deliverable
For this deliverable I associate certain movies and their ratings with the specific logged in user.  These movies are stored in the mongo database, as well as the users themselves.
 - MongoDB Atlas database created - done!
 - Stores data in MongoDB - done!
 - User registration - Creates a new account in the database.  Alerts the user if the username is already taken
 - Existing user - Allows a user to log in if their information matches what is in the database.  Logging in takes them to their library which has their movies and ratings and allows them to add to their library.
 - Use MongoDB to store credentials - Stores both user and their movies
 - Restricts functionality - You cannot access the library page or leaderboard page without being logged in (it redirects you back to the login) - You can't add movies without being logged in.
 - Leaderboard funcionality - The leaderboard is updated using all movies and ratings from every user.  It finds each movie's average rating, lists the top ten, and how many people have rated it.  In the future I'm thinking of adding a condition that at least 5 people must have rated the movie just so we don't get a bunch of 10 rated movies up there from a single user.

# WebSocket Deliverable
For this deliverable I used webSocket to display user's ratings in realtime.
 - Backend listens for WebSocket connection - done!
 - Frontend makes WebSocket connection - done!
 - Data set over WebSocket conneciton - done!
 - WebSocket data displayed - When you rate a movie, if another user is online at the same time it will display to them your username, the movie you rated, and what you rated it.  I made it so that it rolls over if there are more than 5 messages in the box with the oldest message leaving first.

# React Deliverable
For this deliverable I converted the application to use React.
 - Bundled and transpiled - done!
 - Components - Login, Library, and Leaderboard components.
 - Router - Routing between the Login, Library, and Leaderboard components works.
 - Hooks - I use the useState hook to keep track of certain changes such as username, user personal library, and the list of all movies used for the leaderboard.  I also use the useEffect hook to keep track of various methods such as generateLeaderboard(), fetchMovies(), and establishWebsocket().
