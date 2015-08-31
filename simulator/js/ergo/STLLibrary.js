// this is a tool to load and manage stl files
var STLLibrary = {};

STLLibrary.geometry = []; // this stores the geometry associated with each stl file

STLLibrary.add = function(file, key) {
    // stlInfo must have two fields
    // stlInfo.file specify the location of the stl file to be loaded
    // stlInfo.key specify the key to recall when creating a three.js object 3D instance using the stl geometry

    console.log('Loading ' + file + ' as ' + key + ' ...');

    var loader = new THREE.STLLoader();
    loader.load(file, function ( stlGeometry ) {
      STLLibrary.geometry[key] = stlGeometry;
      console.log(key +  ' loaded');
    });
  }
