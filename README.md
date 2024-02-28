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
