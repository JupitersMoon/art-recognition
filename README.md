# art-recognition


Capstone Project								Steven Hendricks

Art Recognition

What problem does your project solve?
	This project will solve the problem of observing an art piece and not being familiar/knowing the artist history or details of the work of art.  In this case, the viewer would use the camera on their phone to take a picture of the artwork and the phone would then display relevant information associated with the piece:  Title, artist, year, location, cost, owner, place to purchase

Who has this problem?
	Typically an art museum would have an info card associated with each piece that has the relevant information, however, this could be missing, outdated.  

By using the app you would be giving more information than the info card contains and you would be given the opportunity to dive deeper into the artist themselves, see other pieces within a series/from that artists, places to see other pieces from this artists, and even see similar pieces from other artists.  

How will your project solve this problem?
	There are multiple methods that can solve this problem yet they can get complex quickly.

First simple method (MVP):
Use the camera from the phone or the laptop to run an image search on google and pull the search results and display info from wikipedia or another database.

Machine learning/custom DB:		
Integrate a database of user created images along with the relevant info that the computer can match with the image and then display the correct info to the user.

What inputs does it need?
	The app would use the camera as the input to see the artwork and make the connection to the database

What outputs does it produce?
	The app would produce an output of:
			Artist
			Title
			Year created
			Current location
			Other pieces by the artist
			Bio of the artist
			Similar artists/pieces
			Cost if available
			Purchasing options if available

What web APIs will it use?
	Could use the MediaWiki to get encyclopedia info
	Google maps API to get your location/ tell you the location of more art
	Needs camera interface
	getUserMedia API

	Art APi’s:
		Watson Visual Recognition
		https://www.ibm.com/watson/developercloud/visual-recognition.html

		Imgure API
		https://api.imgur.com/

What technologies will it use?
	Planning to use the standard tools along with Angular and the Camera from the phone or the laptop.

What additional features will it have?

Process flow
	Camera (image) => wiki basic info => Art API for detailed info/results
