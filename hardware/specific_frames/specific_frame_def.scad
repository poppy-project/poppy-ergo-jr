include <../robotis-scad/frames/frame_def.scad>
include <../raspberry-scad/raspberry_pi_Bplus_def.scad>


CircularBaseFrameRadius = 50;
CircularBaseFrameHeight = MotorHeight/2;

PenHolderInnerDiameter = 12;



RaspberryPiBplusFrameWidth = RaspberryPiBplusLength;

RaspberryPiBplusFrameDistanceBoardToMotor = 10;
RaspberryPiBplusFrameDistanceMotorToEnd = 10;
RaspberryPiBplusFrameEndWidth = MotorWidth + 10;

RaspberryPiBplusFrameLenght = RaspberryPiBplusWidth + RaspberryPiBplusFrameDistanceBoardToMotor + MotorLength + RaspberryPiBplusFrameDistanceMotorToEnd;

RaspberryPiBplusFrameCornerRadius = 3;

RaspberryPiBplusFrameHeight = MotorHeight/2;
