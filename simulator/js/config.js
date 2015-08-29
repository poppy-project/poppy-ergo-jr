// Configure Require.js
var require = {
  // Default load path for js files
  baseUrl: 'js/app',
  shim: {
    // --- Use shim to mix together all THREE.js subcomponents
    'threeCore': { exports: 'THREE' },
    'OrbitControls': { deps: ['threeCore'], exports: 'THREE' },
    'STLLoader': {deps: ['threeCore'], exports: 'THREE'},
    // --- end THREE sub-components
    'detector': { exports: 'Detector' },
    'stats': { exports: 'Stats' }
  },
  // Third party code lives in js/lib
  paths: {
    // --- start THREE sub-components
    three: '../lib/three',
    threeCore: '../lib/three.min',
    OrbitControls: '../lib/OrbitControls',
    STLLoader: '../lib/STLLoader',
    // --- end THREE sub-components
    detector: '../lib/Detector',
    stats: '../lib/stats.min',
  }
};
