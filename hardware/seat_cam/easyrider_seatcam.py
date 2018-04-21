import detector
import categorizer

print ("Free Rider Seat Cam started!")

detector.init()

print(detector.getBalancedOccupancy())
