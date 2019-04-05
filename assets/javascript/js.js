// Initialize Firebase
var config = {
    apiKey: "AIzaSyBmg-CE_tJCexAwTgRSZYaMUotp1jU-rk0",
    authDomain: "train-99dfb.firebaseapp.com",
    databaseURL: "https://train-99dfb.firebaseio.com",
    projectId: "train-99dfb",
    storageBucket: "train-99dfb.appspot.com",
    messagingSenderId: "806108538159"
  };
  firebase.initializeApp(config);

// Create a variable to reference the database
var database = firebase.database();

// Initial Values
//Train runs from 8-6pm
var trains = [{
    train: "Reading Railroad",
    destination: "Baltic Avenue",
    frequency: 10
},
{
    train: "Pennsylvania Railroad",
    destination: "Virginia Avenue",
    frequency: 15
},
{
    train: "B & O Railroad",
    destination: "Pacific Avenue",
    frequency: 20
},
{
    train: "Short Line",
    destination: "Boardwalk",
    frequency: 30
}];

var currentTrain = 0;


//Eventhandler when user submit data
document.querySelector("#submit").addEventListener("click", function(event) {
    event.preventDefault();

    train = document.querySelector("#train-name").value.trim();
    destination = document.querySelector("#destination-input").value.trim();
    trainTime = document.querySelector("#train-time").value.trim();
    frequency = document.querySelector("#frequency-input").value.trim();

    database.ref().set({
        train: train,
        destination: destination,
        trainTime: trainTime,
        frequency: frequency
    });
});
//Function to get a snapshot of the stored data usng Firebase
database.ref().on("value", function(snapshot) {
//Display in HtML
document.querySelector("#train-name-here").innerHTML = snapshot.val().train;
document.querySelector("#destination-here").innerHTML = snapshot.val().destination;
// document.querySelector("#frequency-display").innerHTML = snapshot.val();// Not sure
// document.querySelector("#arrival-display").innerHTML = snapshot.val();
// document.querySelector("#minaway-display").innerHTML = snapshot.val();

 // Handle the errors
}, function(errorObject) {
    console.log(`Errors handled: ${errorObject.code}`);
  });