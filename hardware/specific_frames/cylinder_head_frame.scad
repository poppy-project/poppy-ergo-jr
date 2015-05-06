include <specific_frame_def.scad>

include <../robotis-scad/frames/frame_def.scad>
include <../robotis-scad/dynamixel/xl320_def.scad>
include <../robotis-scad/ollo_segments/ollo_segments_def.scad>

use <../robotis-scad/frames/U_three_ollo_frame.scad>
use <../robotis-scad/ollo_segments/ollo_straight_segment.scad>
use <../segment-scad/elliptic_segment.scad>

use <../MCAD/rotate.scad>;

module cylinder_head_frame(length=OlloSpacing/2+ollo_segment_thickness(1)){

  add_U_three_ollo_frame(length)
    translate([0,-ollo_segment_thickness(1),0])
      rotate([-90,0,0])
        cylinder(h=ollo_segment_thickness(1), r=CylinderHeadRadius);
}

// Testing
echo("##########");
echo("In cylinder_head_frame.scad");
echo("This file should not be included, use ''use <filemane>'' instead.");
echo("##########");

use <../robotis-scad/dynamixel/xl320.scad>

p = 1;
if (p==1) {
  xl320();
  translate([0,-4*OlloSpacing,0])
    rotate([0,90,180])
      cylinder_head_frame();
}
