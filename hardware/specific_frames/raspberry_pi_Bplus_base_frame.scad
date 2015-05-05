include <specific_frame_def.scad>

include <../robotis-scad/ollo/ollo_def.scad>
include <../robotis-scad/dynamixel/xl320_def.scad>
include <../raspberry-scad/raspberry_pi_Bplus_def.scad>

use <../robotis-scad/ollo/ollo_tools.scad>
use <../raspberry-scad/raspberry_pi_Bplus_tools.scad>

use <base_frame.scad>

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

module raspberry_pi_Bplus_base_frame(boardHeight=5, holeType="spike", cornerRadius=RaspberryPiBplusFrameCornerRadius, nLayer=1) {

  thickness = ollo_segment_thickness(nLayer);

  baseYPos = RaspberryPiBplusWidth/2 + RaspberryPiBplusFrameDistanceBoardToMotor + MotorLength - MotorAxisOffset;

  raspberry_pi_Bplus_plate(cornerRadius, nLayer);

  translate([0,baseYPos,RaspberryPiBplusFrameHeight+thickness])
    base_frame(RaspberryPiBplusFrameHeight);

  translate([0,0,thickness])
    raspberry_pi_Bplus_hole_support(boardHeight, holeType, center=true);

}

// Testing
echo("##########");
echo("In raspberry_pi_Bplus_base_frame.scad");
echo("This file should not be included, use ''use <filemane>'' instead.");
echo("##########");

use <../robotis-scad/dynamixel/xl320.scad>

p = 1;
if (p==1) {
  raspberry_pi_Bplus_base_frame();

  translate([0,0,ollo_segment_thickness(1)+5])
    add_raspberry_pi_Bplus();
}
