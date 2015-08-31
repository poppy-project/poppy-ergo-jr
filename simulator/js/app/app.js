define( ["container", "three", "camera", "controls", "light", "renderer", "scene", "stater", "helpers", "ergojr", "octopus"],
function ( container, THREE, camera, controls, light, renderer, scene, stater, _, ERGOJR, octopus) {
  var app = {
    ergo: undefined,
    init: function () {
      container.innerHTML = "";
      container.appendChild( renderer.domElement );
      container.appendChild( stater.domElement );

      THREE.DefaultLoadingManager.onProgress = function ( item, loaded, total ) {
        // console.log(item);
        if (loaded === total) {
          app.ergo = new ERGOJR.Robot();
          scene.add(app.ergo);
        }
      };
    },
    animate: function () {
      app.render();
      window.requestAnimationFrame(app.animate);
    },
    render: function () {
      controls.update();
      octopus.update(app.ergo);

      renderer.render( scene, camera );
      stater.update();
    }
  };
  return app;
} );
