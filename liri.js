// 6. At the top of the `liri.js` file, write the code you need to grab the data from keys.js. Then store the keys in a variable.

//7. Make it so liri.js can take in one of the following commands:

  // * `my-tweets`

  // * `spotify-this-song`

  // * `movie-this`

  // * `do-what-it-says`


// ================================ VARIABLES ================================ //

var fs = require("fs");

// Requiring  keys.js
var keys = require("./keys");

// Requiring  twitter, spotify and request files from the node_modules folder
var Twitter = require("twitter");
var spotify = require("spotify");
var request = require("request");

// Copying the twitter keys from keys.js into a NEW variable named client.
// this may be redundant as per line 42 in the twitter function
var client = new Twitter(keys.twitterKeys);

// Defining argument arrays
var command = process.argv[2];
var value = process.argv[3];

// ================================ FUNCTIONS ================================ //

function twitter() {

	// Putting a reference to the keys into a variable
	var twitterKeys = require("./keys.js").twitterKeys;

	// Assigning the keys to the new variable
	var client = new Twitter({

		consumer_key: twitterKeys.consumer_key,
		consumer_secret: twitterKeys.consumer_secret,
		access_token_key: twitterKeys.access_token_key,
		access_token_secret: twitterKeys.access_token_secret
	});

	// What to search for...will be the dummy username
	var params = {

		screen_name: "liribot_00",
	};

	// Requesting the tweets using the parameter of the dummy username through
	// a function that will return either the error or the tweets.
	client.get("status/user_timeline", params, function(error, tweets) {

		if(error){
			console.log(error);
		} else {
			// Cycle through all of the tweets and numbers them as it logs.
			for (i = 0; i < tweets.length; i++) {
				console.log((i+1) + ": " + tweets[i].text);
			}
		}
	});
} // END twitter function

function spotify() {

	spotify.search({ type: "track", query: "value" || "rick astley never gonna give you up"}. function(error, data) {

			if(error) {
				console.log("ERROR: " + error);
			} else {

				// grabs the returned data and specifies what we need from the spotify api
				// then puts it into a variable.
				var spotifyCall = data.tracks.items[0];

				var artist = spotifyCall.artist[0].name;
				console.log("Artist: " + artist);

				var song = spotifyCall.name;
				console.log("Track: " + song);

				var album = spotifyCall.album.name;
				cosole.log("Album: " + album);

				var preview = spotifyCall.preview_url;
				console.log("Preview link: " + preview);
			} // END else statement
	}); // END spotify.search
} // END spotify function

function movieRequest() {

	// Assigning the value of the search to a variable called movvieName
	var movieName = value;
	// Setting the defauly choice to pulp fiction if nothing is selected
	var movieDefault = "Pulp Fiction";

	// Searches the chosen movie
	var url = 'http://www.omdbapi.com/?t=' + movieName + '&y=&plot=short&r=json';

	// Searches the default choice
	var urlDefault = 'http://www.omdbapi.com/?t=' + movieDefault + '&y=&plot=short&r=json';

	// If the value assigned to movieName is filled search that
	if(movvieName != null) {

		request(url, function(error, response, body) {

			// Then if there is no error and the response code matches
			if (!error && response.statusCode == 200) {

				// Log the movie info. JSON parse to convert it from a JSON object.
				console.log("Title: " + value);
				console.log("Year: " + JSON.parse(body)["Year"]);
				console.log("Rating: " + JSON.parse(body)["imdbRating"]);
				console.log("Country of Production: " + JSON.parse(body)["Country"]);
				console.log("Language: " + JSON.parse(body)["Language"]);
				console.log("Plot: " + JSON.parse(body)["Plot"]);
				console.log("Actors: " + JSON.parse(body)["Actors"]);
            }; // END inner if statement

		}); // END request

	// If there isnt any value, default to Pulp Fiction
	} else {
		request(urlDefault, function(error, response, body) {

			console.log("Title: " + movieDefault);
			console.log("Year: " + JSON.parse(body)["Year"]);
			console.log("Rating: " + JSON.parse(body)["imdbRating"]);
			console.log("Country of Production: " + JSON.parse(body)["Country"]);
			console.log("Language: " + JSON.parse(body)["Language"]);
			console.log("Plot: " + JSON.parse(body)["Plot"]);
			console.log("Actors: " + JSON.parse(body)["Actors"]);

		}) // END else

} // END movieRequest function


// ================================ LOGIC ================================ //

// switch case for whatever command the user inputs
switch(action) {

	// in the case of the my-tweets command, run the twitter function
	case "my-tweets";
		twitter();
	break;	

	// in the case of the this-song command, run the spotify function
	case "spotify-this-song";
		spotify();
	break;

	// in the case of the movie-this command, run the movieRequest function
	case "movie-this";
		movieRequest();
	break;

	case 'do-what-it-says':
        doit();
    break;

    default:
    break;

}





// USE A SWITCH COMMAND FOR WHAT THE USER ENTERS
