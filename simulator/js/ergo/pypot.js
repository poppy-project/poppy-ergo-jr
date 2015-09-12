
var PYPOT = {};

PYPOT.IP = "127.0.0.1";
PYPOT.PORT = "8080";
PYPOT.FREQ = 50;

PYPOT.motors = {};
PYPOT.requests = {};

PYPOT.motorIDs = ["M1", "M2", "M3", "M4", "M5", "M6"];
PYPOT.motorIDs.forEach(function(motorID) {

  PYPOT.motors[motorID] = 0;

  PYPOT.requests[motorID] = new XMLHttpRequest();

  PYPOT.requests[motorID].onreadystatechange = function () {
    if (PYPOT.requests[motorID].readyState == 4) {
       if(PYPOT.requests[motorID].status == 200){
         var data = JSON.parse(PYPOT.requests[motorID].responseText);
         PYPOT.motors[motorID] = data.present_position;
      } else {
        console.log("Something wrong while reading REST API for " + motorID);
      }
    }
  }
});

PYPOT.poller = undefined;

PYPOT.startPoll = function() {
  if (!PYPOT.poller){
    console.log("init polling");
    PYPOT.poller = setInterval(function(){ PYPOT.pollPos() } ,1000.0/PYPOT.FREQ);
  }
}

PYPOT.stopPoll = function() {
    if (PYPOT.poller){
      clearInterval(PYPOT.poller);
      PYPOT.poller = undefined;
    }
}

PYPOT.pollPos = function() {
  for (var i = 1; i<= 6; i++) {

    var url = "http://" + PYPOT.IP + ":" + PYPOT.PORT + "/motor/m" + i + "/register/present_position";

    PYPOT.requests[PYPOT.motorIDs[i-1]].open('GET', url);
    PYPOT.requests[PYPOT.motorIDs[i-1]].send();
  }
}
