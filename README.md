# art-recognition


Capstone Project								Steven Hendricks

Art Recognition

What problem does your project solve?
	This project solves the problem of observing an art piece and not being familiar/knowing the artist history or details of the work of art.  In this case, the viewer would use the camera on their phone to take a picture of the artwork and the phone would then display relevant information associated with the piece:  Title, artist, year, location, cost, owner, place to purchase

Who has this problem?
	Typically an art museum would have an info card associated with each piece that has the relevant information, however, this could be missing, outdated or you could be at a friends house where there is no info card.  

By using the app you would be giving more information than the info card contains and you would be given the opportunity to dive deeper into the artist themselves, see other pieces within a series/from that artists, places to see other pieces from this artists, and even see similar pieces from other artists.  

How will your project solve this problem?
	The app uses snapshot software to enable the webcam.  Once this is enabled, the user takes a photo of the art-piece to create a 64bit encoded version.  The snapshot gets sent to Imgur to be decoded and hosted publicly.  The url comes back and is relayed to IBMs Watson Image Recognition API where a comparison is made with the pre-trained classes to determine a match.

What inputs does it need?
	The app would use the camera as the input to see the artwork and make the connection to APIs/database

What outputs does it produce?
	The app would produce an output of:
			Artist
			Score

What web APIs will it use?

	Art APi’s:
		Watson Visual Recognition
		https://www.ibm.com/watson/developercloud/visual-recognition.html

		Imgure API
		https://api.imgur.com/

What technologies will it use?
	Uses standard stack with HTML5, CSS3, jQuery, express + postgres 

What additional features will it have?

Process flow
	Camera (image) => wiki basic info => Art API for detailed info/results
