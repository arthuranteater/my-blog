---
title: How To Build Raspberry Pi - GPS Device
subTitle: Step-by-step instructions for building a GPS module and sending the data to a server
hashtag: gps pi python mongodb serialport
category: "raspberry-pi"
castImage: zero
cover: circ-garf.png
checklist: Raspberry Pi 3 B+, NEO 6M GPS module, 4 Female-to-Male wires, 4 Female headers, Sautering iron, Solder wire, External moniter with HDMI cord + lightening port adpater (for Mac users) + keyboard and mouse OR Pi wireless dongle OR ethernet cable + USB adapter (for Mac users), Battery (not necessary for testing), Wifi (not necessary for testing), Patience (last but NOT LEAST!)
checklistLinks:
steps:
stepsLinks:

---



The project was to create a new full CRUD (Create, Read, Update, Delete) application that solved a problem with at least one new technology in 10 days. My idea was to create a mobile app where people could track their pets via GPS. Enter Gar, the GPS pet tracker! I really enjoyed the project, I was unable to find a great step-by-step guide, so I spent most of my time googling. I'm writing this in hopes that others can tackle this project with ease.

Checklist

1) <a href="https://www.amazon.com/CanaKit-Raspberry-Ultimate-Starter-Clear/dp/B07BC567TW/ref=sr_1_6?s=electronics&ie=UTF8&qid=1550094539&sr=1-6&keywords=canakit+raspberry+pi+3" target="_blank">Raspberry Pi 3 B+</a>
2) <a href="https://www.amazon.com/DIYmall-AeroQuad-Antenna-Arduino-Aircraft/dp/B01H5FNA4K/ref=sr_1_1_sspa?s=electronics&ie=UTF8&qid=1550097557&sr=1-1-spons&keywords=neo6m+gps+module&psc=1" target="_blank">NEO 6M GPS module</a>
3) <a href="https://www.amazon.com/Elegoo-EL-CP-004-Multicolored-Breadboard-arduino/dp/B01EV70C78/ref=sr_1_2_sspa?s=electronics&ie=UTF8&qid=1550097630&sr=1-2-spons&keywords=female+to+male+jumper+wires&psc=1" target="_blank">4 Female-to-Male Wires</a> (Comes with **some** CanaKits)
4) <a href="https://www.amazon.com/VAPKER-2-54mm-Stackable-Straight-Arduino/dp/B01HHR77V8/ref=sr_1_4?s=electronics&ie=UTF8&qid=1550097290&sr=1-4&keywords=female+header" target="_blank">4 Female headers</a> (Doesn't come with CanaKits)
5) <a href="https://www.amazon.com/ANBES-Soldering-Iron-Kit-Electronics/dp/B06XZ31W3M/ref=sr_1_3?ie=UTF8&qid=1550097778&sr=8-3&keywords=sautering+iron" target="_blank">Sautering Iron</a>
6) <a href="https://www.amazon.com/dp/B07J55HD6J/ref=sspa_dk_detail_0?psc=1&pd_rd_i=B07J55HD6J&pd_rd_w=m3pql&pf_rd_p=10ebaf99-73de-4f5d-a994-e7f5fc52f86f&pd_rd_wg=2MT0g&pf_rd_r=FY6RAJHMG98ZTYNP9866&pd_rd_r=4cd82a47-2fe2-11e9-891e-bb622be878cb" target="_blank">Solder wire</a>
7) External moniter with HDMI cord <a href="https://www.amazon.com/AmazonBasics-Mini-DisplayPort-HDMI-Cable/dp/B0134V29UA/ref=sr_1_3?s=electronics&ie=UTF8&qid=1550098951&sr=1-3&keywords=hdmi+to+lightning+port" target="_blank">lightening port adpater</a> (for Mac users) +  Pi (TV or similar display) **OR** <a href="https://www.amazon.com/Official-Raspberry-Pi-WiFi-dongle/dp/B014HTNO52/ref=sr_1_5?s=electronics&ie=UTF8&qid=1550098764&sr=1-5&keywords=raspberry+pi+wireless++dongle" target="_blank">Pi wireless dongle</a> **OR** ethernet cable + <a href="https://www.amazon.com/AmazonBasics-1000-Gigabit-Ethernet-Adapter/dp/B00M77HMU0/ref=sr_1_3?s=electronics&ie=UTF8&qid=1550099115&sr=1-3&keywords=ethernet+to+usb+adapter" target="_blank">USB adapter</a> (for Mac users
8) <a href="https://www.amazon.com/dp/B0137ITW46/ref=psdc_10112773011_t1_B0137IPVY6" target="_blank">Battery</a> (not necessary for testing)
9) Wifi (not necessary for testing)
10) **Patience** (last but NOT LEAST!)

Steps:

1) Setting up the Pi
2) Connecting the GPS module
3) Testing the device
4) Parsing and sending data
5) Testing the server


##1) Setting Up the Pi

So you've got everything? Or so you think? Ok assmeble your to your case. If you purchased with CanaKit, there a ScanDisk with NOOBS uploaded on it. Insert the disk, turn on, and plug in external moniter, keyboard, and mouse.  You'll have your option of what version of Linux to download...RaspbianOS is most folks go with.


```javascript
code
```


> Block quote



### Special Header




