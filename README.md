[![CircleCI](https://circleci.com/gh/jma921/movie-collector.svg?style=svg)](https://circleci.com/gh/jma921/movie-collector)

# Auth with React Router V4 and Firebase V3
This is an example repo for authenticating with Firebase and React Router.

*Using React 15.4.0, React Router 4, and Firebase 3.6.1*

#### Features:
* Protected Routes with React Router
* Register new users with Firebase
* Add new users to ```/users``` in your Firebase database
* Login/Logout Functionality
* Simple Boostrap UI

#### Instructions:
* Swap out the firebase config variables in ```example.env``` with your own variables from firebase
* Get a API key from [themoviedb.org](https://www.themoviedb.org/documentation/api) and change the ```REACT_APP_MOVIE_DB_KEY``` in ```example.env``` and rename it to ```.env```
* ```npm install```
* ```npm start```
* Visit ```localhost:3000```
