define( ["three"], function ( THREE, container ) {

  var canvasWidth = window.innerWidth;
  var canvasHeight = window.innerHeight;

  var renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.gammaInput = true;
  renderer.gammaOutput = true;
  renderer.setSize(canvasWidth, canvasHeight);
  renderer.setClearColor( 0xAAAAAA, 1.0 );

  window.addEventListener( 'resize', onWindowResize, false );
  function onWindowResize(){
      renderer.setSize( window.innerWidth, window.innerHeight );
  }


  return renderer;
} );
