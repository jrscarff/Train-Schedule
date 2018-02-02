var config = {
    apiKey: "AIzaSyDmB-tG2duDhOxylkNxxhx6HD70tfdTYJw",
    authDomain: "fir-time-644aa.firebaseapp.com",
    databaseURL: "https://fir-time-644aa.firebaseio.com",
    projectId: "fir-time-644aa",
    storageBucket: "fir-time-644aa.appspot.com",
    messagingSenderId: "668876946692"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

var current = moment().format("YYYY-MM-DD");
    var array = current.split("-");
    var years = parseInt(array[0]);
    var months = parseInt(array[1]);
    var days = parseInt(array[2]);
  var employeeName = "";
  var employeeRole = "";
  var employeeStart = "";
  var employeeWorked = 0;
  var employeeRate = 0;
  var employeeBilled = 0;

$("#submit-button").on("click", function() {

	event.preventDefault();

	employeeName = $("#name-input").val().trim();
	employeeRole = $("#role-input").val().trim();
	employeeStart = $("#date-input").val().trim();
	employeeRate = $("#rate-input").val().trim();

console.log(employeeName);
console.log(employeeRole);
console.log(employeeStart);
console.log(employeeRate);

	database.ref().push({
		name: employeeName,
		role: employeeRole,
		start: employeeStart,
		rate: employeeRate
	})

	$("#name-input").val("");
	$("#role-input").val("");
	$("#date-input").val("");
	$("#rate-input").val("");
});

var allEmployees = 

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
	newRow.append("<td>" + addRow.role + "</td>");
	newRow.append("<td>" + addRow.start + "</td>");
	newRow.append("<td>" + resultMonths + "</td>");
	newRow.append("<td>" + addRow.rate + "</td>");
	newRow.append("<td>" + owed + "</td>")
	// newRow.append(newData);
	$("#employee-row").append(newRow);
  });


// .orderByChild("dateAdded")