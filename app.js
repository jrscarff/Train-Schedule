var config = {
    apiKey: "AIzaSyAOqBR5wxLRUx2qGIR1W1gneZhRAmMoaqY",
    authDomain: "train-schedule-65741.firebaseapp.com",
    databaseURL: "https://train-schedule-65741.firebaseio.com",
    projectId: "train-schedule-65741",
    storageBucket: "train-schedule-65741.appspot.com",
    messagingSenderId: "1008733668462"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

var current = moment().format("HH:mm");
    var array = current.split(":");
    var hours = parseInt(array[0]);
    var minutes = parseInt(array[1]);
  var trainName = "";
  var trainDestination = "";
  var trainStart = "";
  var trainFrequency = 0;

$("#submit-button").on("click", function() {

	event.preventDefault();

	trainName = $("#name-input").val().trim();
	trainDestination = $("#role-input").val().trim();
	trainStart = $("#date-input").val().trim();
	trainFrequency = $("#rate-input").val().trim();


	database.ref().push({
		name: trainName,
		destination: trainDestination,
		start: trainStart,
		frequency: trainFrequency
	})

	$("#name-input").val("");
	$("#role-input").val("");
	$("#date-input").val("");
	$("#rate-input").val("");
});


// for (var i = 0; i < )

database.ref().on("child_added", function(snapshot) {


	var newRow = $("<tr>");
	//var newData = $("<td>");
	var addRow = snapshot.val();

	var startDate = addRow.start;

	var startArray = startDate.split(":");
	var startHours = parseInt(startArray[0]);
	var startMinutes = parseInt(startArray[1]);

	var resultHours = startHours - hours;
	var resultMinutes = startMinutes - minutes;

	var nextTrain = startDate;


	var resultHours = resultHours * 60;
	var resultMinutes = resultHours + resultMinutes;

	function nextArrival() {
			if (resultMinutes < 0) {
				resultMinutes += parseInt(addRow.frequency);
				startMinutes += parseInt(addRow.frequency);
				nextArrival();
			}
			else if (resultMinutes > parseInt(addRow.frequency)) {
				resultMinutes -= parseInt(addRow.frequency);
				startMinutes -= parseInt(addRow.frequency);
				nextArrival();
			}
			else if (startMinutes >= 60) {
				startHours += 1;
				startMinutes -= 60;
				if (startHours > 24) {
					startHours -= 24;
				}
				nextArrival();
			}
			else if (startMinutes < 0) {
				startHours -= 1;
				startMinutes += 60;
				if (startHours < 0) {
					startHours += 24;
				}
				nextArrival();
			}
		}

	nextArrival()

	startMinutes = String(startMinutes);
	console.log(startMinutes.length);

	if (startMinutes.length === 1) {
		startMinutes = "0" + startMinutes;
	}

	if (startHours > 12) {
		startHours -= 12;
		nextTrain = String(startHours) + ":" + startMinutes + " PM";
	}
	else {
		nextTrain = String(startHours) + ":" + startMinutes + " AM";
		console.log(startMinutes);
	}
	


	newRow.append("<td>" + addRow.name + "</td>");
	newRow.append("<td>" + addRow.destination + "</td>");
	newRow.append("<td>" + addRow.frequency + "</td>");
	newRow.append("<td>" + nextTrain + "</td>");
	newRow.append("<td>" + resultMinutes + "</td>");
	// newRow.append(newData);
	$("#employee-row").append(newRow);
  });


// .orderByChild("dateAdded")