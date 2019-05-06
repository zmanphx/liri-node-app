# liri-node-app


**Liri Bot** is command line application demonstrating **node.js** node packages to make requests to *OMDB*, *Spotify*, and  *Bands in Town* . 

The following  *npms* are used in this application:
+ **node-spotify-api**
+ **Moment** ( date time format)
+ **cli-color** ( console font color)
+ **axios**  (Calling api for OMDB and Bands in Town)
+ **fs**  ( file stream reading and and writing to a file)


 
___

**OMDB api**: Getting movie information using ***movie-this***   _[movie title]_. 

![](OmdbCapture.jpg)
___
**Bands-in-Town Api**: Getting concert events using at the command line ***concert-this*** *[band or artist name]* 

![](bandsInTownExample1.jpg)
![](bandsInTownExample2.jpg)
___
**Spotify api**: Song artist information. 
***spotify-this-song*** *[song ]*

![](spotifyCapture.jpg)

If no song is supplied when calling the command line then it will default to *The Sign by Ace of Base*
![](spotifyCaptureNoSong.jpg)

___
**FS file Stream npm** Reading a txt file: 
Reading the contents of text file to run spotify for
*I want it that way by Back Street Boys*. ***do-what-it-says***

![](doWhatitSaysCapture.jpg)
 
 ___
 **Logging** and **font console color**
If an undefined command is entered, the logic will 
render in red font the bad command. This application I coded to log every output from the commands. Separate log files are created for *Spotify*, *Bands in Town* , *OMDB* and bad commands. I used npm *cli-color* to render different console font colors . 

![](badCommand.jpg)

