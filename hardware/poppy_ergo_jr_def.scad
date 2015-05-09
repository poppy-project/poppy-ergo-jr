include <robotis-scad/ollo/ollo_def.scad>
include <robotis-scad/frames/frame_def.scad>
include <robotis-scad/specific_frames/specific_frame_def.scad>

BaseRadius = CircularBaseFrameRadius;
BaseHeight = CircularBaseFrameHeight;

A = 25;
B = 30;
C = OlloSpacing/2+ollo_segment_thickness(1);
D = 30;
E = 30;
F = OlloSpacing/2+2*ollo_segment_thickness(1);
