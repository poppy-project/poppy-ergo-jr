#!/bin/bash

echo "Generating base..."
openscad -o stl/base.stl base.scad -D '$fn=128'

echo "Generating partA..."
openscad -o stl/partA.stl partA.scad -D '$fn=128'

echo "Generating partB..."
openscad -o stl/partB.stl partB.scad -D '$fn=128'

echo "Generating partC..."
openscad -o stl/partC.stl partC.scad -D '$fn=128'

echo "Generating partD..."
openscad -o stl/partD.stl partD.scad -D '$fn=128'

echo "Generating partE..."
openscad -o stl/partE.stl partE.scad -D '$fn=128'

echo "Generating partF..."
openscad -o stl/partF.stl partF.scad -D '$fn=128'
