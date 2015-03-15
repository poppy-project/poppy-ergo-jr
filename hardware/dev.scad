
use <poppy_ergo_jr.scad>

use <poppy_4dof_arm_mini/poppy_4dof_arm_mini.scad>

poppy_ergo_jr();

translate([100,0,0])
  poppy_4dof_arm_mini();

translate([200,0,0])
  poppy_4dof_arm_mini_v2();
