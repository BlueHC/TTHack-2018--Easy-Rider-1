from pynput import keyboard

stations = {'1' : "Bf. Altona", '2' : "Gerichtstraße", '3' : "Max-Brauer-Allee",
            '4' : "Sternbrücke", '5' : "Schulterblatt", '6' : "Sternschanze",
            '7' : "Schlump", '8' : "Bundesstraße"}

def on_press(keyCode):
    try:
        key = keyCode.char
        try:
            file = open("station.txt", "w")
            file.write(stations[key])
            file.close()
        except KeyError:
            return
    except AttributeError:
        return

# Collect events until released
with keyboard.Listener(on_press=on_press) as listener:
    listener.join()
