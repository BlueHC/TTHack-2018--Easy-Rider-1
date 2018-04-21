import time

import detector
import categorizer
import communication

def start_seatcam():
    print("#############################")
    print("Begin sampling images")
    print("#############################")
    print("")

    #Initiate Pixy
    detector.init()
    #Calculate occupancy
    rating = detector.getBalancedOccupancy()
    #Send Occupancy-Value to backend
    communication.send_status(rating * 100.0)

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
