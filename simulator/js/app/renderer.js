define([ 'three', 'container' ], function(THREE, container) {

  var canvasWidth = container.offsetWidth;
  var canvasHeight = container.offsetHeight;
  var renderer = new THREE.WebGLRenderer({ antialias: true });

  renderer.gammaInput = true;
  renderer.gammaOutput = true;
  renderer.setSize(canvasWidth, canvasHeight);
  renderer.setClearColor(0xAAAAAA, 1);

  window.addEventListener('resize', function() {
    renderer.setSize(container.offsetWidth, container.offsetHeight);
  }, false);

  return renderer;
});
