define( ["container", "three", "camera", "controls", "light", "renderer", "scene", "stater", "helpers", "ergojr", "octopus", "physijs", "XL320", "STLLibrary"],
function ( container, THREE, camera, controls, light, renderer, scene, stater, _, ERGOJR, octopus, Physijs, XL320, STLLibrary) {
  var app = {
    ergo: undefined,
    init: function () {
      container.innerHTML = "";
      container.appendChild( renderer.domElement );
      container.appendChild( stater.domElement );

      scene = new Physijs.Scene;

      THREE.DefaultLoadingManager.onProgress = function ( item, loaded, total ) {
        // console.log(item);
        if (loaded === total) {
      //     app.ergo = new ERGOJR.Robot();
      //     scene.add(app.ergo);
      //     octopus.setErgo(app.ergo);


          // Materials
          ground_material = Physijs.createMaterial(
            new THREE.MeshLambertMaterial({ color: "0x5555FF"}),
            .8, // high friction
            .4 // low restitution
          );

          // Ground
          ground = new Physijs.BoxMesh(
            new THREE.BoxGeometry(50, 1, 50),
            // new THREE.PlaneGeometry(50, 50),
            new THREE.MeshBasicMaterial({ color: 0x3333FF }),
            0
          );
          scene.add( ground );

          // box = new Physijs.BoxMesh(
          //       STLLibrary.geometry['XL320_box'],
          //       new THREE.MeshBasicMaterial({ color: 0x888888 })
          //   );
          box = new Physijs.BoxMesh(
                new THREE.BoxGeometry(10,10,10),
                new THREE.MeshBasicMaterial({ color: 0x888888 })
            );
          box.position.set( 0, 100, 0 );
          scene.add( box );

        }
      };

    },
    animate: function () {
      app.render();
      window.requestAnimationFrame(app.animate);
    },
    render: function () {

      stater.update();
      controls.update();
      // octopus.update();
      scene.simulate(); // run physics
      renderer.render( scene, camera );
    }
  };
  return app;
} );
