define( ["three", "physijs"], function ( THREE, Physijs ) {

  var scene = new Physijs.Scene;
  scene.setGravity(new THREE.Vector3( 0, -98.1, 0 )); // set gravity

  // scene.fog = new THREE.Fog( 0x808080, 2000, 4000 );

  return scene;
} );
