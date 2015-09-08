define( ["stats"], function ( Stats, container ) {

  var stater = [];

  stater[0] = new Stats();
  stater[0].domElement.style.position = 'absolute';
  stater[0].domElement.style.top = '0px';
  stater[0].domElement.style.zIndex = 100;

  stater[1] = new Stats();
  stater[1].domElement.style.position = 'absolute';
  stater[1].domElement.style.top = '50px';
  stater[1].domElement.style.zIndex = 100;

  return stater;
} );
