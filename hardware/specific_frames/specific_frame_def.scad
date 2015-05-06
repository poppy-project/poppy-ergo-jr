include <../robotis-scad/frames/frame_def.scad>
include <../raspberry-scad/raspberry_pi_Bplus_def.scad>


CircularBaseFrameRadius = 50;
CircularBaseFrameHeight = MotorHeight/2;

PenHolderInnerDiameter = 12;

CylinderHeadRadius = CircularBaseFrameRadius/2;

LampHeadStartRadius = 20;
LampHeadEndRadius = 35;
LampHeadLength = 50;

RaspberryPiBplusFrameWidth = RaspberryPiBplusLength;

RaspberryPiBplusFrameDistanceBoardToMotor = 10;
RaspberryPiBplusFrameDistanceMotorToEnd = 30;
RaspberryPiBplusFrameEndWidth = MotorWidth + 10;

RaspberryPiBplusFrameCameraDistFromEnd = 15;

RaspberryPiBplusFrameLenght = RaspberryPiBplusWidth + RaspberryPiBplusFrameDistanceBoardToMotor + MotorLength + RaspberryPiBplusFrameDistanceMotorToEnd;

RaspberryPiBplusFrameCornerRadius = 3;

RaspberryPiBplusFrameHeight = MotorHeight/2;

RaspberryPiBplusFramecameraDistFromEnd = 10;
