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

//Eventhandler when user submit data
document.querySelector("#submit").addEventListener("click", function (event) {
    event.preventDefault();

    train = document.querySelector("#train-name").value.trim();
    destination = document.querySelector("#destination-input").value.trim();
    trainTime = document.querySelector("#train-time").value.trim();
    frequency = document.querySelector("#frequency-input").value.trim();
    // Clear input values each time
    document.querySelector("#train-name").value = "";
    document.querySelector("#destination-input").value = "";
    document.querySelector("#train-time").value = "";
    document.querySelector("#frequency-input").value = "";
    //Current Time using Moment JS
    var currentTime = moment();
    console.log("current ime: " + moment(currentTime).format("hh:mm"));

    //First Train time input. Subtract 1 day to get exact minute if train start after current hours
    var firstTrain = moment(trainTime, "hh:mm").subtract(1, "days")

    //Get time difference
    var timeDifference = moment().diff(firstTrain, "minutes");

    // The remainder. Difference from Frequency til next train
    var timeRemainder = timeDifference % frequency;

    // Minute Until Next Train
    var minutesTillTrain = frequency - timeRemainder;
    
    // Get next Train time
    var nextTrain = moment().add(minutesTillTrain, "minutes").format("hh:mm A");

    //Store train data in firebase using push
    database.ref().push({
        train: train,
        destination: destination,
        trainTime: trainTime,
        frequency: frequency,
        minutesTillTrain: minutesTillTrain,
        nextTrain: nextTrain,
        currentTime: currentTime.format("hh:mm A")
    });
});
//Function to get a childSnapshot of the stored data usng Firebase
database.ref().on("child_added", function (childSnapshot) {
    //Store data into variable
    var trainName = childSnapshot.val().train;
    var destination = childSnapshot.val().destination;
    var frequency = childSnapshot.val().frequency;
    var nextTrain = childSnapshot.val().nextTrain
    var minutesTillTrain = childSnapshot.val().minutesTillTrain;
    //Create new row
    var newRow = document.createElement("tr");

    var trainData = {
        trainName: trainName,
        destination: destination,
        frequency: frequency,
        nextTrain: nextTrain,
        minutesTillTrain: minutesTillTrain,
    }
    //Loop through trainData object
    for (let value of Object.values(trainData)) {
        let td = document.createElement("td")
        td.innerText = value;

        //append data to html
        newRow.appendChild(td);
        document.querySelector("#train-table > tbody").appendChild(newRow);
    }
    // Handle the errors
}, function (errorObject) {
    console.log(`Errors handled: ${errorObject.code}`);

});


//moment("1800", "hmm").format("H:mm") >= moment("1123", "hmm").add(700, "m").format("H:mm")
