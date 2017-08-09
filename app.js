 console.log("you are in the js script")

 var config = {
    apiKey: "AIzaSyDnjmO73QfWSXSekEAJNwDXGEatlQsPD7s",
    authDomain: "employee-8fb0c.firebaseapp.com",
    databaseURL: "https://employee-8fb0c.firebaseio.com",
    projectId: "employee-8fb0c",
    storageBucket: "employee-8fb0c.appspot.com",
    messagingSenderId: "957815455090"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  var name=" ";
  var role=" ";
  var startdate=" ";
  var rate=0;
  var monthsWorked=0;
  var bill=0;

  $("#submit").on("click", function () {
  	console.log("you are in the button");
  	name = $("#EmployeeName").val().trim();
  	role = $("#Role").val().trim();
  	startdate = $("#StartDate").val().trim();
  	rate = $("#MonthlyRate").val().trim();

  	var converted_startdate = moment(startdate, "YYYY-MM-DD").valueOf();
  	console.log("unixconversion" + converted_startdate)
  	var now = moment([]).valueOf()
  	console.log(now)
  	var monthsWorked = Math.floor((now-converted_startdate)/(1000*60*60*24*30))
  	console.log("first step ", monthsWorked);

  	bill= monthsWorked * rate;

  	 


  	 //monthsWorked=Math.floor(monthsWorked);
  	 

  	console.log("second step ", monthsWorked);

  	console.log("user input ", name, role, startdate, rate);

  	database.ref().push({
  		name: name,
  		role: role,
  		startdate: startdate,
  		rate: rate,
  		dateAdded: firebase.database.ServerValue.TIMESTAMP,
  		monthsWorked: monthsWorked,
  		bill: bill
  	});
});

database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot){
	 	var newRow = $("<tr>");

	 	var nameCOL = $("<td>");
	 	var roleCOL = $("<td>");
	 	var startCOL = $("<td>");
	 	var monthsCOL = $("<td>");
	 	var rateCOL = $("<td>");
	 	var billCOL = $("<td>");
	 	nameCOL.html(snapshot.val().name);
	 	roleCOL.html(snapshot.val().role);
	 	startCOL.html(snapshot.val().startdate);
	 	monthsCOL.html(snapshot.val().monthsWorked);
	 	rateCOL.html(snapshot.val().rate);
	 	billCOL.html(snapshot.val().bill);

	 	newRow.append(nameCOL);
	 	newRow.append(roleCOL);
	 	newRow.append(startCOL);
	 	newRow.append(monthsCOL);
	 	newRow.append(rateCOL);
	 	newRow.append(billCOL);

	 	$("#forAdditions").append(newRow);






}); 


