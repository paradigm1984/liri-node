// https://github.com/Multishifties/liri-node-app/blob/master/liri.js

// ================================ VARIABLES ================================ //


var fs = require("fs");

// Requiring  keys.js
var keys = require("./keys");


// Defining which command
var command1 = process.argv[2];

// This will be the name of a movie or song 
var command2 = process.argv[3];

// ================================ FUNCTIONS ================================ //

// my-tweets
function twitterSearch() {


	var Twitter = require("twitter");

	// Assigning the keys to the new variable
	var client = new Twitter({

		consumer_key: "h6ngogUMaRioS2GRRozVb829a",
		consumer_secret: "xyAcTgyKiMVXUZscs3XkZy6ss9ONoQRsoopjpPIHGsthpsFIDY",
		access_token_key: "4075883716-HsLUeiFawVey1mmRCVAhREIzF2mz8pIeg4AoBEH",
		access_token_secret:  "CDFuFOMSldelqTVAvA0o6svUdpdgT8bKSRrJE2tjWY4cH",
	});

	// What to search for...will be the dummy username
	var params = {

		screen_name: "liribot___",
		count: 20,
	};

	// Requesting the tweets using the parameter of the dummy username through
	// a function that will return either the error or the tweets.
	client.get("status/user_timeline", params, function(error, tweets) {

		if(error){
			// I keep getting an error when i try to run this. 
			// "[ { message: 'Sorry, that page does not exist', code: 34 } ]"
			// tried to look it up but there were multiple causes for that error code.
			// the consumer and access info is the same as in my keys.js file
			console.log(error);
		} else {
			// Cycle through all of the tweets and numbers them as it logs.
			for (i = 0; i < tweets.length; i++) {
				console.log((i+1) + ": " + tweets[i].text);
			}
		}
	});
} // END twitter function

// spotify-this-song
function spotifySong() {

	var spotify = require("spotify", "spotify-web-api-node");
	

	var searchTrack;

	// If the users selection is left blank, search "never gonna give you up"
	if(command2 === undefined){

		searchTrack = "Never gonna give you up";

		// Otherwise set command2 equal to searchTrack
	}else {
		searchTrack = command2;
	}

	//launch spotify search
	spotify.search({type:'track', query: searchTrack, limit: 1 }, function(err, data){
	    if(err){
	        console.log('Error occurred: ' + err);
	        return;
	    }else {

	        // Here i dont get a callback error but i get a typeError that tells me it cant get the item property of undefined
	        // I set it to searchTrack above so i have no idea why its undefined.

	        // items is supposed to be a function in the spotify-web-api-node that would return an array of tracks, but
	        // we were asking for the first one in that array. 
	  		var spotifyCall = data.tracks.items[0];

				var artist = spotifyCall.artist[0].name;
				console.log("Artist: " + artist);

				var song = spotifyCall.name;
				console.log("Track: " + song);

				var album = spotifyCall.album.name;
				cosole.log("Album: " + album);

				var preview = spotifyCall.preview_url;
				console.log("Preview link: " + preview);
	    }
	});
} // END spotify function

// movie-this
function movieRequest() {

	var movieApiKey = "http://www.omdbapi.com/?apikey=[40e9cece]&";

	var request = require("request");

	if(command2 === null) {

		command2 = "Pulp Fiction";
	}

	var url = "http://www.omdbapi.com/?apikey=[40e9cece]&" + command2 +'&y=&plot=long&tomatoes=true&r=json';

   	request(url, function(error, response, body){

	    if(!error && response.statusCode == 200){

	        console.log("Title: " + JSON.parse(body)["Title"]);
	        console.log("Year: " + JSON.parse(body)["Year"]);
	        console.log("IMDB Rating: " + JSON.parse(body)["imdbRating"]);
	        console.log("Country: " + JSON.parse(body)["Country"]);
	        console.log("Language: " + JSON.parse(body)["Language"]);
	        console.log("Plot: " + JSON.parse(body)["Plot"]);
	        console.log("Actors: " + JSON.parse(body)["Actors"]);
	    } else {
	    	// Getting status code 401 and the error is null
	    	// From what I read, it could be from the URL but I know I have the right one. 
	    	// The issue has to be in trying to connect to the API. 
	    	// I grabbed the url for sending data requests from omdbapi.com and added the api key you gave us
	    	// and then passed in the parameters after.
	    	console.log("error type: " + error + ", " + "response code: " + response.statusCode);
	    }
    });

}	

// Didnt even get a chance to work on the doSomething(); because of how much time everything took. I definitley want to sit down
// and go over this assignment becasue theres still alot I dont get.  

// ================================ LOGIC ================================ //

// The logic works fine. this was the easiest part of the assignment lololol.

// switch case for whatever command the user inputs
switch(command1) {

	// in the case of the my-tweets command, run the twitter function
	case "my-tweets":
		twitterSearch();
	break;	

	// in the case of the this-song command, run the spotify functionmovie
	case "spotify-this-song":
		spotifySong();
	break;

	// in the case of the movie-this command, run the movieRequest function
	case "movie-this":
		movieRequest();
	break;

	case 'do-what-it-says':
        doit();
    break;

    default:
    break;
};

