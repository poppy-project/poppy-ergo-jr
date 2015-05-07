include <../robotis-scad/ollo/ollo_def.scad>
include <../robotis-scad/dynamixel/xl320_def.scad>
include <../robotis-scad/ollo_segments/ollo_segments_def.scad>

use <../robotis-scad/ollo/ollo_tools.scad>

use <../MCAD/rotate.scad>;

legoWheelDiameter = 30.5;

module wheels_holes(withCableHole=true, nLayer=1, spaceBetweenHoles=3*OlloSpacing) {

  translate([0,spaceBetweenHoles/2,0])
    threeOlloHoles(nLayer=nLayer);
  translate([0,-spaceBetweenHoles/2,0])
    threeOlloHoles(nLayer=nLayer);

    if (withCableHole == true) {
      cube([1.5*OlloSpacing,2*OlloSpacing, ollo_segment_thickness(nLayer)], center=true);
    }
}

module passive_wheel(height=MotorWidth/2+legoWheelDiameter/2, diameter=25, spaceBetweenHoles=2*OlloSpacing) {

  difference() {
    translate([0,0,-height+diameter/2]) {
      cylinder(h=height-diameter/2, d=diameter);
      sphere(diameter/2);
    }
    translate([0,0,-ollo_segment_thickness(1)/2])
    wheels_holes(withCableHole=false, spaceBetweenHoles=2*OlloSpacing);
  }
}

// Testing
echo("##########");
echo("In wheel_tools.scad");
echo("This file should not be included, use ''use <filemane>'' instead.");
echo("##########");

use <../robotis-scad/dynamixel/xl320.scad>

p = 1;
if (p==1) {
  /*xl320();*/
  passive_wheel();
}
