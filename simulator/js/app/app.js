define( ["threeCore", "camera", "controls", "light", "renderer", "scene", "stater"],
function ( THREE, camera, controls, light, renderer, scene, stater ) {
  var app = {
    init: function () {

      var geometry = new THREE.BoxGeometry( 200, 200, 200 );
      var material = new THREE.MeshPhongMaterial( { ambient: 0x555555, color: 0xAAAAAA, specular: 0xAAAAAA, shininess: 200, opacity: 0.9, transparent: true } );

      var mesh = new THREE.Mesh( geometry, material );
      scene.add( mesh );
      
    },
    animate: function () {
      app.render();
      window.requestAnimationFrame(app.animate);
    },
    render: function () {
      controls.update();
      stater.update();
      renderer.render( scene, camera );
    }
  };
  return app;
} );
