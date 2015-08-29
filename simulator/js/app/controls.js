define( ["three", "camera", "renderer"], function( THREE, camera, renderer ) {

  var controls = new THREE.OrbitControls( camera , renderer.domElement );
  controls.damping = 0.2;

  return controls;
} );
