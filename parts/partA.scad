include <../ergo_mini_def.scad>

use <../robotis-scad/frames/U_frame.scad>;

add_bottom_crossOlloHoles_to_U_frame(height=A, angle=45)
  U_frame(height=A);
