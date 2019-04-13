var db = firebase.database();
var newTrain = db.ref();


var train = "";
var destination = "";
var time = "";
var frequency = "";

$("#btn").on("click", function(event) {
    event.preventDefault();

    train = $("#train-form").val().trim();
    destination = $("#destination-form").val().trim();
    time = $("#time-form").val().trim();
    frequency = $("#frequency-form").val().trim();

    newTrain.push({
        Train: train,
        Destination: destination,
        Time: time,
        Frequency: frequency,
    })

});

newTrain.on("child_added", function(childSnap) {
   var newTable = childSnap.val();
   
    var tRow = $("<tr>");

    var trainT = $("<td>").text(newTable.Train);
    var destinationT = $("<td>").text(newTable.Destination);
    var timeT = $("<td>").text("");
    var minuteT = $("<td>").text("");
    var frequencyT = $("<td>").text(newTable.Frequency);

    tRow.append(trainT, destinationT, timeT, minuteT, frequencyT);
    $("#table").append(tRow);
});    
