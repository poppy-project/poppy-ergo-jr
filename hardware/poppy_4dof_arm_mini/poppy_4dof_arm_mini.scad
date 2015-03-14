include <../robotis-scad/ollo/ollo_def.scad>
include <../robotis-scad/dynamixel/xl320_def.scad>
include <poppy_4dof_arm_mini_def.scad>

use <../robotis-scad/dynamixel/xl320.scad>;

use <../specific_frames/base_frame.scad>;
use <../specific_frames/pen_holder_frame.scad>;

use <../robotis-scad/frames/side_to_side_frame.scad>;
use <../robotis-scad/frames/U_horn_to_horn_frame.scad>;
use <../robotis-scad/frames/three_ollo_frame.scad>;
use <../robotis-scad/frames/horn_to_horn_frame.scad>;

use <../MCAD/rotate.scad>;

circular_base_frame(BaseRadius, BaseHeight);
xl320();
translate_to_xl320_top()
  verticalize_U_horn_to_horn_frame(A){
    U_horn_to_horn_frame(A);
    xl320_two_horns();
    translate_to_box_back()
      translate([0,OlloSpacing/2,0])
        rotate([180,90,0])
          add_three_ollo_frame(B)
            rotate([0,-90,0])
              translate([0,MotorLength-MotorAxisOffset-ollo_nLayer_thickness(1),0]){
                xl320_two_horns();
                rotate([0,-90,90])
                  add_horn_to_horn_frame(C)
                    rotate([180,-90,0]){
                      xl320_two_horns();
                      translate_to_box_back()
                        translate([0,OlloLayerThickness,0])
                        rotate([0,90,180])
                          pen_holder_frame();
                    }
              }
  }
