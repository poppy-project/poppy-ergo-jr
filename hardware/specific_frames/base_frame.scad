include <specific_frame_def.scad>

include <../robotis-scad/frames/frame_def.scad>

include <../robotis-scad/dynamixel/xl320_def.scad>
include <../robotis-scad/ollo/ollo_def.scad>
include <../robotis-scad/ollo_segments/ollo_segments_def.scad>

use <../robotis-scad/ollo/ollo_tools.scad>
use <../robotis-scad/ollo_segments/ollo_straight_segment.scad>
use <../robotis-scad/ollo_segments/ollo_elbow_segment.scad>
use <../robotis-scad/ollo_segments/ollo_xl320_segment.scad>;

use <../MCAD/rotate.scad>;

module side_branch(height, nLayer, width) {
  thickness = ollo_segment_thickness(nLayer);

  rotate([0,0,90])
    translate([0,-1.5*OlloSpacing,0])
      ollo_xl320_side_start_segment(nLayer, width);
  translate([0, width/2, 0])
    ollo_straight_segment(height-width/2, nLayer, 4*OlloSpacing);
}

module base_frame(height, nLayer=1, width=OlloSegmentWidth, tolerance=FrameTolerance) {

  thickness = ollo_segment_thickness(nLayer);

  translate([0, -1.5*OlloSpacing, 0])
    rotate([-90,0,90]) {
      translate([0,0,-MotorWidth/2-thickness/2-tolerance])
        side_branch(height, nLayer, width);
      mirror([0,0,1])
        translate([0,0,-MotorWidth/2-thickness/2-tolerance])
          side_branch(height, nLayer, width);
    }
}

module circular_base_frame(radius=CircularBaseFrameRadius, height=CircularBaseFrameHeight, nLayer=1, width=OlloSegmentWidth) {

  thickness = ollo_segment_thickness(nLayer);

  base_frame(height+thickness);
  translate([0,0,-height-thickness])
    cylinder(r=radius, h=thickness);

}

// Testing
echo("##########");
echo("In base_frame.scad");
echo("This file should not be included, use ''use <filemane>'' instead.");
echo("##########");

use <../robotis-scad/dynamixel/xl320.scad>

p = 1;
nLayer = 1;
if (p==1) {

  circular_base_frame();
  xl320();

}
