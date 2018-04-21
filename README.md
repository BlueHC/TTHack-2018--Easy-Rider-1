# Node.js Hello World Sample

This application demonstrates a simple, reusable Node.js web application based on the Express framework.

## Run the app locally

1. [Install Node.js][]
1. cd into this project's root directory
1. Run `npm install` to install the app's dependencies
1. Run `npm start` to start the app
1. Access the running app in a browser at <http://localhost:6001>

[Install Node.js]: https://nodejs.org/en/download/

## API-Endpunkte

1. GET - http://easyriderbackend.eu-gb.mybluemix.net/occupancy?mediumID=1 - Gibt die Auslastung für das in der Query angegebene Medium zurück
2. POST - http://easyriderbackend.eu-gb.mybluemix.net/occupancy?mediumID=1
  {
	  "latitude": 123432.222,
	  "longitude": 42332.21,
	  "amount": 99
  }
  
3. POST - http://easyriderbackend.eu-gb.mybluemix.net/ride

	{
        	"userID": 1234,
        	"station": "Bremen Vahr",
		"longitude": 25134.1232,
		"latitude": 1234423.3222,
		"time": 12341234,
		"mode": "Regio",
		"transportID": 1242,
		"beginning": true
	}
