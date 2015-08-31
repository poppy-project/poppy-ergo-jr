define( ["three", "ergojr", "dat"], function( THREE, ERGOJR, dat ) {

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
  };

  var h = octopus.gui.addFolder("Motors angles");
  h.add( octopus.guiData, "M1", -180.0, 180.0, 0.025).name("M1");
  h.add( octopus.guiData, "M2", -180.0, 180.0, 0.025).name("M2");
  h.add( octopus.guiData, "M3", -180.0, 180.0, 0.025).name("M3");
  h.add( octopus.guiData, "M4", -180.0, 180.0, 0.025).name("M4");
  h.add( octopus.guiData, "M5", -180.0, 180.0, 0.025).name("M5");
  h.add( octopus.guiData, "M6", -180.0, 180.0, 0.025).name("M6");

  octopus.gui.addColor( octopus.guiData, "partColor").name("Color");

  octopus.update = function(ergo) {
    if ( ergo !== undefined ) {
      ergo.S1.rotation.z = octopus.guiData.M1 * Math.PI/180;
      ergo.S2.rotation.z = octopus.guiData.M2 * Math.PI/180;
      ergo.S3.rotation.z = octopus.guiData.M3 * Math.PI/180;
      ergo.S4.rotation.z = Math.PI/2.0 + octopus.guiData.M4 * Math.PI/180;
      ergo.S5.rotation.z = octopus.guiData.M5 * Math.PI/180;
      ergo.S6.rotation.z = octopus.guiData.M6 * Math.PI/180;
      // ergo.setColor(octopus.guiData.partColor);
    }
  }

  return octopus;
} );
