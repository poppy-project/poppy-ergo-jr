define([ 'three' ], function(THREE) {

  var canvasRatio = window.innerWidth / window.innerHeight;
  var camera = new THREE.PerspectiveCamera(38, canvasRatio, 1, 10000);

  camera.position.set(-300, 300, -500);

  window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  }, false);

  return camera;
});
