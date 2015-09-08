define( ["container", "three", "camera", "controls", "light", "renderer", "scene", "stater", "helpers", "ergojr", "octopus", "physijs", "XL320", "STLLibrary", "OLLO"],
function ( container, THREE, camera, controls, light, renderer, scene, stater, _, ERGOJR, octopus, Physijs, XL320, STLLibrary, OLLO) {
  var app = {
    ergo: undefined,
    init: function () {
      container.innerHTML = "";
      container.appendChild( renderer.domElement );
      container.appendChild( stater[0].domElement );
      container.appendChild( stater[1].domElement );

      THREE.DefaultLoadingManager.onProgress = function ( item, loaded, total ) {
        // console.log(item);
        if (loaded === total) {
      //     app.ergo = new ERGOJR.Robot();
      //     scene.add(app.ergo);
      //     octopus.setErgo(app.ergo);

          // Ground
          ground = new Physijs.BoxMesh(
            new THREE.BoxGeometry(10000, 1, 10000),
            new THREE.MeshLambertMaterial({ color: 0x555555 }),
            0
          );
          ground.position.y = -1;
          scene.add( ground );

          var base = new Physijs.ConvexMesh(
                STLLibrary.geometry['base'],
                ERGOJR.PrintedPartsMaterial
            );

          var S0 = new Physijs.ConvexMesh(
                STLLibrary.geometry['XL320_body'],
                XL320.BodyMaterial
            );
          S0.rotation.x = -Math.PI/2.0;
          S0.position.y = XL320.MotorHeight/2.0 + OLLO.LayerThickness;

          S0.add( base );
          scene.add( S0 );


          var U_horn_to_horn = new Physijs.ConvexMesh(
                STLLibrary.geometry['U_horn_to_horn'],
                ERGOJR.PrintedPartsMaterial
            );
          U_horn_to_horn.rotation.x = -Math.PI/2;
          U_horn_to_horn.rotation.y = -Math.PI/2;
          U_horn_to_horn.position.z = ERGOJR.UHornToHornLength + OLLO.LayerThickness/2;

          var XL320_top_horn = new Physijs.ConvexMesh(
                STLLibrary.geometry['XL320_top_horn'],
                XL320.HornTopMaterial
            );
          XL320_top_horn.rotation.x = -Math.PI/2;
          XL320_top_horn.rotation.y = -Math.PI/2;
          XL320_top_horn.position.z = ERGOJR.UHornToHornLength + OLLO.LayerThickness/2;
          XL320_top_horn.position.x = - XL320.MotorWidth/2.0 - OLLO.LayerThickness/2;

          var XL320_bottom_horn = new Physijs.ConvexMesh(
                STLLibrary.geometry['XL320_bottom_horn'],
                XL320.HornBottomMaterial
            );
          XL320_bottom_horn.rotation.x = -Math.PI/2;
          XL320_bottom_horn.rotation.y = -Math.PI/2;
          XL320_bottom_horn.position.z = ERGOJR.UHornToHornLength + OLLO.LayerThickness/2;
          XL320_bottom_horn.position.x = XL320.MotorWidth/2.0 + OLLO.LayerThickness/2;


          var S1 = new Physijs.ConvexMesh(
                STLLibrary.geometry['XL320_top_horn'],
                XL320.HornTopMaterial
            );
          S1.rotation.x = -Math.PI/2.0;
          S1.position.y = XL320.MotorHeight + 1.5*OLLO.LayerThickness;

          S1.add(U_horn_to_horn);
          S1.add(XL320_top_horn);
          S1.add(XL320_bottom_horn);
          scene.add( S1 );


          //
          // var S2 = new Physijs.ConvexMesh(
          //       STLLibrary.geometry['XL320_body'],
          //       XL320.BodyMaterial
          //   );
          // S2.rotation.x = -Math.PI;
          // S2.rotation.y = -Math.PI/2;
          // S2.position.y = XL320.MotorHeight + ERGOJR.UHornToHornLength + 2*OLLO.LayerThickness;
          //
          // scene.add( S2 );

          for (var i = 0; i <= 10; i++){
            box = new Physijs.BoxMesh(
                new THREE.BoxGeometry( 10, 20, 20 ),
                new THREE.MeshLambertMaterial({ color: 0xFF8888 })
            );
            box.position.y = 100 + i*100;
            scene.add( box );
          }

          var constraint = new Physijs.HingeConstraint(
              S1, // First object to be constrained
              S0, // OPTIONAL second object - if omitted then physijs_mesh_1 will be constrained to the scene
              new THREE.Vector3( 0, 0, 0 ), // point in the scene to apply the constraint
              new THREE.Vector3( 0, 0, 1 ) // Axis along which the hinge lies - in this case it is the X axis
            );
          scene.addConstraint(constraint);
          // constraint.setLimits(
          //     -Math.PI/4, // minimum angle of motion, in radians
          //     Math.PI/4, // maximum angle of motion, in radians
          //     1.0, // applied as a factor to constraint error
          //     0.0// controls bounce at limit (0.0 == no bounce)
          // );
          constraint.enableAngularMotor( -5.0, 1000000.0 );
          // constraint.disableMotor();



          // var constraint2 = new Physijs.HingeConstraint(
          //     S2, // First object to be constrained
          //     S1, // OPTIONAL second object - if omitted then physijs_mesh_1 will be constrained to the scene
          //     new THREE.Vector3( 0, XL320.MotorHeight + ERGOJR.UHornToHornLength + 2*OLLO.LayerThickness, 0 ), // point in the scene to apply the constraint
          //     new THREE.Vector3( 0, 1, 0 ) // Axis along which the hinge lies - in this case it is the X axis
          //   );
          // scene.addConstraint(constraint2);
          // constraint.setLimits(
          //     -Math.PI/4, // minimum angle of motion, in radians
          //     Math.PI/4, // maximum angle of motion, in radians
          //     1.0, // applied as a factor to constraint error
          //     0.0// controls bounce at limit (0.0 == no bounce)
          // );
          // constraint2.enableAngularMotor( -5.0, 1000000.0 );
          // constraint.disableMotor();

          scene.addEventListener( 'update', function() {
            stater[1].update();
            scene.simulate(); // run physics
          });
          scene.simulate();
        }
      };


    },
    animate: function () {
      app.render();
      window.requestAnimationFrame(app.animate);
    },
    render: function () {
      stater[0].update();
      controls.update();
      // octopus.update();
      renderer.render( scene, camera );
    }
  };
  return app;
} );
