//
var XL320Body = function() {

  STLPart.call(this, 'stl/XL320_box.stl');
  this.material = XL320BodyMaterial;

};

XL320Body.prototype = Object.create(STLPart.prototype);
XL320Body.prototype.constructor = XL320Body;

//
var XL320HornTop = function() {

  STLPart.call(this, 'stl/XL320_top_horn.stl');
  this.material = XL320HornTopMaterial;

};

XL320HornTop.prototype = Object.create(STLPart.prototype);
XL320HornTop.prototype.constructor = XL320HornTop;

//
var XL320HornBottom = function() {

  STLPart.call(this, 'stl/XL320_bottom_horn.stl');
  this.material = XL320HornBottomMaterial;

};

XL320HornBottom.prototype = Object.create(STLPart.prototype);
XL320HornBottom.prototype.constructor = XL320HornBottom;

//
var Base = function() {

  STLPart.call(this, 'stl/base.stl');
  this.material = PrintedPartsMaterial;

};

Base.prototype = Object.create(STLPart.prototype);
Base.prototype.constructor = Base;

//
var UHornToHorn = function() {

  STLPart.call(this, 'stl/U_horn_to_horn.stl');
  this.material = PrintedPartsMaterial;

};

UHornToHorn.prototype = Object.create(STLPart.prototype);
UHornToHorn.prototype.constructor = UHornToHorn;

//
var USideToHorn = function() {

  STLPart.call(this, 'stl/U_side_to_horn.stl');
  this.material = PrintedPartsMaterial;

};

USideToHorn.prototype = Object.create(STLPart.prototype);
USideToHorn.prototype.constructor = USideToHorn;

//
var ShiftOneSide = function() {

  STLPart.call(this, 'stl/shift_one_side.stl');
  this.material = PrintedPartsMaterial;

};

ShiftOneSide.prototype = Object.create(STLPart.prototype);
ShiftOneSide.prototype.constructor = ShiftOneSide;

//
var LampHead = function() {

  STLPart.call(this, 'stl/lamp_head.stl');
  this.material = PrintedPartsMaterial;

};

LampHead.prototype = Object.create(STLPart.prototype);
LampHead.prototype.constructor = LampHead;
