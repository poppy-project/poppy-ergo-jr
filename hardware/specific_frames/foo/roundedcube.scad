module roundedcube(lx, ly, lz, radius) {
translate([radius, radius, radius])
minkowski() {
cube([lx-2*radius, ly-2*radius, lz-2*radius]);
sphere(r=radius);
}
}


module roundedcubexy(lx,ly,lz,radius) {
translate([radius, radius, 0])
minkowski() {
cube([lx-2*radius,ly-2*radius,lz/2]);
cylinder(r=radius, h=lz/2);
}
}

module roundedcubexz(lx,ly,lz,radius) {
translate([radius, 0, radius])
minkowski() {
cube([lx-2*radius, ly/2, lz-2*radius]);
rotate([-90, 0, 0])
	cylinder(r=radius, h=ly/2);
}
}

module roundedcubeyz(lx,ly,lz,radius) {
translate([0, radius, radius])
minkowski() {
cube([lx/2, ly-2*radius, lz-2*radius]);
rotate([0, 90, 0])
	cylinder(r=radius, h=lx/2);
}
}

roundedcubeyz(30, 20, 10, 3);

