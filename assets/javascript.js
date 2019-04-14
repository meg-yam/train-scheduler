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

    var tFrequency = frequency;
    var firstTime = time;

    var firstConvert = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstConvert)

    var diffTime = moment().diff(moment(firstConvert), "minutes");
    console.log("Difference: " + diffTime);

    var tRemain = diffTime % tFrequency;
    console.log(tRemain);

    var tMinutes = tFrequency - tRemain;
    console.log(tMinutes);

    var next = moment().add(tMinutes, "minutes");
    console.log("Arrival: " + moment(next).format("HH:mm"));
    
    
    newTrain.push({
        Train: train,
        Destination: destination,
        Time: time,
        Frequency: frequency,
        Minutes: tMinutes,
        Next: moment(next).format("HH:mm"),
    })

    
});

newTrain.on("child_added", function(childSnap) {
   var newTable = childSnap.val();
   
    var tRow = $("<tr>");
    
    var trainT = $("<td>").text(newTable.Train);
    var destinationT = $("<td>").text(newTable.Destination);
    var nextT = $("<td>").text(newTable.Next);
    var minuteT = $("<td>").text(newTable.Minutes);
    var frequencyT = $("<td>").text(newTable.Frequency);

    tRow.append(trainT, destinationT, nextT, minuteT, frequencyT);
    $("#table").append(tRow);    
    
}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
}); 

// function calculate() {
//     var tFrequency = frequency;
//     var firstTime = time;

//     var firstConvert = moment(firstTime, "HH:mm").subtract(1, "years");

//     var currentTime = moment();
//     console.log("Current time: " + moment(currentTime).format("HH:mm"));

//     var diffTime = moment().diff(moment(firstConvert), "minutes");
//     console.log("Difference: " + diffTime);

//     var tRemain = diffTime % tFrequency;
//     console.log(tRemain);

//     var tMinutes = tFrequency - tRemain;
//     console.log(tMinutes);

//     var next = moment().add(tMinutes, "minutes");
//     console.log("Arrival: " + moment(next).format("HH:mm"));

// }

