import time

import detector
import categorizer

def start_seatcam():
    print("#############################")
    print("Begin sampling images")
    print("#############################")
    print("")

    detector.init()
    rating = detector.getBalancedOccupancy()

    print("")
    print("#############################")
    print("#############################")
    print("")
    print ("Occupancy rating:")
    print(rating)
    print("")
    print("#############################")
    print("#############################")
    print("")

while(True):
    start_seatcam()
    time.sleep(30)
