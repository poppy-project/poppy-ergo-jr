define( ["three"], function ( THREE ) {

  var canvasWidth = window.innerWidth;
  var canvasHeight = window.innerHeight;
  var canvasRatio = canvasWidth / canvasHeight;

  var camera = new THREE.PerspectiveCamera( 38, canvasRatio, 1, 10000 );
  camera.position.set(-200, 200, -500);

  window.addEventListener( 'resize', onWindowResize, false );
  function onWindowResize(){
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
  }

  return camera;
} );
