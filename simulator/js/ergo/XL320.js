
// loading stl used
STLLibrary.add('js/ergo/stl/XL320_box.stl', 'XL320_box');
STLLibrary.add('js/ergo/stl/XL320_top_horn.stl', 'XL320_top_horn');
STLLibrary.add('js/ergo/stl/XL320_bottom_horn.stl', 'XL320_bottom_horn');

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
XL320.Object3D = function() {
  THREE.Object3D.call(this);

  var body = new THREE.Mesh( STLLibrary.geometry['XL320_box'], XL320.BodyMaterial);
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
