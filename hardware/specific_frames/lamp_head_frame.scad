include <specific_frame_def.scad>

include <../robotis-scad/frames/frame_def.scad>
include <../robotis-scad/dynamixel/xl320_def.scad>
include <../robotis-scad/ollo_segments/ollo_segments_def.scad>

use <../robotis-scad/frames/U_three_ollo_frame.scad>
use <../robotis-scad/ollo_segments/ollo_straight_segment.scad>
use <../segment-scad/elliptic_segment.scad>

use <../MCAD/rotate.scad>;

module lamp_head_frame(attachLength=OlloSpacing/2+ollo_segment_thickness(1), lampLength=LampHeadLength, lampStartRadius=LampHeadStartRadius, lampEndRadius=LampHeadEndRadius,wallThickness=ollo_segment_thickness(1),cableHoleRadius=OlloSpacing){

  difference(){
    union() {
      U_three_ollo_frame(attachLength);
      translate([0,attachLength-ollo_segment_thickness(1),0])
        rotate([-90,0,0]) {
          difference() {
            cylinder(h=LampHeadLength, r1=lampStartRadius, r2=lampEndRadius);
            cylinder(h=LampHeadLength, r1=lampStartRadius-wallThickness, r2=lampEndRadius-wallThickness);
          }
          cylinder(h=ollo_segment_thickness(1),r=lampStartRadius);
      }
    }
    translate([0,attachLength-ollo_segment_thickness(1),0])
      rotate([-90,0,0])
        cylinder(h=ollo_segment_thickness(1),r=cableHoleRadius);
  }

}

// Testing
echo("##########");
echo("In lamp_head_frame.scad");
echo("This file should not be included, use ''use <filemane>'' instead.");
echo("##########");

use <../robotis-scad/dynamixel/xl320.scad>

p = 1;
if (p==1) {
  xl320();
  translate([0,-4*OlloSpacing,0])
    rotate([0,90,180])
      lamp_head_frame();
}
