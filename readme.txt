jRumble v1.1 - http://jackrugile.com/jrumble
by Jack Rugile - http://jackrugile.com
Copyright 2011, Jack Rugile
MIT license - http://www.opensource.org/licenses/mit-license.php

To use this plugin:
	- Include jQuery and this file in your document
	- Apply jRumble with a selector:
		- $('#my-rumble-object').jrumble();

Options/Defaults (defaults in parentheses):
	rangeX: (2) - Set the horizontal rumble range (pixels)
	rangeY: (2) - Set the vertical rumble range (pixels)
	rangeRot: (1) - Set the rotation range (degrees)
	rumbleSpeed: (10) - Set the speed/frequency in milliseconds of the rumble (lower number = faster)
	rumbleEvent: ('hover') - Set the event that triggers the rumble (hover, click, mousedown, constant)
	posX: ('left') - If using jRumble on a fixed or absolute positioned element, choose 'left' or 'right' to match your CSS
	posY: ('top') - If using jRumble on a fixed or absolute positioned element, choose 'top' or 'bottom' to match your CSS