define( ["dat"], function( dat ) {

  var gui = {};

  gui.gui = new dat.GUI();

  gui.guiData = {
    M1: 0.0,
    M2: 0.0,
    M3: 0.0,
    M4: 0.0,
    M5: 0.0,
    M6: 0.0,

    partColor: 0xFFFFFF,

    remoteStatus: false,
    remoteIP: "127.0.0.1",
    remotePORT: "8080",
    remoteFrequency: 20,

  };

  gui.controller = {};

  gui.controller.motors = gui.gui.addFolder("Motors angles");
  gui.controller.motors.add( gui.guiData, "M1", -180.0, 180.0, 0.025).name("M1");
  gui.controller.motors.add( gui.guiData, "M2", -180.0, 180.0, 0.025).name("M2");
  gui.controller.motors.add( gui.guiData, "M3", -180.0, 180.0, 0.025).name("M3");
  gui.controller.motors.add( gui.guiData, "M4", -180.0, 180.0, 0.025).name("M4");
  gui.controller.motors.add( gui.guiData, "M5", -180.0, 180.0, 0.025).name("M5");
  gui.controller.motors.add( gui.guiData, "M6", -180.0, 180.0, 0.025).name("M6");

  gui.controller.colorController = gui.gui.addColor( gui.guiData, "partColor").name("Color").listen();

  gui.controller.remote = gui.gui.addFolder("Remote Control");
  gui.controller.remote.add( gui.guiData, "remoteStatus").name("Enable");
  gui.controller.remoteIP = gui.controller.remote.add( gui.guiData, "remoteIP").name("IP");
  gui.controller.remotePORT = gui.controller.remote.add( gui.guiData, "remotePORT").name("PORT");
  gui.controller.remoteFrequency = gui.controller.remote.add( gui.guiData, "remoteFrequency", 1, 50, 1).name("Frequency");

  return gui;

});
