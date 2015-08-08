
// Super class, this is simply THREE.Object3D but keeping this dummy super class for experimentation
var Assembly = function() {

  THREE.Object3D.call(this);

}

Assembly.prototype = Object.create(THREE.Object3D.prototype);
Assembly.prototype.constructor = XL320;


// XL320 assembled
var XL320 = function() {

  Assembly.call(this);

  var body = new XL320Body();
  body.loadIn(this);

  var hornTop = new XL320HornTop();
  hornTop.position.z = MotorHeight/2.0 + OlloLayerThickness/2.0;
  hornTop.loadIn(this);

};

XL320.prototype = Object.create(Assembly.prototype);
XL320.prototype.constructor = XL320;

//
var XL320TwoHorns = function () {

  XL320.call(this);

  var hornBottom = new XL320HornBottom();
  hornBottom.position.z = - MotorHeight/2.0 - OlloLayerThickness/2.0;
  hornBottom.loadIn(this);

}

XL320TwoHorns.prototype = Object.create(XL320.prototype);
XL320TwoHorns.prototype.constructor = XL320TwoHorns;

// Base - Base + M1
var BaseSegment = function() {

  Assembly.call(this);

  var base = new Base();
  base.loadIn(this);

  var xl320 = new XL320();
  this.add(xl320);

};

BaseSegment.prototype = Object.create(Assembly.prototype);
BaseSegment.prototype.constructor = BaseSegment;

// Segment 1 - simply U_horn_to_horn
var Segment1 = function() {

  Assembly.call(this);

  var part = new UHornToHorn();
  part.rotation.x = -Math.PI/2;
  part.rotation.y = -Math.PI/2;
  part.position.z = UHornToHornLength;
  part.loadIn(this);
};

Segment1.prototype = Object.create(Assembly.prototype);
Segment1.prototype.constructor = Segment1;

// SideToSide
var SideToSide = function() {

  Assembly.call(this);

  var left = new ShiftOneSide();
  left.position.z = - MotorWidth/2.0 - OlloLayerThickness/2.0;
  left.loadIn(this);

  var right = new ShiftOneSide();
  right.rotation.y = Math.PI;
  right.position.z = MotorWidth/2.0 + OlloLayerThickness/2.0;
  right.loadIn(this);
};

SideToSide.prototype = Object.create(Assembly.prototype);
SideToSide.prototype.constructor = SideToSide;


// Segment 2 - M2 + SideToSide
var Segment2 = function() {

  Assembly.call(this);

  var xl320 = new XL320TwoHorns();
  this.add(xl320);

  var part = new SideToSide();
  part.rotation.z = Math.PI;
  part.position.y = - MotorLength + MotorAxisOffset + OlloSpacing/2.0;
  this.add(part);

};

Segment2.prototype = Object.create(Assembly.prototype);
Segment2.prototype.constructor = Segment2;

// Segment 3 - M3 + USideToHorn
var Segment3 = function() {

  Assembly.call(this);

  var xl320 = new XL320TwoHorns();
  this.add(xl320);

  var part = new USideToHorn();
  part.rotation.x = Math.PI;
  part.rotation.y = Math.PI/2.0;
  part.position.y = -MotorLength + MotorAxisOffset+ OlloSpacing/2.0;
  part.loadIn(this);
};

Segment3.prototype = Object.create(Assembly.prototype);
Segment3.prototype.constructor = Segment3;

// Segment 4 - M4 + SideToSide
var Segment4 = function() {

  Assembly.call(this);

  var xl320 = new XL320();
  this.add(xl320);

  var part = new SideToSide();
  part.rotation.x = Math.PI;
  part.rotation.y = Math.PI/2.0;
  part.position.y = - 3.0 * OlloSpacing;
  this.add(part);
};

Segment4.prototype = Object.create(Assembly.prototype);
Segment4.prototype.constructor = Segment4;

// Segment 5 - M5 + SideToSide
var Segment5 = function() {

  Assembly.call(this);

  var xl320 = new XL320TwoHorns();
  this.add(xl320);

  var part = new SideToSide();
  part.rotation.x = Math.PI;
  part.position.y = - 4.0 * OlloSpacing;
  this.add(part);
};

Segment5.prototype = Object.create(Assembly.prototype);
Segment5.prototype.constructor = Segment5;

// Segment 6 - M6 + LampHead
var Segment6 = function() {

  Assembly.call(this);

  var xl320 = new XL320TwoHorns();
  this.add(xl320);

  var part = new LampHead();
  part.rotation.x = Math.PI;
  part.rotation.y = Math.PI/2.0;
  part.position.y = - 4.0 * OlloSpacing;
  part.loadIn(this);
};

Segment6.prototype = Object.create(Assembly.prototype);
Segment6.prototype.constructor = Segment6;
