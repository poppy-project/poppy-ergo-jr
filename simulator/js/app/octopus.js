define( ["ergojr", "dat"], function(ERGOJR, dat ) {

  var octopus = {};

  octopus.gui = new dat.GUI();
  octopus.guiData = {
    M1: 0.0,
    M2: 0.0,
    M3: 0.0,
    M4: 0.0,
    M5: 0.0,
    M6: 0.0,

    partColor: ERGOJR.printedPartsColor,

    remoteStatus: false,
    remoteIP: "128.0.0.1",
    remotePORT: "8080",

  };

  var h = octopus.gui.addFolder("Motors angles");
  h.add( octopus.guiData, "M1", -180.0, 180.0, 0.025).name("M1").listen();
  h.add( octopus.guiData, "M2", -180.0, 180.0, 0.025).name("M2").listen();
  h.add( octopus.guiData, "M3", -180.0, 180.0, 0.025).name("M3").listen();
  h.add( octopus.guiData, "M4", -180.0, 180.0, 0.025).name("M4").listen();
  h.add( octopus.guiData, "M5", -180.0, 180.0, 0.025).name("M5").listen();
  h.add( octopus.guiData, "M6", -180.0, 180.0, 0.025).name("M6").listen();

  var colorController = octopus.gui.addColor( octopus.guiData, "partColor").name("Color").listen();
  colorController.onChange( function(value) {
    octopus.ergo.setColor(octopus.guiData.partColor);
  });

  var h = octopus.gui.addFolder("Remote Control");
  h.add( octopus.guiData, "remoteStatus").name("Enable");
  h.add( octopus.guiData, "remoteIP").name("IP");
  h.add( octopus.guiData, "remotePORT").name("PORT");

  octopus.setErgo = function(ergo) { // I don't like this, but did not succeed in requiring "app" think more
    octopus.ergo = ergo;
  }

  octopus.update = function() {
    if (octopus.guiData.remoteStatus) {
      octopus.pollPos();
    }
    if ( octopus.ergo !== undefined ) {
      octopus.ergo.S1.rotation.z = octopus.guiData.M1 * Math.PI/180;
      octopus.ergo.S2.rotation.z = octopus.guiData.M2 * Math.PI/180;
      octopus.ergo.S3.rotation.z = octopus.guiData.M3 * Math.PI/180;
      octopus.ergo.S4.rotation.z = Math.PI/2.0 + octopus.guiData.M4 * Math.PI/180;
      octopus.ergo.S5.rotation.z = octopus.guiData.M5 * Math.PI/180;
      octopus.ergo.S6.rotation.z = octopus.guiData.M6 * Math.PI/180;
    }
  }

  octopus.pollPos = function() {
    // obviously really ugy for now
    for (var i = 1; i <= 6; i++){
      var httpRequest = new XMLHttpRequest()

      httpRequest.onreadystatechange = function (data) {
        octopus.guiData["M"+i] = 0; //data.present_position;
      }

      var url = "http://" + octopus.guiData.remoteIP + ":" + octopus.guiData.remotePORT + "/motor/m" + i + "/register/present_position";
      console.log(url);
      httpRequest.open('GET', url)
      httpRequest.send()
    }
  }

  return octopus;
} );
