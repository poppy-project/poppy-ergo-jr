define([ 'ergojr', 'pypot', 'gui' ], function(ERGOJR, PYPOT, gui) {

  var octopus = {};
  var PI = Math.PI;

  // @TODO I don't like this, but did not succeed in requiring 'app'
  //  think more
  octopus.setErgo = function(ergo) {
    octopus.ergo = ergo;
  }

  // setting up callback on gui events
  gui.guiData.partColor = ERGOJR.printedPartsColor;

  gui.controller.colorController.onChange(function(value) {
    octopus.ergo.setColor(new THREE.Color(gui.guiData.partColor));
  });

  gui.controller.remoteIP.onChange(function(value) {
    PYPOT.IP = gui.guiData.remoteIP;
  });

  gui.controller.remotePORT.onChange(function(value) {
    PYPOT.PORT = gui.guiData.remotePORT;
  });

  gui.controller.remoteFrequency.onChange(function(value) {
    PYPOT.FREQ = gui.guiData.remoteFrequency;
    if (gui.guiData.remoteStatus) {
      PYPOT.stopPoll();
      PYPOT.startPoll();
    }
  });

  octopus.update = function() {
    if (gui.guiData.remoteStatus) {
      PYPOT.startPoll();
      octopus.ergo.S1.rotation.z = PYPOT.motors.m1 * PI / 180;
      octopus.ergo.S2.rotation.z = PYPOT.motors.m2 * PI / 180;
      octopus.ergo.S3.rotation.z = PYPOT.motors.m3 * PI / 180;
      octopus.ergo.S4.rotation.z = PYPOT.motors.m4 * PI / 180 + PI / 2;
      octopus.ergo.S5.rotation.z = PYPOT.motors.m5 * PI / 180;
      octopus.ergo.S6.rotation.z = PYPOT.motors.m6 * PI / 180;
    } else {
      PYPOT.stopPoll();
      if ( octopus.ergo !== undefined ) {
        octopus.ergo.S1.rotation.z = gui.guiData.m1 * PI / 180;
        octopus.ergo.S2.rotation.z = gui.guiData.m2 * PI / 180;
        octopus.ergo.S3.rotation.z = gui.guiData.m3 * PI / 180;
        octopus.ergo.S4.rotation.z = gui.guiData.m4 * PI / 180 + PI / 2;
        octopus.ergo.S5.rotation.z = gui.guiData.m5 * PI / 180;
        octopus.ergo.S6.rotation.z = gui.guiData.m6 * PI / 180;
      }
    }
  }

  return octopus;
});
