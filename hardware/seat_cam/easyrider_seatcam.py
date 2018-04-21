import sys
sys.path.insert(0, 'pixy_build/libpixyusb_swig/')

import time
from pixy import *
from ctypes import *

# Pixy Python SWIG get blocks example #

print ("Pixy Python SWIG Example -- Get Blocks")

# Initialize Pixy Interpreter thread #
pixy_init()
time.sleep(0.5)

class Blocks (Structure):
  _fields_ = [ ("type", c_uint),
               ("signature", c_uint),
               ("x", c_uint),
               ("y", c_uint),
               ("width", c_uint),
               ("height", c_uint),
               ("angle", c_uint) ]


while(1):
	if(pixy_blocks_are_new() == 1):
		blocks = BlockArray(100)
		count = pixy_get_blocks(100, blocks)
		print 'Found %d blocks' % count
		if count > 0:
			for index in range (0, count):
    				print '[BLOCK_TYPE=%d ANGLE=%d SIG=%d X=%3d Y=%3d WIDTH=%3d HEIGHT=%3d]' % (blocks[index].type, blocks[index].angle, blocks[index].signature, blocks[index].x, blocks[index].y, blocks[index].width, blocks[index].height)

