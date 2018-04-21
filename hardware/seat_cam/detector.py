import sys
sys.path.insert(0, 'pixy_build/libpixyusb_swig/')

import time
import math
from pixy import *
from ctypes import *

import categorizer

class Blocks (Structure):
  _fields_ = [ ("type", c_uint),
               ("signature", c_uint),
               ("x", c_uint),
               ("y", c_uint),
               ("width", c_uint),
               ("height", c_uint),
               ("angle", c_uint) ]

def init():
    pixy_init()
    time.sleep(0.5)

def getBalancedOccupancy():
    balancedRating = 0
    countRating = 0
    for i in range(0, 10):
        rating = categorizer.categorize(getCurrentOccupancy(), 4, 2)
        #PoC
        if(rating != 0):
            countRating += 1
            balancedRating += rating
    return countRating and (balancedRating / countRating) or 0

def getCurrentOccupancy():
    global freeSeats 
    freeSeats = []
    blocks = BlockArray(100)
    for i in range(0, 150000):
	count = pixy_get_blocks(100, blocks)
        if(count>0):
            for index in range (0, count):
                print '[BLOCK_TYPE=%d ANGLE=%d SIG=%d X=%3d Y=%3d WIDTH=%3d HEIGHT=%3d]' % (blocks[index].type, blocks[index].angle, blocks[index].signature, blocks[index].x, blocks[index].y, blocks[index].width, blocks[index].height)
    		addBlock(blocks[index].x, blocks[index].y, blocks[index].angle)
	return freeSeats

def addBlock(x, y, angle):
    #[type, score, x, y]
    seat_type = (angle < 90) and "standing" or "seat"
    flag = True
    for entry in freeSeats:
        if(getDistance(x, y, entry[2], entry[3]) < 15):
            entry[3] = entry[3] + 100
	    flag = False
    if(flag):
    	freeSeats.append([seat_type, 300, x, y])

def getDistance(x, y, u, v):
    return math.sqrt((x-u)**2 + (y-v)**2)
