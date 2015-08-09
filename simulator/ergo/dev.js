"use strict"; // good practice - see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
////////////////////////////////////////////////////////////////////////////////
// Robot hand exercise: add a second grabber and have it respond
////////////////////////////////////////////////////////////////////////////////
/*global THREE, Coordinates, $, document, window, dat*/

var stats, camera, scene, renderer;
var cameraControls, effectController;

var clock = new THREE.Clock();

var gridX = true;
var gridY = false;
var gridZ = false;
var axes = true;
var ground = false;

var S0, S1, S2, S3, S4, S5, S6;
var partColor;

function addRobot() {

	// building the ergo
	S6 = new Segment6();
	S6.position.y = - 4.0*OlloSpacing - ShiftOneSideLength;

	S5 = new Segment5();
	S5.add(S6);
	S5.rotation.y = -Math.PI/2.0;
	S5.position.y = - 3.0*OlloSpacing - ShiftOneSideLength;

	S4 = new Segment4();
	S4.add(S5);
	S4.rotation.x = -Math.PI/2.0;
	S4.rotation.z = Math.PI/2.0;
	S4.position.y = - MotorLength + MotorAxisOffset - MotorHeight/2.0 - USideToHornLength ;

	S3 = new Segment3();
	S3.add(S4);
	S3.position.y = - MotorLength + MotorAxisOffset + OlloSpacing/2.0 - ShiftOneSideLength;

	S2 = new Segment2();
	S2.add(S3);
	S2.rotation.x = -Math.PI/2.0;
	S2.rotation.y = -Math.PI/2.0;
	S2.position.z = UHornToHornLength;

	S1 = new Segment1();
	S1.add(S2);
	S1.position.z = MotorHeight/2.0 + OlloLayerThickness;

	S0 = new BaseSegment();
	S0.add(S1);
	S0.rotation.x = -Math.PI/2.0;
	S0.position.y = MotorHeight/2.0 + OlloLayerThickness;

	scene.add(S0);
}

function setupScene() {
	scene = new THREE.Scene();
	scene.fog = new THREE.Fog( 0x808080, 2000, 4000 );

	// LIGHTS
	var ambientLight = new THREE.AmbientLight( 0x222222 );
	var light = new THREE.DirectionalLight( 0xFFFFFF, 1.0 );
	light.position.set( 200, 400, 500 );
	var light2 = new THREE.DirectionalLight( 0xFFFFFF, 1.0 );
	light2.position.set( -500, 250, -200 );
	scene.add(ambientLight);
	scene.add(light);
	scene.add(light2);
}

function drawHelpers() {
	if (ground) {
		Coordinates.drawGround({size:10000});
	}
	if (gridX) {
		Coordinates.drawGrid({size:10000,scale:0.01});
	}
	if (gridY) {
		Coordinates.drawGrid({size:10000,scale:0.01, orientation:"y"});
	}
	if (gridZ) {
		Coordinates.drawGrid({size:10000,scale:0.01, orientation:"z"});
	}
	if (axes) {
		Coordinates.drawAllAxes({axisLength:200,axisRadius:1,axisTess:50});
	}
}

function fillScene() {
	setupScene();
	drawHelpers();
	addRobot();
}

function init() {
	var canvasWidth = window.innerWidth;
	var canvasHeight = window.innerHeight;
	var canvasRatio = canvasWidth / canvasHeight;

	// RENDERER
	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.gammaInput = true;
	renderer.gammaOutput = true;
	renderer.setSize(canvasWidth, canvasHeight);
	renderer.setClearColor( 0xAAAAAA, 1.0 );

	// CAMERA
	camera = new THREE.PerspectiveCamera( 38, canvasRatio, 1, 10000 );
	camera.position.set(-200, 200, -500);

	// CONTROLS
	cameraControls = new THREE.OrbitControls( camera , renderer.domElement );
	cameraControls.damping = 0.2;

	//installer.failurerequests
	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.top = '0px';
	stats.domElement.style.zIndex = 100;
	container.appendChild( stats.domElement );
}

window.addEventListener( 'resize', onWindowResize, false );
function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

function addToDOM() {
	var container = document.getElementById('container');
	var canvas = container.getElementsByTagName('canvas');
	if (canvas.length>0) {
		container.removeChild(canvas[0]);
	}
	container.appendChild( renderer.domElement );
}

function animate() {
	render();
  window.requestAnimationFrame(animate);
}

function render() {

	var delta = clock.getDelta();
	cameraControls.update();

	if ( effectController.newGridX !== gridX || effectController.newGridY !== gridY || effectController.newGridZ !== gridZ || effectController.newGround !== ground || effectController.newAxes !== axes || effectController.partColor !== printedPartsColor)
	{
		gridX = effectController.newGridX;
		gridY = effectController.newGridY;
		gridZ = effectController.newGridZ;
		ground = effectController.newGround;
		axes = effectController.newAxes;

		printedPartsColor = effectController.partColor;
		PrintedPartsMaterial = new THREE.MeshPhongMaterial( { ambient: 0x555555, color: printedPartsColor, specular: printedPartsColor, shininess: 20 } );

		fillScene();
	}

	if (S0 !== undefined ) {
	  S1.rotation.z = effectController.M1 * Math.PI/180;
	  S2.rotation.z = effectController.M2 * Math.PI/180;
	  S3.rotation.z = effectController.M3 * Math.PI/180;
	  S4.rotation.z = Math.PI/2.0 + effectController.M4 * Math.PI/180;
	  S5.rotation.z = effectController.M5 * Math.PI/180;
	  S6.rotation.z = effectController.M6 * Math.PI/180;
	}

	renderer.render(scene, camera);
	stats.update();
}

function setupGui() {

	effectController = {

		newGridX: gridX,
		newGridY: gridY,
		newGridZ: gridZ,
		newGround: ground,
		newAxes: axes,

		partColor: printedPartsColor,

		M1: 0.0,
		M2: 0.0,
		M3: 0.0,
		M4: 0.0,
		M5: 0.0,
		M6: 0.0
	};

	var gui = new dat.GUI();

	var h = gui.addFolder("Grid display");
	h.add( effectController, "newGridX").name("Show XZ grid");
	h.add( effectController, "newGridY" ).name("Show YZ grid");
	h.add( effectController, "newGridZ" ).name("Show XY grid");
	h.add( effectController, "newGround" ).name("Show ground");
	h.add( effectController, "newAxes" ).name("Show axes");

	h = gui.addFolder("Motors angles");
	h.add( effectController, "M1", -180.0, 180.0, 0.025).name("M1");
  h.add( effectController, "M2", -180.0, 180.0, 0.025).name("M2");
  h.add( effectController, "M3", -180.0, 180.0, 0.025).name("M3");
  h.add( effectController, "M4", -180.0, 180.0, 0.025).name("M4");
  h.add( effectController, "M5", -180.0, 180.0, 0.025).name("M5");
  h.add( effectController, "M6", -180.0, 180.0, 0.025).name("M6");

	gui.addColor( effectController, "partColor").name("Color");

}



try {

	if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

	init();
	setupGui();
	setupScene();
	drawHelpers();
	addToDOM();
	render();

	THREE.DefaultLoadingManager.onProgress = function ( item, loaded, total ) {

		fillScene();
		render();
		if ( loaded === total) {
			animate();
		}
	};

} catch(e) {
	var errorReport = "Your program encountered an unrecoverable error, can not draw on canvas. Error was:<br/><br/>";
	$('#container').append(errorReport+e);
}
