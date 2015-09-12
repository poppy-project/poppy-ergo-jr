define( ["ergojr", "pypot", "gui"], function(ERGOJR, PYPOT, gui ) {

  var octopus = {};

  octopus.setErgo = function(ergo) { // I don't like this, but did not succeed in requiring "app" think more
    octopus.ergo = ergo;
  }

  // setting up callback on gui events
  gui.guiData.partColor = ERGOJR.printedPartsColor;
  gui.controller.colorController.onChange( function(value) {
    octopus.ergo.setColor(new THREE.Color(gui.guiData.partColor));
  });

  gui.controller.remoteIP.onChange( function(value) {
    PYPOT.IP = gui.guiData.remoteIP;
  });

  gui.controller.remotePORT.onChange( function(value) {
    PYPOT.PORT = gui.guiData.remotePORT;
  });

  gui.controller.remoteFrequency.onChange( function(value) {
    PYPOT.FREQ = gui.guiData.remoteFrequency;
    if (gui.guiData.remoteStatus) {
      PYPOT.stopPoll();
      PYPOT.startPoll();
    }
  });

  octopus.update = function() {
    if (gui.guiData.remoteStatus) {
      PYPOT.startPoll();
      octopus.ergo.S1.rotation.z = PYPOT.motors.M1 * Math.PI/180;
      octopus.ergo.S2.rotation.z = PYPOT.motors.M2 * Math.PI/180;
      octopus.ergo.S3.rotation.z = PYPOT.motors.M3 * Math.PI/180;
      octopus.ergo.S4.rotation.z = PYPOT.motors.M4 * Math.PI/180 + Math.PI/2.0;
      octopus.ergo.S5.rotation.z = PYPOT.motors.M5 * Math.PI/180;
      octopus.ergo.S6.rotation.z = PYPOT.motors.M6 * Math.PI/180;
    }
    else{
      PYPOT.stopPoll();
      if ( octopus.ergo !== undefined ) {
        octopus.ergo.S1.rotation.z = gui.guiData.M1 * Math.PI/180;
        octopus.ergo.S2.rotation.z = gui.guiData.M2 * Math.PI/180;
        octopus.ergo.S3.rotation.z = gui.guiData.M3 * Math.PI/180;
        octopus.ergo.S4.rotation.z = gui.guiData.M4 * Math.PI/180 + Math.PI/2.0;
        octopus.ergo.S5.rotation.z = gui.guiData.M5 * Math.PI/180;
        octopus.ergo.S6.rotation.z = gui.guiData.M6 * Math.PI/180;
      }
    }
  }


  return octopus;
} );
