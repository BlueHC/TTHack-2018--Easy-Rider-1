# Rider-Device Dokumentation

## Liste von Geräten

+ **iBeacons** an den Türen von Bussen und Stationen
+ **Devices mit Internet und BLE** (Raspberry) an den Türen und Stationen
+ **Device mit BLE** (*Rider-Device*) das an die Customer ausgegeben wird (Raspberry im PoC)

## Vorgang des Einloggens

+ User nährt sich Einstieg (Bustür, Zugtür, Ubahn-Stationszugang)
+ Device des Users reagiert auf den Beacon in der Tür und sendet seine **ID**
+ Device in der Tür empfängt die **ID** und führt Request ans Backend aus

## Mögliche Fehlerursachen

+ Customer will schwarz fahren, hat kein Device dabei
	+ Lösungsansatz: Kamera zählt wie viele User tatsächlich einsteigen, bei Unstimmigkeit Alarm 	 