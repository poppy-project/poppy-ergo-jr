define( ["stats"], function ( Stats, container ) {

  var stater = new Stats();
  stater.domElement.style.position = 'absolute';
  stater.domElement.style.top = '0px';
  stater.domElement.style.zIndex = 100;
  
  return stater;
} );
