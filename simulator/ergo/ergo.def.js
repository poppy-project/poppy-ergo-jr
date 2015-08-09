

//materials
var XL320BodyMaterial = new THREE.MeshPhongMaterial( { ambient: 0x555555, color: 0xAAAAAA, specular: 0xAAAAAA, shininess: 200, opacity: 0.9, transparent: true } );

var XL320HornTopMaterial = new THREE.MeshPhongMaterial( { ambient: 0x555555, color: 0x222222, specular: 0xAAAAAA, shininess: 200} );

var XL320HornBottomMaterial = new THREE.MeshPhongMaterial( { ambient: 0x555555, color: 0xAAAAAA, specular: 0xAAAAAA, shininess: 200} );

var printedPartsColor = 0x1975FF;
var PrintedPartsMaterial = new THREE.MeshPhongMaterial( { ambient: 0x555555, color: printedPartsColor, specular: printedPartsColor, shininess: 20 } );

// Diameter of the body of Ollo Rivet
var OlloInDiameter = 4;
var OlloOutDiameter = 5;
var OlloLayerThickness = 3;
var OlloTipThickness = 0.8;
var OlloSpacing = 6;

// XL320 motor dimensions
var MotorWidth = 24.0; // this is 4 Ollospacing
var MotorHeight = 24.0; // this is 4 Ollospacing
var MotorLength = 36.0; // this is 6 Ollospacing
var MotorAxisOffset = 9.0;
var BackExtrudeDepth = MotorLength - 31.5;

// Horn parameter
var HornTopDiameter = 18.0;
var HornBottomDiameter = 20.0;


// Ergo
var UHornToHornLength = 25.0;
var ShiftOneSideLength = 30.0;
var USideToHornLength = OlloSpacing/2.0 + OlloLayerThickness;
var ToolDist = OlloSpacing/2.0 + 2.0 * OlloLayerThickness;
