/*  This is liri bot js file.

    This program is called by node in console to look up for conccerts/movies/songs. The API get call results are printed on the console.

    Written by Alex Chalyy on 3/29/2019.    */

require("dotenv").config();
const axios = require("axios");
const moment = require("moment");
var keys = require("./keys.js");
moment().format();

//--------------------------------------------------------------------------------

app(process.argv[2], process.argv[3]);

//--------------------------------------------------------------------------------

function app(command, parameter) {

    //  This statement checks for user input and performs proper action.

    switch (command) {
        case "concert-this":
            if (parameter)  {
                showConcert(parameter);
            }
            else showConcert("drake");  // if user does not enter artist/band, drake concerts are looked up
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

//  This function requests artist/band concert information and prints out venue name/location/date for top 5 results.

    var queryUrl = "https://rest.bandsintown.com/artists/" + parameter + "/events?app_id=codingbootcamp";

    axios.get(queryUrl)
        .then(function (response) {
            for (var c = 0; c < 5; c++) {
                console.log("\nVenue name: " + response.data[c].venue.name);
                console.log("Venue location: " + response.data[c].venue.country + ", " + response.data[c].venue.city);
                console.log("Date of the event: " + moment(response.data[c].datetime).format('MM/DD/YYYY'));
            }
            console.log("\n");
        })
        .catch(function (error) {
            console.log(error);
        });
}