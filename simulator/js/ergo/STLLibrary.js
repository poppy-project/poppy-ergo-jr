// this is a tool to load and manage stl files
var STLLibrary = {};

STLLibrary.geometry = []; // this stores the geometry associated with each stl file

STLLibrary.add = function(file, key, type) {
    // file specify the location of the stl file to be loaded
    // key specify the key to recall when creating a three.js object 3D instance using the stl geometry
    // type is either "binary" or "ascii", they are handled differently

    console.log('Loading ' + file + ' as ' + key + ' ...');

    var loader = new THREE.STLLoader();
    loader.load(file, function ( stlGeometry ) {
      switch(type) {
        case "binary":
            STLLibrary.geometry[key] = new THREE.Geometry().fromBufferGeometry( stlGeometry );;
            break;
        case "ascii":
            STLLibrary.geometry[key] = stlGeometry;
            break;
        default:
          console.log(type + " not handled");
      }
      console.log(key +  ' loaded');
    });
  }
