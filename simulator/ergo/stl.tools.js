

var STLLoad = function (group, src, material, position, rotation, scale) {

  var loader = new THREE.STLLoader();
  loader.addEventListener( 'load', function ( event ) {

    var geometry = event.content;
    var mesh = new THREE.Mesh( geometry, material );

    mesh.position = position;
    mesh.rotation = rotation;
    mesh.scale = scale;

    mesh.castShadow = true;
    mesh.receiveShadow = true;

    group.add( mesh );

  } );
  loader.load( src );
}

// This must be done better, but the event loader above is blocking me
// If possible I do not want to use an event for the loader, or at least I want to add additional paramters
// STLPart should just be a subclass of THREE.Object3D(), thus avoiding the not that nice loadIn function (again due to the event based approach which I don't know how to bypass yet)
var STLPart = function(stlFile) {

  //you must register at least the
  this.src = stlFile; //link to the stl file

  // those are default param
  this.material = new THREE.MeshPhongMaterial( { ambient: 0x555555, color: 0xAAAAAA, specular: 0x111111, shininess: 200 } );

  this.position = new THREE.Vector3( 0, 0, 0 );
  this.rotation = new THREE.Vector3( 0, 0, 0 );
  this.scale = new THREE.Vector3( 1, 1, 1 );

};

STLPart.prototype.loadIn = function(group) {
  //load a mesh in a group
  STLLoad(group, this.src, this.material, this.position, this.rotation, this.scale);
}
