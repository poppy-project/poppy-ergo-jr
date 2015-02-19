include <../ergo_mini_def.scad>
include <../robotis-scad/ollo/ollo_def.scad>

use <../robotis-scad/frames/U_three_ollo_to_horn_frame.scad>;

U_three_ollo_to_horn_frame(length=F, radius=OlloLayerThickness/2);
