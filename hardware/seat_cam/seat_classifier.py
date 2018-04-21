SEAT_X_THRESHOLD = 160
SEAT_Y_THRESHOLD = 120
STANDING_Y_THRESHOLD = 160

def classifySeatType(angleOfColorCode):
    return (angleOfColorCode > 90) and "standing" or "seat"

def classifySeatPosition(x, y):
    if(x < SEAT_X_THRESHOLD):
        if(y < SEAT_Y_THRESHOLD):
            return "FRONTLEFT"
        else:
            return "BACKLEFT"
    else:
         if(y < SEAT_Y_THRESHOLD):
            return "FRONTRIGHT"
         else:
            return "BACKRIGHT"

def classifyStandingPosition(x, y):
    if(y < STANDING_Y_THRESHOLD):
        return "FRONT"
    else:
        return "BACK"


def getClassifiedDebugMessage(angleOfColorCode, x, y):
    seat_type = classifySeatType(angleOfColorCode)
    position = ""
    if(seat_type == "seat"):
        position = classifySeatPosition(x, y)
    if(seat_type == "standing"):
        position = classifyStandingPosition(x, y)
    return ("Found " +  seat_type + " at position " + position).upper()

