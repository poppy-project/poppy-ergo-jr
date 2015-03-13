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

echo "Generating partA..."
openscad -o stl/partA.stl partA.scad -D $scadArg

echo "Generating partB..."
openscad -o stl/partB.stl partB.scad -D $scadArg

echo "Generating partC..."
openscad -o stl/partC.stl partC.scad -D $scadArg

echo "Generating partD..."
openscad -o stl/partD.stl partD.scad -D $scadArg

echo "Generating partE..."
openscad -o stl/partE.stl partE.scad -D $scadArg

echo "Generating partF..."
openscad -o stl/partF.stl partF.scad -D $scadArg
