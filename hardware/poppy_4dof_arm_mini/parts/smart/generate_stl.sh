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

echo "Generating side_to_side..."
openscad -o stl/side_to_side.stl side_to_side.scad -D $scadArg

echo "Generating U_horn_to_horn..."
openscad -o stl/U_horn_to_horn.stl U_horn_to_horn.scad -D $scadArg

echo "Generating horn_to_horn..."
openscad -o stl/horn_to_horn.stl horn_to_horn.scad -D $scadArg

echo "Generating three_ollo..."
openscad -o stl/three_ollo.stl three_ollo.scad -D $scadArg

echo "Generating pen_holder..."
openscad -o stl/pen_holder.stl pen_holder.scad -D $scadArg
