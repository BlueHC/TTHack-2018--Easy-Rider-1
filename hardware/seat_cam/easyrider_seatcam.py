#import detector
import categorizer

print ("Free Rider Seat Cam started!")

"""
detector.init()

for i in range(0, 10):
  print(detector.getCurrentOccupancy())
"""

rating = categorizer.categorize([], 4, 6)
print(rating)