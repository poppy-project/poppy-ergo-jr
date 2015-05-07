include <specific_frame_def.scad>

include <../robotis-scad/ollo/ollo_def.scad>
include <../robotis-scad/dynamixel/xl320_def.scad>
include <../robotis-scad/ollo_segments/ollo_segments_def.scad>
include <../raspberry-scad/raspberry_pi_Bplus_def.scad>

use <../segment-scad/elliptic_segment.scad>
use <../robotis-scad/ollo/ollo_tools.scad>
use <../robotis-scad/frames/U_horn_to_horn_frame.scad>
use <../raspberry-scad/raspberry_pi_Bplus_tools.scad>

use <../../../poppy-4wheels-mini/hardware/poppy_4wheels_mini.scad>

use <base_frame.scad>
use <wheel_tools.scad>


use <../MCAD/rotate.scad>;

module raspberry_pi_Bplus_plate_sharp(nLayer=1) {

  thickness = ollo_segment_thickness(nLayer);

  translate([0,-RaspberryPiBplusWidth/2,0]){
    linear_extrude(height=thickness) {
        polygon(points=[[-RaspberryPiBplusFrameWidth/2,0], [-RaspberryPiBplusFrameWidth/2,RaspberryPiBplusWidth+RaspberryPiBplusFrameDistanceBoardToMotor], [-RaspberryPiBplusFrameEndWidth/2,RaspberryPiBplusFrameLenght], [RaspberryPiBplusFrameEndWidth/2,RaspberryPiBplusFrameLenght], [RaspberryPiBplusFrameWidth/2,RaspberryPiBplusWidth+RaspberryPiBplusFrameDistanceBoardToMotor], [RaspberryPiBplusFrameWidth/2,0]], paths=[[0,1,2,3,4,5]]);
    }
  }
}

module raspberry_pi_Bplus_plate(cornerRadius=RaspberryPiBplusFrameCornerRadius, nLayer=1) {

  thickness = ollo_segment_thickness(nLayer);

  if (cornerRadius > 0) {
    translate([0,-RaspberryPiBplusWidth/2,0]){
      minkowski() {
        linear_extrude(height=thickness/2) {
            polygon(points=[[-RaspberryPiBplusFrameWidth/2+cornerRadius,cornerRadius], [-RaspberryPiBplusFrameWidth/2+cornerRadius,RaspberryPiBplusWidth+RaspberryPiBplusFrameDistanceBoardToMotor], [-RaspberryPiBplusFrameEndWidth/2+cornerRadius,RaspberryPiBplusFrameLenght-cornerRadius], [RaspberryPiBplusFrameEndWidth/2-cornerRadius,RaspberryPiBplusFrameLenght-cornerRadius], [RaspberryPiBplusFrameWidth/2-cornerRadius,RaspberryPiBplusWidth+RaspberryPiBplusFrameDistanceBoardToMotor], [RaspberryPiBplusFrameWidth/2-cornerRadius,cornerRadius]], paths=[[0,1,2,3,4,5]]);
        }
        cylinder(h=thickness/2, r=cornerRadius);
      }
    }
  } else {
    raspberry_pi_Bplus_plate_sharp(nLayer=nLayer);
  }

}

module raspberry_pi_Bplus_base_frame(baseHeight=RaspberryPiBplusFrameHeight,boardHeight=5, holeType="spike", cornerRadius=RaspberryPiBplusFrameCornerRadius, cameraDistFromEnd=RaspberryPiBplusFrameCameraDistFromEnd, nLayer=1, withHole=false) {

  thickness = ollo_segment_thickness(nLayer);

  baseYPos = RaspberryPiBplusWidth/2 + RaspberryPiBplusFrameDistanceBoardToMotor + MotorLength - MotorAxisOffset;

  translate([0,0,-baseHeight+MotorHeight/2]) {
    raspberry_pi_Bplus_plate(cornerRadius, nLayer);

    translate([0,baseYPos,baseHeight+thickness])
      base_frame(baseHeight, withHole=withHole);

    translate([0,0,thickness])
      raspberry_pi_Bplus_hole_support(boardHeight, holeType, center=true);

    translate([0,RaspberryPiBplusFrameLenght-RaspberryPiBplusWidth/2-cameraDistFromEnd,thickness])
      add_raspberry_camera_holder();
  }
}

module raspberry_pi_Bplus_base_frame_with_raspberry_board(baseHeight=RaspberryPiBplusFrameHeight,boardHeight=5, holeType="spike", cornerRadius=RaspberryPiBplusFrameCornerRadius, nLayer=1) {

  raspberry_pi_Bplus_base_frame(baseHeight=baseHeight);

  translate([0,0,ollo_segment_thickness(nLayer)+boardHeight-baseHeight+MotorHeight/2])
    add_raspberry_pi_Bplus();

}

module circular_vertical_raspberry_pi_Bplus_base_frame(baseHeight=RaspberryPiBplusFrameHeight, radius=CircularBaseFrameRadius, boardHeight=0, boardDistFromCenter=7+MotorHeight/2+2*OlloLayerThickness, cameraDistFromCenter=12+MotorLength-MotorAxisOffset, nLayer=1) {

  rotate([0,0,180])
    circular_base_frame(radius=CircularBaseFrameRadius, height=baseHeight, withHole=true);

  /*difference() {*/
    translate([0,-boardDistFromCenter,-baseHeight])
      add_side_support(boardHeight);
    /*translate([0,0,-MotorHeight/2])
      rotate([90,0,0])
        elliptic_segment(RaspberryPiBplusWidth, width=4*CircularBaseFrameRadius, heigth=4*CircularBaseFrameRadius, wallThickness=CircularBaseFrameRadius);
  }*/
  translate([0,cameraDistFromCenter,-baseHeight])
    add_raspberry_camera_holder(boardHeight);
}

module circular_vertical_raspberry_pi_Bplus_base_frame_with_raspberry_board(baseHeight=RaspberryPiBplusFrameHeight, radius=CircularBaseFrameRadius, boardHeight=0, boardDistFromCenter=7+MotorHeight/2+2*OlloLayerThickness, cameraDistFromCenter=12+MotorLength-MotorAxisOffset, nLayer=1) {

  circular_vertical_raspberry_pi_Bplus_base_frame(baseHeight, radius, boardHeight, boardDistFromCenter, cameraDistFromCenter, nLayer);

  rotate([-90,0,180])
    translate([0,-boardHeight-RaspberryPiBplusWidth/2+baseHeight,boardDistFromCenter])
      add_raspberry_pi_Bplus();
}



module raspberry_pi_Bplus_base_frame_with_wheels(baseHeight=RaspberryPiBplusFrameHeight) {

  difference() {
    raspberry_pi_Bplus_base_frame(baseHeight=baseHeight);

    translate([RaspberryPiBplusFrameWidth/2-MotorHeight/2,0,MotorHeight/2-baseHeight+ollo_segment_thickness(1)/2])
      wheels_holes();
    translate([-RaspberryPiBplusFrameWidth/2+MotorHeight/2,0,MotorHeight/2-baseHeight+ollo_segment_thickness(1)/2])
      wheels_holes();

    translate([0,RaspberryPiBplusFrameLenght-RaspberryPiBplusWidth/2-RaspberryPiBplusFrameCameraDistFromEnd,MotorHeight/2-baseHeight+ollo_segment_thickness(1)/2])
      wheels_holes(withCableHole=false, spaceBetweenHoles=2*OlloSpacing);
  }
}

// Testing
echo("##########");
echo("In raspberry_pi_Bplus_base_frame.scad");
echo("This file should not be included, use ''use <filemane>'' instead.");
echo("##########");

use <../robotis-scad/dynamixel/xl320.scad>

p = 1;
baseHeight = RaspberryPiBplusFrameHeight;
if (p==1) {
  raspberry_pi_Bplus_base_frame_with_raspberry_board();

  translate([150,0,0]) {
    circular_vertical_raspberry_pi_Bplus_base_frame_with_raspberry_board();
    rotate([0,0,180]){
      xl320();
      translate_to_xl320_top()
        verticalize_U_horn_to_horn_frame(30){
          rotate([0,60,0]){
            U_horn_to_horn_frame(30);
              xl320_two_horns();
          }
        }
    }
  }

  translate([-150,0,0]) {
    raspberry_pi_Bplus_base_frame_with_wheels(baseHeight);

    translate([0,RaspberryPiBplusWidth+RaspberryPiBplusFrameDistanceBoardToMotor,MotorHeight/2+ollo_segment_thickness(1)])
      xl320();
    translate([0,RaspberryPiBplusFrameLenght-RaspberryPiBplusWidth/2-RaspberryPiBplusFrameCameraDistFromEnd,-baseHeight+MotorHeight/2])
      passive_wheel();

    translate([-RaspberryPiBplusFrameWidth/2+MotorHeight/2,1.5*OlloSpacing,-baseHeight])
      rotate([0,-90,0])
        add_wheel("lego");

    translate([RaspberryPiBplusFrameWidth/2-MotorHeight/2,1.5*OlloSpacing,-baseHeight])
      rotate([0,90,0])
        add_wheel("lego");
  }
}
