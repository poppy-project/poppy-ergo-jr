
// loading stl used
STLLibrary.add('js/ergo/stl/base.stl', 'base');
STLLibrary.add('js/ergo/stl/shift_one_side.stl', 'shift_one_side');
STLLibrary.add('js/ergo/stl/U_side_to_horn.stl', 'U_side_to_horn');
STLLibrary.add('js/ergo/stl/U_horn_to_horn.stl', 'U_horn_to_horn');
STLLibrary.add('js/ergo/stl/lamp_head.stl', 'lamp_head');


var ERGOJR = {};

// Defs
ERGOJR.UHornToHornLength = 25.0;
ERGOJR.ShiftOneSideLength = 30.0;
ERGOJR.USideToHornLength = OLLO.Spacing/2.0 + OLLO.LayerThickness;
ERGOJR.ToolDist = OLLO.Spacing/2.0 + 2.0 * OLLO.LayerThickness;

//materials
ERGOJR.printedPartsColor = 0x1975FF;
ERGOJR.PrintedPartsMaterial = new THREE.MeshLambertMaterial( { color: ERGOJR.printedPartsColor } );

// Base - Base + M1
ERGOJR.BaseSegment = function() {
  THREE.Object3D.call(this);

  this.base = new THREE.Mesh( STLLibrary.geometry['base'], ERGOJR.PrintedPartsMaterial);
  this.add(this.base);

  this.xl320 = new XL320.Object3D();
  this.add(this.xl320);
}
ERGOJR.BaseSegment.prototype = Object.create(THREE.Object3D.prototype);
ERGOJR.BaseSegment.prototype.constructor = ERGOJR.BaseSegment;

// Segment 1 - simply U_horn_to_horn
ERGOJR.Segment1 = function() {
  THREE.Object3D.call(this);

  this.part = new THREE.Mesh( STLLibrary.geometry['U_horn_to_horn'], ERGOJR.PrintedPartsMaterial);
  this.part.rotation.x = -Math.PI/2;
  this.part.rotation.y = -Math.PI/2;
  this.part.position.z = ERGOJR.UHornToHornLength;
  this.add(this.part);
};
ERGOJR.Segment1.prototype = Object.create(THREE.Object3D.prototype);
ERGOJR.Segment1.prototype.constructor = ERGOJR.Segment1;

// SideToSide
ERGOJR.SideToSide = function() {
  THREE.Object3D.call(this);

  this.left = new THREE.Mesh( STLLibrary.geometry['shift_one_side'], ERGOJR.PrintedPartsMaterial);
  this.left.position.z = - XL320.MotorWidth/2.0 - OLLO.LayerThickness/2.0;
  this.add(this.left);

  this.right = new THREE.Mesh( STLLibrary.geometry['shift_one_side'], ERGOJR.PrintedPartsMaterial);
  this.right.rotation.y = Math.PI;
  this.right.position.z = XL320.MotorWidth/2.0 + OLLO.LayerThickness/2.0;
  this.add(this.right);
};
ERGOJR.SideToSide.prototype = Object.create(THREE.Object3D.prototype);
ERGOJR.SideToSide.prototype.constructor = ERGOJR.SideToSide;

// Segment 2 - M2 + SideToSide
ERGOJR.Segment2 = function() {
  THREE.Object3D.call(this);

  this.xl320 = new XL320.Object3DTwoHorns();
  this.add(this.xl320);

  this.part = new ERGOJR.SideToSide();
  this.part.rotation.z = Math.PI;
  this.part.position.y = - XL320.MotorLength + XL320.MotorAxisOffset + OLLO.Spacing/2.0;
  this.add(this.part);

};
ERGOJR.Segment2.prototype = Object.create(THREE.Object3D.prototype);
ERGOJR.Segment2.prototype.constructor = ERGOJR.Segment2;

// Segment 3 - M3 + USideToHorn
ERGOJR.Segment3 = function() {
  THREE.Object3D.call(this);

  this.xl320 = new XL320.Object3DTwoHorns();
  this.add(this.xl320);

  this.part = new THREE.Mesh( STLLibrary.geometry['U_side_to_horn'], ERGOJR.PrintedPartsMaterial);
  this.part.rotation.x = Math.PI;
  this.part.rotation.y = Math.PI/2.0;
  this.part.position.y = -XL320.MotorLength + XL320.MotorAxisOffset+ OLLO.Spacing/2.0;
  this.add(this.part);
};
ERGOJR.Segment3.prototype = Object.create(THREE.Object3D.prototype);
ERGOJR.Segment3.prototype.constructor = ERGOJR.Segment3;

// Segment 4 - M4 + SideToSide
ERGOJR.Segment4 = function() {
  THREE.Object3D.call(this);

  this.xl320 = new XL320.Object3D();
  this.add(this.xl320);

  this.part = new ERGOJR.SideToSide();
  this.part.rotation.x = Math.PI;
  this.part.rotation.y = Math.PI/2.0;
  this.part.position.y = - 3.0 * OLLO.Spacing;
  this.add(this.part);
};
ERGOJR.Segment4.prototype = Object.create(THREE.Object3D.prototype);
ERGOJR.Segment4.prototype.constructor = ERGOJR.Segment4;

// Segment 5 - M5 + SideToSide
ERGOJR.Segment5 = function() {
  THREE.Object3D.call(this);

  this.xl320 = new XL320.Object3DTwoHorns();
  this.add(this.xl320);

  this.part = new ERGOJR.SideToSide();
  this.part.rotation.x = Math.PI;
  this.part.position.y = - 4.0 * OLLO.Spacing;
  this.add(this.part);
};
ERGOJR.Segment5.prototype = Object.create(THREE.Object3D.prototype);
ERGOJR.Segment5.prototype.constructor = ERGOJR.Segment5;

// Segment 6 - M6 + LampHead
ERGOJR.Segment6 = function() {
  THREE.Object3D.call(this);

  this.xl320 = new XL320.Object3DTwoHorns();
  this.add(this.xl320);

  this.part = new THREE.Mesh( STLLibrary.geometry['lamp_head'], ERGOJR.PrintedPartsMaterial);
  this.part.rotation.x = Math.PI;
  this.part.rotation.y = Math.PI/2.0;
  this.part.position.y = - 4.0 * OLLO.Spacing;
  this.add(this.part);
};

ERGOJR.Segment6.prototype = Object.create(THREE.Object3D.prototype);
ERGOJR.Segment6.prototype.constructor = ERGOJR.Segment6;

//
ERGOJR.Robot = function() {
  THREE.Object3D.call(this);

  this.S6 = new ERGOJR.Segment6();
  this.S6.position.y = - 4.0*OLLO.Spacing - ERGOJR.ShiftOneSideLength;

  this.S5 = new ERGOJR.Segment5();
  this.S5.rotation.y = -Math.PI/2.0;
  this.S5.position.y = - 3.0*OLLO.Spacing - ERGOJR.ShiftOneSideLength;

  this.S4 = new ERGOJR.Segment4();
  this.S4.rotation.x = -Math.PI/2.0;
  this.S4.rotation.z = Math.PI/2.0;
  this.S4.position.y = - XL320.MotorLength + XL320.MotorAxisOffset - XL320.MotorHeight/2.0 - ERGOJR.USideToHornLength ;

  this.S3 = new ERGOJR.Segment3();
  this.S3.position.y = - XL320.MotorLength + XL320.MotorAxisOffset + OLLO.Spacing/2.0 - ERGOJR.ShiftOneSideLength;

  this.S2 = new ERGOJR.Segment2();
  this.S2.rotation.x = -Math.PI/2.0;
  this.S2.rotation.y = -Math.PI/2.0;
  this.S2.position.z = ERGOJR.UHornToHornLength;

  this.S1 = new ERGOJR.Segment1();
  this.S1.position.z = XL320.MotorHeight/2.0 + OLLO.LayerThickness;

  this.S0 = new ERGOJR.BaseSegment();
  this.S0.rotation.x = -Math.PI/2.0;
  this.S0.position.y = XL320.MotorHeight/2.0 + OLLO.LayerThickness;

  // builiding the robot
  this.S5.add(this.S6);
  this.S4.add(this.S5);
  this.S3.add(this.S4);
  this.S2.add(this.S3);
  this.S1.add(this.S2);
  this.S0.add(this.S1);
  this.add(this.S0);
}
ERGOJR.Robot.prototype = Object.create(THREE.Object3D.prototype);
ERGOJR.Robot.prototype.constructor = ERGOJR.Robot;

ERGOJR.Robot.prototype.setColor = function(color) {
  ERGOJR.PrintedPartsMaterial.color.set(color);
}
