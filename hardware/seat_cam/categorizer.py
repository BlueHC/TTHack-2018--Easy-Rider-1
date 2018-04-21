SCORE_FACTOR = 20
STADNING_MANIPULATOR = 0.1

def categorize(freeSeats, allSeatsInVP, allStandingsInVP):
    #[type, score, x, y]
    allSeatsInVP = float(allSeatsInVP)
    allStandingsInVP = float(allStandingsInVP)
    result = 0 #Begin with completly filled wagon
    balFreeSeats = 0
    balFreeStandings = 0
    for seat in freeSeats:
        if(seat[0] == "seat"):
            balFreeSeats += (1 - SCORE_FACTOR/float(seat[1]))
        if(seat[0] == "standing"):
            balFreeStandings += (1 - SCORE_FACTOR/float(seat[1]))

    #In case of failure 
    if(balFreeSeats > allSeatsInVP):
        balFreeSeats = allSeatsInVP
    if(balFreeStandings > allStandingsInVP):
        balFreeStandings = allStandingsInVP

    ratio_seat_standing = 0
    manipualtor = (allStandingsInVP + allSeatsInVP) * STADNING_MANIPULATOR
    if(allSeatsInVP != 0):
        result_seats = balFreeSeats / allSeatsInVP
        ratio_seat_standing = (allStandingsInVP - manipualtor / allSeatsInVP + manipualtor) / (allStandingsInVP + allSeatsInVP)
    else:
        result_seats = 0
    if(allStandingsInVP != 0):
        result_standings = balFreeStandings / allStandingsInVP
    else:
        result_standings = 0
    
    result = (1 - ratio_seat_standing) * result_seats + ratio_seat_standing * result_standings 
    print("RATIO: " + str(ratio_seat_standing))
    print("SEATS: " + str(result_seats))
    print("STANDINGS: " + str(result_standings))
    return result
    