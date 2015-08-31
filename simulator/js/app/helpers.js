define( ["three", "scene", "coordinates"], function ( THREE, scene, Coordinates) {

  // Coordinates.drawGround({size:10000}, scene);
  Coordinates.drawGrid({size:10000,scale:0.01}, scene);
  Coordinates.drawAllAxes({axisLength:200,axisRadius:1,axisTess:50}, scene);

} );
