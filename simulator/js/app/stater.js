define( ["stats", "container"], function ( Stats, container ) {

  var stater = new Stats();
  stater.domElement.style.position = 'absolute';
  stater.domElement.style.top = '0px';
  stater.domElement.style.zIndex = 100;
  container.appendChild( stater.domElement );

  return stater;
} );
