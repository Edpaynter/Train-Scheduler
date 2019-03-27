


var config = {
    apiKey: "AIzaSyDMCfPqegqqjx6XHQ2iT9qSuK07K5DyR2E",
    authDomain: "train-schedule-fed68.firebaseapp.com",
    databaseURL: "https://train-schedule-fed68.firebaseio.com",
    projectId: "train-schedule-fed68",
    storageBucket: "train-schedule-fed68.appspot.com",
    messagingSenderId: "129361728383"
  };
  firebase.initializeApp(config);

  database = firebase.database()

  $("#submit-train").on("click", function(event){
    event.preventDefault();

    let newTrain = $("#form-train-name").val().trim()
    let newDest = $("#form-destination").val().trim()
    let newTime = moment($("#form-train-time").val().trim(), "HH:mm").format("HH:mm")
    let newFreq = $("#form-frequency").val().trim()
    let minAway = moment(newTime, "HH:mm").add(moment(newFreq, "mm")).format("mm")
    //
    
    console.log(minAway,"minAway")

    newEntry = {
        train : newTrain,
        destination : newDest,
        time : newTime,
        frequency : newFreq
    }
    if (newTrain && newDest && newTime && newFreq !== ''){
        database.ref().push(newEntry)  
    }else{
       
        alert("You must fill in all fields")
    }
    

    $("#form-train-name").val("");
    $("#form-destination").val("");
    $("#form-train-time").val("");
    $("#form-frequency").val("");   

  })

  database.ref().on("child_added", function(snapshot){
      let trainName = snapshot.val().train
      let trainDest = snapshot.val().destination
      let trainTime = snapshot.val().time
      let trainFreq = snapshot.val().frequency


    
      let addRow = $("<tr>").append(
          $("<td>").text(trainName),
          $("<td>").text(trainDest),
          $("<td>").text(trainTime),
          $("<td>").text(trainFreq),
      )
    
      $("tbody").append(addRow)



    });
