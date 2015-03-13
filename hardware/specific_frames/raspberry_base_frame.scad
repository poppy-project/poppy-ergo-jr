// parts from http://www.thingiverse.com/thing:429317
include <specific_frame_def.scad>

include <../robotis-scad/frames/frame_def.scad>
include <../robotis-scad/ollo_segments/ollo_segments_def.scad>

use <base_frame.scad>


module raspberry_base_bottom() {
  translate([-60,60,0])
    rotate([0,0,-90])
      import("raspberry_case/bracket_case_bottom.stl", convexity=10);
}

module raspberry_base_top() {
  translate([-38.4,-54.1,36.5])
    rotate([0,180,-90])
      import("raspberry_case/bracket_case_cover.stl", convexity=10);
  translate([0,0,50])
    base_frame(CircularBaseFrameHeight+2, nLayer=1, width=OlloSegmentWidth, tolerance=FrameTolerance);
}

// Testing
echo("##########");
echo("In raspberry_base_frame.scad");
echo("This file should not be included, use ''use <filemane>'' instead.");
echo("##########");

use <../robotis-scad/dynamixel/xl320.scad>

p = 1;
nLayer = 1;
if (p==1) {
  /*raspberry_base_bottom();*/
  raspberry_base_top();
}
