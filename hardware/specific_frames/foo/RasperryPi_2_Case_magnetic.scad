use <raspberrypi.scad>
use <roundedcube.scad>

$fn=4*20;

module ShellButtom()
{
difference() {
roundedcube(85+6, 56+6, 20, 3);
translate([2, 2, 2])
	roundedcube(85+2, 56+2, 20, 3);
translate([0, 0, 7+1.6+3])
	cube([85+6, 56+6, 20]);
}
}

module CaseBottom()
{
difference()
{
union()
{
// baseplate
translate([-3, -3, 0])
	ShellButtom();

// standoff
translate([3.5, 3.5, 0.01])
	cylinder(d=6, h=7);
translate([3.5, 3.5+49, 0.01])
	cylinder(d=6, h=7);
translate([3.5+58, 3.5, 0.01])
	cylinder(d=6, h=7);
translate([3.5+58, 3.5+49, 0.01])
	cylinder(d=6, h=7);
}
translate([3.5, 3.5, 1])
	cylinder(d=2.2, h=7);
translate([3.5, 3.5+49, 1])
	cylinder(d=2.2, h=7);
translate([3.5+58, 3.5, 1])
	cylinder(d=2.2, h=7);
translate([3.5+58, 3.5+49, 1])
	cylinder(d=2.2, h=7);

// sd cad slot
translate([-0.5, 24.5-3, 5.6-1])
	rotate([0, -90, 0])
	roundedcubexy(3, 13.5, 3, 1);

// power connector cut
translate([10.6-8/2, -3.5, 7+1.4])
	roundedcubexz(8, 3, 10, 1);

// hdmi connector cut
translate([32-15.6/2, -3.5, 7+1.8])
	roundedcubexz(15.6, 3, 10, 1);

// audio connector cut
translate([53.5, -3.5, 7+1.6+3])
	rotate([-90, 0, 0])
	cylinder(d=7, h=3);

// ethernet and usb cut
translate([85+3-2.5, 2.25, 7+1.4])
	roundedcubeyz(3, 52, 10, 1);
}
}

module ShellTop()
{
	difference()
	{
		roundedcube(85+6, 56+6, 30, 3);
		translate([3.5, 3.5, 2])
			roundedcube(85+6-7, 56+6-7, 30, 3);
		translate([0, 0, 17-3+2])
			cube([85+6, 56+6, 20]);
	}
	// edge
	rad1=3.3;
	rad2=3.1;
	difference()
	{
		hull()
		{
			translate([3.5+2, 3.5+2, 16])
				cylinder(r1=rad1, r2=rad2, h=1);
			translate([3.5+2, 56+6-3.5-2, 16])
				cylinder(r1=rad1, r2=rad2, h=1);
			translate([85+6-3.5-2, 3.5+2, 16])
				cylinder(r1=rad1, r2=rad2, h=1);
			translate([85+6-3.5-2, 56+6-3.5-2, 16])
				cylinder(r1=rad1, r2=rad2, h=1);
		}
		translate([3.5, 3.5, 2])
			roundedcube(85+6-7, 56+6-7, 30, 3);
	}
}

module CaseTop()
{
difference()
{
union()
{
// baseplate
translate([-3, -3, 0])
	ShellTop();

// standoff
translate([3.5, 3.5, 0.01])
	cylinder(d=7, h=16+3-2.5);
translate([3.5, 3.5+49, 0.01])
	cylinder(d=7, h=16+3-2.5);
translate([3.5+58, 3.5, 0.01])
	cylinder(d=7, h=16+3-2.5);
translate([3.5+58, 3.5+49, 0.01])
	cylinder(d=7, h=16+3-2.5);
}
// holes for magnets in the standoff
translate([3.5, 3.5, 16.5-3.5])
	cylinder(d=4.3, h=5);
translate([3.5, 3.5+49, 16.5-3.5])
	cylinder(d=4.3, h=5);
translate([3.5+58, 3.5, 16.5-3.5])
	cylinder(d=4.3, h=5);
translate([3.5+58, 3.5+49, 16.5-3.5])
	cylinder(d=4.3, h=5);

/*
// cut the alignement corners
translate([3.5, 3.5, 16.51])
    cylinder(d=7, h=5);
translate([3.5, 3.5+49, 16.51])
    cylinder(d=7, h=5);
*/

// power connector cut
translate([10.6-8/2, 62-2.5-5, 16-1.5])
	roundedcubexz(8, 6, 10, 1);

// hdmi connector cut
translate([32-15.6/2, 62-2.5-5, 16-4])
	roundedcubexz(15.6, 6, 10, 1);

// audio connector cut
translate([53.5, 62-2.5-5, 16])
	rotate([-90, 0, 0])
	cylinder(d=7, h=6);

// ethernet and usb cut
translate([85-2, 62-52-2.25-6, 2.3])
	roundedcubeyz(6, 34, 20, 1);
translate([85-2, 62-52-2.25-6, 5])
	roundedcubeyz(6, 52, 20, 1);
}
}

module Case()
{
translate([0, 0, 7])
	RaspberryPiBplus();

CaseBottom();

translate([0, 56+6-6, 16+(7+1.6+3)+0.1])
	rotate([180, 0, 0])
	CaseTop();
}

/*output="cut";*/
output = "print";

/*
projection(cut = true)
	translate([0,0,-10])
	rotate([0,90,0])
		Case();
*/

if(output=="print")
{
	CaseBottom();
	translate([0, -70, 0])
		CaseTop();
}
else if(output=="cut")
{
	difference()
	{
		Case();
		translate([61.5, -10, 0])
			cube([100, 100, 100]);
	}
}
