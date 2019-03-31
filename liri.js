/*  This is liri bot js file.

    This program is called by node in console to look up for conccerts/movies/songs. The API get call results are printed on the console.

    Written by Alex Chalyy on 3/29/2019.    */

require("dotenv").config();
const axios = require("axios");
const moment = require("moment");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var fs = require("fs");

//--------------------------------------------------------------------------------

app(process.argv[2], MakeTitle());

//--------------------------------------------------------------------------------

function MakeTitle() {

    //  This function creates title from user input for the search.

    var c = 3;
    var title = process.argv[3];

    while (process.argv[c + 1]) {
        title += " " + process.argv[c + 1];
        c++;
    }

    return title;
}

//--------------------------------------------------------------------------------

function app(command, parameter) {

    //  This statement checks for user input and performs proper action.

    switch (command) {
        case "concert-this":
            if (parameter) {
                showConcert(parameter);
            }
            else showConcert("drake");  // if user does not enter artist/band, drake concerts are looked up
            break;
        case "spotify-this-song":
            if (parameter) {
                showSong(parameter);
            }
            else Sign();
            break;
        case "movie-this":
            if (parameter) {
                showMovie(parameter);
            }
            else showMovie("Mr. Nobody");
            break;
        case "do-what-it-says":
            doWhatItSays();
            break;
        default:
            console.log("Liri does not know this command. Please try again.");
    }
}

//--------------------------------------------------------------------------------

function showConcert(parameter) {

    //  This function requests artist/band concert information and prints out venue name/location/date for top 5 results.

    var queryUrl = "https://rest.bandsintown.com/artists/" + parameter + "/events?app_id=codingbootcamp";

    axios.get(queryUrl)
        .then(function (response) {
            for (var c = 0; c < 5; c++) {
                if (response.data[c])   {
                    console.log("\nVenue name: " + response.data[c].venue.name);
                    console.log("Venue location: " + response.data[c].venue.country + ", " + response.data[c].venue.city);
                    console.log("Date of the event: " + moment(response.data[c].datetime).format('MM/DD/YYYY'));
                }
            }
            console.log("\n");
        })
        .catch(function (error) {
            console.log(error);
        });
}

//--------------------------------------------------------------------------------

function showSong(song) {

    //  This function requests song information and prints artist(s), song name, a preview link of the song from spotify, and album.

    spotify
        .search({ type: 'track', query: song })
        .then(function (response) {
            for (var c = 0; c < 5; c++) {
                console.log("\nArtist: " + response.tracks.items[c].album.artists[0].name);
                console.log("Song: " + response.tracks.items[c].name);
                console.log("Preview link: " + response.tracks.items[c].external_urls.spotify);
                console.log("Album: " + response.tracks.items[c].album.name);
            }
            console.log("\n");
        })
        .catch(function (err) {
            console.log(err);
        });
}

//--------------------------------------------------------------------------------

function Sign() {

    //  This function makes api spotify get call for Ace of Base "The Sign" song and prints out in case no input is added for search song name.

    spotify
        .search({ type: 'track', query: 'The Sign' })
        .then(function (response) {
            for (var c = 0; c < 100; c++) {
                if (response.tracks.items[c]) {
                    if (response.tracks.items[c].album.artists[0].name == "Ace of Base") {
                        console.log("\nArtist: " + response.tracks.items[c].album.artists[0].name);
                        console.log("Song: " + response.tracks.items[c].name);
                        console.log("Preview link: " + response.tracks.items[c].external_urls.spotify);
                        console.log("Album: " + response.tracks.items[c].album.name);
                    }
                }
            }
            console.log("\n");
        })
        .catch(function (err) {
            console.log(err);
        });
}

//--------------------------------------------------------------------------------

function showMovie(movie) {

    //  This function displays movie search results from OMDB API get call and displays title, year, ratings, country, language, plot, and actors. 

    var queryURL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=full&apikey=trilogy&tomatoes=true";

    axios.get(queryURL)
        .then(function (response) {
            console.log("\nMovie Title: " + response.data.Title);
            console.log("Release Year: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.Ratings[0].Value);
            console.log("Rotten Tomatoes Rating: " + response.data.tomatoRating);
            console.log("Country where Produced: " + response.data.Country);
            console.log("Language of movie: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors + "\n");
        })
        .catch(function (error) {
            console.log(error);
        });
}

//--------------------------------------------------------------------------------

function doWhatItSays() {

    //  This function runs Spotify api get call from random.txt file.

    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        }

        // Break down all the numbers inside
        data = data.split(",");
        app(data[0], data[1]);
    });
}