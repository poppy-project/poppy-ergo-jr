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

# list all scad file in folder
scadFileAvailable=$(find . -name "*.scad" -maxdepth 1)

# generate all filename.scad files and output stls in ./stl/filename.stl
for i in $scadFileAvailable; do
  scadFilename=${i#*/}
  filename=${scadFilename%.scad}
  stlFilename="stl/$filename.stl"
  echo "Generating $filename..."
  openscad -o $stlFilename $scadFilename -D $scadArg
done
