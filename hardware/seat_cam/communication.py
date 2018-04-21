import requests

url = "http://easyriderbackend.eu-gb.mybluemix.net/occupancy"

querystring = {"mediumID":"1"}

headers = {
    'content-type': "application/json",
    'cache-control': "no-cache"
}

def getPayload(val):
    return "{\n\t\"latitude\": 123432.222,\n\t\"longitude\": 42332.21,\n\t\"amount\": " + str(val) + "\n}"

def send_status(occupancy):
    response = requests.request("POST", url, data=getPayload(occupancy), headers=headers, params=querystring)
    print(response.text)
    