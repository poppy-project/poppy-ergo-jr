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

echo "Generating pen_holder..."
openscad -o stl/pen_holder.stl pen_holder.scad -D $scadArg
