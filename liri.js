/*  This is liri bot js file.

    This program is called by node in console to look up for conccerts/movies/songs. The API get call results are printed on the console.

    Written by Alex Chalyy on 3/29/2019.    */

require("dotenv").config();
const axios = require("axios");
var keys = require("./keys.js");

//--------------------------------------------------------------------------------

app(process.argv[2], process.argv[3]);

//--------------------------------------------------------------------------------

function app(command, parameter) {

    //  This statement checks for user input and performs proper action.

    switch (command) {
        case "concert-this":
            showConcert(parameter);
            break;
     /*   case "spotify-this-song":
            showSong(parameter);
            break;
        case "movie-this":
            showMoive(parameter);
            break;
        case "do-what-it-says":
            doWhatItSays();
            break; */
        default:
            console.log("Liri does not know this command. Please try again.");
    }
}

//--------------------------------------------------------------------------------

function showConcert(parameter) {

    var queryUrl = "https://rest.bandsintown.com/artists/" + parameter + "/events?app_id=codingbootcamp";

    axios.get(queryUrl)
        .then(function (response) {
            console.log(response.data[0].venue.jason.stringify);
        })
        .catch(function (error) {
            console.log(error);
        });
}