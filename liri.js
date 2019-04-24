require("dotenv").config();

var Spotify = require("node-spotify-api");
var Moment = require("moment");
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var fs = require("fs");


var axios = require("axios");
const clc = require("cli-color");

// Store all of the arguments in an array
var nodeArgs = process.argv;
appendlog("NodeCommandLog.text", nodeArgs);
console.log("my node args " + nodeArgs);
var commandarg = process.argv[2];
console.log("my command " + commandarg);
var resplice = nodeArgs.splice(3).join(' ');

console.log("my node thing " + resplice);
nodeCommands(commandarg, resplice);
// Create an empty variable for holding the movie name

function nodeCommands(command, thing) {
  switch (command) {
    case "concert-this":
      bandsIntown(thing);
      break;
    case "spotify-this-song":
      spotifyFind(thing);
      break;

    case "movie-this":
      omdbFind(thing);
      break;

    case "do-what-it-says": readRandom();
      break;
    default:
      console.log(clc.redBright(command + " is not a valid command"));
      appendlog("BadNodeCommandlog.txt", command + " is not a valid command");
  }
}

function omdbFind(movie) {
  var movieName = movie;
  //************************Call omdb api */

  // Then run a request with axios to the OMDB API with the movie specified
  var queryUrl =
    "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
  // This line is just to help us debug against the actual URL.
  console.log(queryUrl);
  appendlog("omdblog.txt", queryUrl );
  axios.get(queryUrl).then(function(response) {
    // console.log("Release Year: " + response.data.Year);
   
    var result =
      "\r\n\r\n" +
      "***************Movie Query**OMDB*************************" +
      "\r\n\r\n" +
      "Movie Title: " +
      response.data.Title +
      "\r\n" +
      "Year Released: " +
      response.data.Year +
      "\r\n" +
      "IMDB Rating: " +
      response.data.imdbRating +
      "\r\n" +
      "Rating Rotten Tomatoes: " +
      response.data.Ratings[1].Value +
      "\r\n" +
      "Country Produced :" +
      response.data.Country +
      "\r\n" +
      "Language :" +
      response.data.Language +
      "\r\n" +
      "Plot :" +
      response.data.Plot +
      "\r\n" +
      "Actors :" +
      response.data.Actors +
      "\r\n";
    console.log(clc.blueBright(result));
   
    appendlog("omdblog.txt", result );
    // console.log(response.data);
  });
}

function bandsIntown(artist) {
  console.log("Inside BandsInTown function");
  var website =
    "https://rest.bandsintown.com/artists/" +
    artist +
    "/events?app_id=codingbootcamp=upcoming";
  var colorindex = 0;
  appendlog("BandsInTownlog.txt", website );
 
  axios
    .get(website)
    .then(function(response) {
      // console.log(response.data);
      //console.log(clc.yellowBright(JSON.stringify(response.data, null, 2)));

      for (i = 0; i < response.data.length; i++) {
        var mydate = Moment(response.data[i].datetime).format("LLLL");
        //YYYY-MM-DDTHH:mm:ss
        var result =
          "\r\n\r\n" +
          "***********Bands In Town :***************************" +
          "\r\n\r\n" +
          "Presenting : " +
          artist +
          "\r\n" +
          "Venue Name :" +
          response.data[i].venue.name +
          "\r\n" +
          "Venue Location: " +
          response.data[i].venue.city +
          ", Region :" +
          response.data[i].venue.region +
          "\r\n" +
          "Date of Concert: " +
          mydate;

        //console.log(result);

        if (colorindex == 0) {
          console.log(clc.greenBright(result));
          colorindex = 1;
          appendlog("BandsInTownlog.txt", result );
        } else {
          console.log(clc.blueBright(result));
          colorindex = 0;
          appendlog("BandsInTownlog.txt", result );
        }

        
      }
    })
    .catch(function(error) {
      console.log(error);
    });
}


function appendlog(filename, textArg) {
  
  fs.appendFile(filename, "\r\n\r\n" + Moment().format("YYYY-MM-DD HH:mm:ss") + " " +textArg, function(err) {
    // If an error was experienced we will log it.
    if (err) {
      console.log(err);
    }

    // If no error is experienced, we'll log the phrase "Content Added" to our node console.
    else {
     // console.log("Content Added to " + filename);
    }
  });
}

function readRandom(){

  fs.readFile("random.txt", "utf8", function(error, data) {

    // If the code experiences any errors it will log the error to the console.
    if (error) {
      return console.log(error);
    }
  
    // We will then print the contents of data
    console.log(data);
  
    // Then split it by commas (to make it more readable)
    var dataArr = data.split(",");
  
    // We will then re-display the content as an array for later use.
    console.log("My DataArr " +dataArr);
    nodeCommands(dataArr[0], dataArr[1]);
  });

}

function spotifyFind(song) {
  console.log("checking if no song");

  if (song.length === 0) {
    console.log("Song was Empty");
    song = "The Sign Ace of Base";
  }

  spotify.search({ type: "track", query: song }, function(err, data) {
    if (err) {
      return console.log("Error occurred: " + err);
    }

    // console.log(data);
    var response = data.tracks.items[0];

    var artist = data.tracks.items[0].album.artists[0].name;
    var songName = data.tracks.items[0].name;
    var previewLink = data.tracks.items[0].external_urls.spotify;
    var album = data.tracks.items[0].album.name;
    var releaseDt = data.tracks.items[0].album.release_date;
    /* console.log(artist);
  console.log(songName);
  console.log(previewLink);
  console.log(album); */
    //console.log(JSON.stringify(response, null, 2));

    var result =
      "\r\n\r\n" +
      "***************Spotify Song Query*************************" +
      "\r\n\r\n" +
      "Artist: " +
      artist +
      "\r\n" +
      "Songs Name: " +
      songName +
      "\r\n" +
      "Preview Link: " +
      previewLink +
      "\r\n" +
      "Album name: " +
      album +
      "  " +
      "--Release Date: " +
      releaseDt +
      "\r\n";
     
    console.log(clc.cyanBright(result));

    appendlog("spotifylog.txt", result );
  });

  



}
