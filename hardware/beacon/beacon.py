from subprocess import call

call(["sudo hciconfig hci0 up"], shell=True)
call(["sudo hciconfig hci0 leadv 3"], shell=True)

def make_beacon():
        call(["sudo hcitool -i hci0 cmd 0x08 0x0008 1d 02 01 06 03 03 aa fe 15 16 aa fe 10 00 02 65 61 73 79 72 69 64 65 72 65 72 6e 61 30 30 00 00"], shell=True)

make_beacon()
