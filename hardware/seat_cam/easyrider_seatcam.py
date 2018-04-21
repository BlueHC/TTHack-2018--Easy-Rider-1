import detector

print ("Free Rider Seat Cam started!")

detector.init()

for i in range(0, 10):
  print(detector.getCurrentOccupancy())