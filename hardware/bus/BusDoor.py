import time
import requests
from datetime import datetime, timedelta
from beacontools import BeaconScanner, EddystoneURLFrame

url = "http://easyriderbackend.eu-gb.mybluemix.net/ride"
rssiLimit = -40
scanTime = 5
disconnectTime = 20

lastSeen = {}
passengers = []



def send(deviceID, station, mediumID, b): #string, string, int (Bus=1)
    #mock
    print("%s, %s, %d, %s" % (deviceID, station, mediumID, b and "Enter" or "Exit"))
    data = {"userID" : deviceID, "station" : station, "longitude" : 12, "latitude" : 12, "mediumID" : mediumID}
    response = requests.post(url, json=data)
    print(response.text)
    

    
def callback(bt_addr, rssi, packet, additional_info):
    #print("<%s, %d> %s %s" % (bt_addr, rssi, packet, additional_info))
    if rssi < rssiLimit:
        return

    namespace = packet.url[7:16]
    if namespace != "easyrider":
        return
    
    passenger = packet.url[16:]
    if passenger not in passengers:
        passengers.append(passenger)
        send(passenger, getCurrentStation(), 1, True)
        
    lastSeen[passenger] = datetime.now()



def getCurrentStation():
    file = open("station.txt", "r")
    station = file.readline()
    return station == "" and "Bf. Altona" or station



def checkPassengers():
    for passenger in passengers:
        checkoutTime = datetime.now() - timedelta(seconds = disconnectTime)
        print("%s, %s" % (lastSeen[passenger], checkoutTime))
        if lastSeen[passenger] < checkoutTime:
            send(passenger, getCurrentStation(), 1, False)
            passengers.remove(passenger)
            del lastSeen[passenger]



while 1:
    scanner = BeaconScanner(callback, packet_filter=EddystoneURLFrame)
    scanner.start()
    time.sleep(scanTime)
    scanner.stop()
    #time.sleep(1)
    checkPassengers()
