define([ 'dat' ], function(dat) {

  var gui = {};

  gui.gui = new dat.GUI();

  gui.guiData = {
    m1: 0,
    m2: 0,
    m3: 0,
    m4: 0,
    m5: 0,
    m6: 0,

    partColor: 0xFFFFFF,

    remoteStatus: false,
    remoteIP: '127.0.0.1',
    remotePORT: '8080',
    remoteFrequency: 20,
  };

  gui.controller = {};

  gui.controller.motors = gui.gui.addFolder('Motors angles');
  gui.controller.motors.add(gui.guiData, 'm1', -180, 180, 0.025).name('m1').listen();
  gui.controller.motors.add(gui.guiData, 'm2', -180, 180, 0.025).name('m2').listen();
  gui.controller.motors.add(gui.guiData, 'm3', -180, 180, 0.025).name('m3').listen();
  gui.controller.motors.add(gui.guiData, 'm4', -180, 180, 0.025).name('m4').listen();
  gui.controller.motors.add(gui.guiData, 'm5', -180, 180, 0.025).name('m5').listen();
  gui.controller.motors.add(gui.guiData, 'm6', -180, 180, 0.025).name('m6').listen();

  gui.controller.colorController = gui.gui.addColor(gui.guiData, 'partColor').name('Color').listen();

  gui.controller.remote = gui.gui.addFolder('Remote Control');
  gui.controller.remote.add(gui.guiData, 'remoteStatus').name('Enable');
  gui.controller.remoteIP = gui.controller.remote.add(gui.guiData, 'remoteIP').name('IP');
  gui.controller.remotePORT = gui.controller.remote.add(gui.guiData, 'remotePORT').name('PORT');
  gui.controller.remoteFrequency = gui.controller.remote.add(gui.guiData, 'remoteFrequency', 1, 35, 1).name('Frequency');

  return gui;
});
