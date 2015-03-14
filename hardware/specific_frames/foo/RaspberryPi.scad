use <roundedcube.scad>

module RaspberryPiA()
{
cube([85,56,1.6]);
translate([-0.5, 3.6, 1.6])
	cube([5.6, 7.6, 2.4]);
translate([-12, 3.6+7.6/2-11/2, 1.6+2.4/2-7/2])
	cube([12, 11, 7]);
}



module RaspberryPiAplus()
{
difference()
{
union()
{
// pcb
roundedcubexy(65, 56, 1.4, 3);

// usb connector
translate([65-12, 25, 1.4])
	cube([14, 13, 8.2-1.4]);

// expansion header
translate([3.5+29-50.8/2, 3.5+49-5.1/2, 1.4])
	cube([50.8, 5.1, 8.6]);

// power micro usb
translate([10.6-7.5/2, -1.2, 1.4])
	cube([7.5, 5.5, 2.9]);

// hdmi
translate([32-15/2, -1.2, 1.4])
	cube([15, 11.7, 6.7]);

// audio
translate([53.5-7/2, 0, 1.4])
	cube([7, 12.5, 6]);
translate([53.5, 0, 1.4+6/2])
	rotate([90, 0, 0])
	cylinder(d=6, h=2.5);

// micro sd 
translate([0, 20.7, -1.5])
	cube([14.6, 13.1, 1.5]);
}
// pcb mounting holes
translate([3.5, 3.5, -0.01])
	cylinder(r=2.75/2, h=2);
translate([3.5, 3.5+49, -0.01])
	cylinder(r=2.75/2, h=2);
translate([3.5+58, 3.5, -0.01])
	cylinder(r=2.75/2, h=2);
translate([3.5+58, 3.5+49, -0.01])
	cylinder(r=2.75/2, h=2);
}
}


// data from RPI-BPLUS-V1_2-MECHDRAWING
module RaspberryPiBplus()
{
difference()
{
union()
{
// pcb
roundedcubexy(85, 56, 1.4, 3);

// ethernet jack
translate([85-21.3+2, 10.25-16/2, 1.4])
	cube([21.3, 16, 13.6]);

// usb left
translate([85-17+2, 29-13.2/2, 1.4])
	cube([17, 13.2, 15.4]);

// usb right 
translate([85-17+2, 47-13.2/2, 1.4])
	cube([17, 13.2, 15.4]);

// expansion header
translate([3.5+29-50.8/2, 3.5+49-5.1/2, 1.4])
	cube([50.8, 5.1, 8.6]);

// power micro usb
translate([10.6-7.5/2, -1.2, 1.4])
	cube([7.5, 5.5, 2.9]);

// hdmi
translate([32-15/2, -1.2, 1.4])
	cube([15, 11.7, 6.7]);

// audio
translate([53.5-7/2, 0, 1.4])
	cube([7, 12.5, 6]);
translate([53.5, 0, 1.4+6/2])
	rotate([90, 0, 0])
	cylinder(d=6, h=2.5);

// micro sd 
translate([0, 20.7, -1.5])
	cube([14.6, 13.1, 1.5]);
}
// pcb mounting holes
translate([3.5, 3.5, -0.01])
	cylinder(r=2.75/2, h=2);
translate([3.5, 3.5+49, -0.01])
	cylinder(r=2.75/2, h=2);
translate([3.5+58, 3.5, -0.01])
	cylinder(r=2.75/2, h=2);
translate([3.5+58, 3.5+49, -0.01])
	cylinder(r=2.75/2, h=2);
}
}

//$fn=18;
RaspberryPiAplus();

