define( ["three", "scene"], function ( THREE, scene ) {
  var light = [];

  light.push(new THREE.AmbientLight( 0x222222 ));
  light.push(new THREE.DirectionalLight( 0xFFFFFF, 1.0 ));
  light[1].position.set( 200, 400, 500 );
  light.push(new THREE.DirectionalLight( 0xFFFFFF, 1.0 ));
  light[2].position.set( -500, 250, -200 );

  for ( var l in light ) {
    scene.add(light[l]);
  }

  return light;
} );
