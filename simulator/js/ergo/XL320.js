
// loading stl used
STLLibrary.add('js/ergo/stl/binary/XL320_body.stl', 'XL320_body', 'binary');
STLLibrary.add('js/ergo/stl/binary/XL320_top_horn.stl', 'XL320_top_horn', 'binary');
STLLibrary.add('js/ergo/stl/binary/XL320_bottom_horn.stl', 'XL320_bottom_horn', 'binary');

var XL320 = {};

// XL320 motor dimensions
XL320.MotorWidth = 24.0; // this is 4 Ollospacing
XL320.MotorHeight = 24.0; // this is 4 Ollospacing
XL320.MotorLength = 36.0; // this is 6 Ollospacing
XL320.MotorAxisOffset = 9.0;
XL320.BackExtrudeDepth = XL320.MotorLength - 31.5;

// Horn parameter
XL320.HornTopDiameter = 18.0;
XL320.HornBottomDiameter = 20.0;

// Materials
XL320.BodyMaterial = new THREE.MeshLambertMaterial( { color: 0xAAAAAA } );
XL320.HornTopMaterial = new THREE.MeshLambertMaterial( { color: 0x222222} );
XL320.HornBottomMaterial = new THREE.MeshLambertMaterial( { color: 0xAAAAAA } );

//
XL320.BodyMass = 10000;
XL320.HornTopMass = 1000;
XL320.HornBottomMass = 1000;


//
XL320.Object3D = function() {
  THREE.Object3D.call(this);

  var body = new THREE.Mesh( STLLibrary.geometry['XL320_body'], XL320.BodyMaterial);
  this.add(body);

  var hornTop = new THREE.Mesh( STLLibrary.geometry['XL320_top_horn'], XL320.HornTopMaterial);
  hornTop.position.z = XL320.MotorHeight/2.0 + OLLO.LayerThickness/2.0;
  this.add(hornTop);
}
XL320.Object3D.prototype = Object.create(THREE.Object3D.prototype);
XL320.Object3D.prototype.constructor = XL320.Object3D;

//
XL320.Object3DTwoHorns = function () {
  XL320.Object3D.call(this);

  var hornBottom = new THREE.Mesh( STLLibrary.geometry['XL320_bottom_horn'], XL320.HornBottomMaterial);
  hornBottom.position.z = - XL320.MotorHeight/2.0 - OLLO.LayerThickness/2.0;
  this.add(hornBottom);
}

XL320.Object3DTwoHorns.prototype = Object.create(XL320.Object3D.prototype);
XL320.Object3DTwoHorns.prototype.constructor = XL320.Object3DTwoHorns;

//
XL320.Physijs = function() {
  Object.call(this);

  this.body = new Physijs.ConcaveMesh(
        STLLibrary.geometry['XL320_body'],
        XL320.BodyMaterial,
        XL320.BodyMass
    );

  this.hornTop = new Physijs.ConcaveMesh(
        STLLibrary.geometry['XL320_top_horn'],
        XL320.HornTopMaterial,
        XL320.HornTopMass
    );
  this.hornTop.position.z = XL320.MotorHeight/2.0 + OLLO.LayerThickness/2.0 + 2;

  // this.constraint = new Physijs.HingeConstraint(
  //     this.body, // First object to be constrained
  //     null, // OPTIONAL second object - if omitted then physijs_mesh_1 will be constrained to the scene
  //     new THREE.Vector3( 0, 0, 0 ), // point in the scene to apply the constraint
  //     new THREE.Vector3( 0, 0, 1 ) // Axis along which the hinge lies - in this case it is the X axis
  //   );

}
XL320.Physijs.prototype = Object.create(Object.prototype);
XL320.Physijs.prototype.constructor = XL320.Physijs;

XL320.Physijs.prototype.addToScene = function(scene){
  this.body.position.y = 50;
  scene.add(this.body);

  this.hornTop.position.y = 50;
  scene.add(this.hornTop);

  // scene.addConstraint(this.constraint);
};
