define( ["three"], function ( THREE ) {
  var scene = new THREE.Scene();
  scene.fog = new THREE.Fog( 0x808080, 2000, 4000 );
  return scene;
} );
