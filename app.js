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

var current = moment().format("YYYY-MM-DD");
    var array = current.split("-");
    var years = parseInt(array[0]);
    var months = parseInt(array[1]);
    var days = parseInt(array[2]);
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
	var startArray = startDate.split("-");
	var startYears = parseInt(startArray[0]);
	var startMonths = parseInt(startArray[1]);
	var startDays = parseInt(startArray[2]);

	var resultYears = years - startYears;
	var resultMonths = months - startMonths;
	var resultDays = days - startDays;

	var resultYears = resultYears * 12;
	var resultDays = resultDays / 30;
	var resultMonths = resultYears + resultMonths;
	var resultMonths = resultDays + resultMonths;
	//var resultMonths = round(resultMonths, 2);
	var owed = resultMonths * parseInt(addRow.rate);
	//var owed = round(owed, 2);


	newRow.append("<td>" + addRow.name + "</td>");
	newRow.append("<td>" + addRow.destination + "</td>");
	newRow.append("<td>" + addRow.frequency + "</td>");
	newRow.append("<td></td>");
	newRow.append("<td></td>");
	// newRow.append(newData);
	$("#employee-row").append(newRow);
  });


// .orderByChild("dateAdded")