include <specific_frame_def.scad>

include <../robotis-scad/frames/frame_def.scad>
include <../robotis-scad/dynamixel/xl320_def.scad>
include <../robotis-scad/ollo_segments/ollo_segments_def.scad>

use <../robotis-scad/frames/U_three_ollo_to_horn_frame.scad>
use <../robotis-scad/ollo_segments/ollo_straight_segment.scad>
use <../segment-scad/elliptic_segment.scad>

use <../MCAD/rotate.scad>;

module pen_holder_frame(length=OlloSpacing+FrameTolerance, innerDiameter=PenHolderInnerDiameter){

  U_three_ollo_to_horn_frame(length, OlloLayerThickness/2);

  rotate([90,0,0])
    translate([0,-OlloSegmentWidth/2,-length+ollo_segment_thickness(1)/2])
  ollo_straight_segment(OlloSegmentWidth, 1, MotorHeight);

  rotate([90,0,0])
    translate([0,-OlloSegmentWidth/2,-innerDiameter/2-length])
      elliptic_segment(OlloSegmentWidth, width=innerDiameter+2*ollo_segment_thickness(1), heigth=innerDiameter+2*ollo_segment_thickness(1), wallThickness=ollo_segment_thickness(1));
}


// Testing
echo("##########");
echo("In U_three_ollo_to_horn_frame.scad");
echo("This file should not be included, use ''use <filemane>'' instead.");
echo("##########");

use <../robotis-scad/dynamixel/xl320.scad>

p = 1;
if (p==1) {
  /*xl320();*/
  pen_holder_frame();
}
