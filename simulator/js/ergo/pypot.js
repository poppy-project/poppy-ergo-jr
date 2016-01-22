define([ 'gui' ], function(gui) {

  var defaultMotors = [ 'm1', 'm2', 'm3', 'm4', 'm5', 'm6' ];

  var PYPOT = {
    IP: '127.0.0.1',
    PORT: '8080',
    FREQ: 20,
    motors: {},
    pollRequest: undefined,
    motorIds: defaultMotors,
    poller: undefined,
    motors: (function(_motors) {
      var ret = {};
      _motors.forEach(function(motorId) {
        ret[motorId] = 0;
      });

      return ret;
    })(defaultMotors)
  };

  PYPOT.startPoll = function() {
    if (!PYPOT.poller) {
      console.log('init polling');
      PYPOT.poller = setInterval(PYPOT.pollPos, 1000 / PYPOT.FREQ);
    }
  }

  PYPOT.stopPoll = function() {
    if (PYPOT.poller) {
      clearInterval(PYPOT.poller);
      PYPOT.poller = undefined;
    }
  }

  PYPOT.pollPos = function() {
    var req, pollUrl;

    pollUrl = 'http://' + PYPOT.IP + ':' + PYPOT.PORT + '/motors/register/present_position';
    PYPOT.pollRequest = new XMLHttpRequest();
    req = PYPOT.pollRequest;

    req.onreadystatechange = function() {
      var res;

      if (req.readyState === 4) {
        if (req.status === 200) {
          res = JSON.parse(req.responseText);
          for (var motorId in res) {
            PYPOT.motors[motorId] = res[motorId].present_position;
            gui.guiData[motorId] = res[motorId].present_position;
          }
        } else {
          console.log('Something wrong while reading REST API (code: ' + req.status + ')');
        }
      }
    }

    req.open('GET', pollUrl);
    req.send();
  }

  window.PYPOT = PYPOT;

  return PYPOT;
});
