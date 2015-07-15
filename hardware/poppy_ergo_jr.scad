include <poppy_ergo_jr_def.scad>

include <robotis-scad/ollo/ollo_def.scad>
include <robotis-scad/dynamixel/xl320_def.scad>
include <robotis-scad/specific_frames/specific_frame_def.scad>

use <robotis-scad/ollo/ollo_tools.scad>
use <robotis-scad/dynamixel/xl320.scad>

use <robotis-scad/frames/side_to_side_frame.scad>
use <robotis-scad/frames/three_ollo_to_horn_frame.scad>
use <robotis-scad/frames/U_horn_to_horn_frame.scad>
use <robotis-scad/frames/U_three_ollo_to_horn_frame.scad>
use <robotis-scad/frames/U_three_ollo_frame.scad>

use <robotis-scad/specific_frames/base_frame.scad>
use <robotis-scad/specific_frames/pen_holder_frame.scad>
use <robotis-scad/specific_frames/cylinder_head_frame.scad>
use <robotis-scad/specific_frames/lamp_head_frame.scad>
use <robotis-scad/specific_frames/flower_pot_frame.scad>
use <robotis-scad/specific_frames/raspberry_pi_Bplus_base_frame.scad>

use <raspberry-scad/raspberry_pi_Bplus_tools.scad>

use <MCAD/rotate.scad>
use <MCAD/rounded_cube.scad>

module poppy_ergo_jr(direction="front", endTool="pen_holder"){
  if (direction == "front")
    xl320();
  if (direction == "back")
    rotate([0,0,180])
      xl320();

  translate_to_xl320_top()
    verticalize_U_horn_to_horn_frame(A){
      U_horn_to_horn_frame(A);
      xl320_two_horns();
      translate_to_box_back()
        translate([0,OlloSpacing/2,0])
          rotate([180,90,0])
            add_three_ollo_to_horn_frame(B)
              rotate([0,90,180]) {
                xl320_two_horns();
                translate_to_box_back()
                  translate([0,OlloSpacing/2,0])
                    rotate([180,90,0])
                        add_U_three_ollo_to_horn_frame(length=C, radius=OlloLayerThickness/2)
                          rotate([90,0,0])
                            translate([0,0,-MotorHeight/2-OlloLayerThickness]) {
                              xl320();
                              translate([0,-OlloSpacing*3,0])
                                rotate([180,0,0])
                                  add_three_ollo_to_horn_frame(D)
                                    rotate([0,90,180]) {
                                      xl320_two_horns();
                                      translate_to_box_back()
                                        translate([0,OlloSpacing/2,0])
                                          rotate([180,90,0])
                                            add_three_ollo_to_horn_frame(E)
                                              rotate([0,90,180]) {
                                                xl320_two_horns();
                                                translate_to_box_back()
                                                  translate([0,OlloSpacing/2,0])
                                                    rotate([180,90,0])
                                                      add_end_tool(endTool);
                                              }
                                    }
                            }
              }
    }
}

module add_end_tool(endTool) {
  if (endTool=="pen_holder")
    pen_holder_frame(length=F);
  if (endTool=="cylinder_head")
    cylinder_head_frame(length=F);
  if (endTool=="lamp_head")
    lamp_head_frame(length=F);
  if (endTool=="simple_U")
    U_three_ollo_frame(length=F);
}

module circular_base_flower_pot() {
  difference() {
    circular_base_frame(BaseRadius, BaseHeight);

    translate([0,0,-BaseHeight-OlloLayerThickness/2]){

      ollo_holes_flower_pot();

      rotate([0,0,90]) {
        translate([0,RaspberryPiBplusWidth/2+OlloSpacing/2,0])
          threeOlloHoles();

        translate([0,-RaspberryPiBplusWidth/2-OlloSpacing/2,0])
          threeOlloHoles();

        translate([0,RaspberryPiBplusWidth/2-OlloSpacing,0])
          rounded_cube(RaspberryPiBplusHolderFrameSupportHeight-2*OlloLayerThickness, 2*OlloSpacing, OlloLayerThickness, RaspberryPiBplusHolesDiameter, center=true);

        translate([0,-RaspberryPiBplusWidth/2+OlloSpacing,0])
          rounded_cube(RaspberryPiBplusHolderFrameSupportHeight-2*OlloLayerThickness, 2*OlloSpacing, OlloLayerThickness, RaspberryPiBplusHolesDiameter, center=true);
      }

      translate([0,BaseRadius-2*OlloSpacing,0])
        rounded_cube(20,1, OlloLayerThickness, 0.5, center=true);

      translate([0,-BaseRadius+2*OlloSpacing,0])
        rounded_cube(20,1, OlloLayerThickness, 0.5, center=true);
    }
  }


}

module poppy_ergo_jr_flower_pot() {

    translate([0,0,-BaseHeight-1.5*OlloLayerThickness])
      basic_flower_pot_frame();

    circular_base_flower_pot();

    poppy_ergo_jr(endTool="lamp_head");

    translate([0,OlloSpacing,-RaspberryPiBplusLength/2-RaspberryPiBplusHolderFrameDistSupportToBoard-BaseHeight-1.5*OlloLayerThickness])
    rotate([90,90,0]) {
    raspberry_pi_Bplus_holder_frame(OlloLayerThickness);
    translate([0,0,OlloLayerThickness])
      add_raspberry_pi_Bplus();
    }


}

module poppy_ergo_jr_flower_pot_view_inside() {

  difference() {
    translate([0,0,-BaseHeight-1.5*OlloLayerThickness])
      basic_flower_pot_frame();

    rotate([0,0,-90])
    translate([0,-50,0])
    cube([200,100,300], center=true);
    }

    circular_base_flower_pot();

    poppy_ergo_jr(endTool="lamp_head");

    translate([0,OlloSpacing,-RaspberryPiBplusLength/2-RaspberryPiBplusHolderFrameDistSupportToBoard-BaseHeight-1.5*OlloLayerThickness])
    rotate([90,90,0]) {
    raspberry_pi_Bplus_holder_frame(OlloLayerThickness);
    translate([0,0,OlloLayerThickness])
      add_raspberry_pi_Bplus();
    }
}

// Testing
echo("##########");
echo("In poppy_ergo_jr.scad");
echo("This file should not be included, use ''use <filemane>'' instead.");
echo("##########");

p = 1;
if (p==1) {
  poppy_ergo_jr_flower_pot_view_inside();
  translate([200,0,0])
    poppy_ergo_jr_flower_pot();
}
if (p==2) {
  circular_base_flower_pot();
}
