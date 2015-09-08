// Configure Require.js
var require = {
  // Default load path for js files
  baseUrl: 'js/app',
  shim: {
    // -- ergo
    'STLLibrary': {deps: ['threeCore'], exports: 'STLLibrary'},
    'OLLO': {exports: 'OLLO'},
    'XL320': {deps: ['physiCore', 'STLLibrary', 'OLLO'], exports: 'XL320'},
    'ergojr': {deps: ['physiCore', 'threeCore', 'STLLibrary', 'OLLO', 'XL320'], exports: 'ERGOJR'},
    // --- Use shim to mix together all THREE.js subcomponents
    'threeCore': { exports: 'THREE' },
    'OrbitControls': { deps: ['threeCore'], exports: 'THREE' },
    'STLLoader': {deps: ['threeCore'], exports: 'THREE'},
    // --- Physi.js sub-components
    'physiCore': {deps: ['threeCore'], exports: 'Physijs'},
    //
    'coordinates': {exports: 'Coordinates'},
    'detector': { exports: 'Detector' },
    'stats': { exports: 'Stats' },
    'dat': {exports: 'dat'},
  },
  // Third party code lives in js/lib
  paths: {
    // ergo
    STLLibrary: '../ergo/STLLibrary',
    OLLO: '../ergo/ollo',
    XL320: '../ergo/XL320',
    ergojr: '../ergo/ergojr',
    // --- THREE sub-components
    three: '../lib/three',
    threeCore: '../lib/three.min',
    OrbitControls: '../lib/OrbitControls',
    STLLoader: '../lib/STLLoader',
    // --- Physijs sub-components
    physijs: '../lib/physijs',
    physiCore: '../lib/physi',
    //
    coordinates: '../lib/Coordinates',
    detector: '../lib/Detector',
    stats: '../lib/stats.min',
    dat: '../lib/dat.gui.min',
  }
};
