#!/bin/bash

# this fisrt and only argument is the definition of the stl export, it defines the $fn variable in openscad
if [ -z "$1" ]
  then
    fn=128
    echo "No argument supplied -> fn=$fn"
  else
    fn=$1
fi

echo "Generating parts with fn=$fn"
scadArg="\$fn=$fn"

# create the stl folder if it does not exist
mkdir -p stl;

# should be automated
echo "Generating base..."
openscad -o stl/base.stl base.scad -D $scadArg

echo "Generating shift_one_side..."
openscad -o stl/shift_one_side.stl shift_one_side.scad -D $scadArg

echo "Generating U_horn_to_horn..."
openscad -o stl/U_horn_to_horn.stl U_horn_to_horn.scad -D $scadArg

echo "Generating U_side_to_horn..."
openscad -o stl/U_side_to_horn.stl U_side_to_horn.scad -D $scadArg

echo "Generating raspberry_base..."
openscad -o stl/raspberry_base.stl raspberry_base.scad -D $scadArg

echo "Generating circular_raspberry_base..."
openscad -o stl/circular_raspberry_base.stl circular_raspberry_base.scad -D $scadArg

echo "Generating raspberry_base_with_wheels..."
openscad -o stl/raspberry_base_with_wheels.stl raspberry_base_with_wheels.scad -D $scadArg

echo "Generating ollo_to_lego_for_wheels..."
openscad -o stl/ollo_to_lego_for_wheels.stl ollo_to_lego_for_wheels.scad -D $scadArg

echo "Generating passive_wheel..."
openscad -o stl/passive_wheel.stl passive_wheel.scad -D $scadArg

echo "Generating pen_holder..."
openscad -o stl/pen_holder.stl pen_holder.scad -D $scadArg

echo "Generating cylinder_head..."
openscad -o stl/cylinder_head.stl cylinder_head.scad -D $scadArg

echo "Generating lamp_head..."
openscad -o stl/lamp_head.stl lamp_head.scad -D $scadArg

echo "Generating simple_U..."
openscad -o stl/simple_U.stl simple_U.scad -D $scadArg
