var stlFolder = 'stl';
var stlFiles = [
  'U_horn_to_horn.stl',
  'XL320_box.stl',
  'lamp_head.stl',
  'U_side_to_horn.stl',
  'XL320_top_horn.stl',
  'shift_one_side.stl',
  'XL320_bottom_horn.stl',
  'base.stl'
];
var stlGeometry = [];

var loadAllSTL = function () {

  console.log('Loading STL files');
  var loader = new THREE.STLLoader();

  stlFiles.forEach( function (file, i ) {

    var src = stlFolder + '/' + file
    loader.load(src, function ( geometry ) {
      stlGeometry[i] = geometry;
      console.log(src +  ' loaded');
    });

  });
}

var STLLoad = function (group, src, material, position, rotation, scale) {

  var loader = new THREE.STLLoader();
  loader.load(src, function ( geometry ) {

    var mesh = new THREE.Mesh( geometry, material );

    mesh.position = position;
    mesh.rotation = rotation;
    mesh.scale = scale;

    mesh.castShadow = true;
    mesh.receiveShadow = true;

    group.add( mesh );

  } );
};

// This must be done better, but the event loader above is blocking me
// If possible I do not want to use an event for the loader, or at least I want to add additional paramters
// STLPart should just be a subclass of THREE.Object3D(), thus avoiding the not that nice loadIn function (again due to the event based approach which I don't know how to bypass yet)

// Super class, this is simply THREE.Object3D but keeping this dummy super class for experimentation
var STLPart = function(stlFile, material) {

  THREE.Object3D.call(this);

  var i = stlFiles.indexOf(stlFile);
  if ( i !== -1) {

    var mesh = new THREE.Mesh( stlGeometry[i], material )

    mesh.castShadow = true;
		mesh.receiveShadow = true;

    this.add(mesh);

  } else {
    console.log(stlFile + ' not in the stl library');
    return undefined;
  }
}

STLPart.prototype = Object.create(THREE.Object3D.prototype);
STLPart.prototype.constructor = STLPart;



loadAllSTL();
