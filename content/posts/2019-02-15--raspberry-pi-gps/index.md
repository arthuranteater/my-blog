---
title: How To Build Raspberry Pi - GPS Device
subTitle: Step-by-step instructions for building a GPS module and sending the data to a server
hashtag: gps pi python serialport
category: "raspberry-pi"
time: 1 hour
castImage: zero
cover: circ-garf.png
checklist: Raspberry Pi 3 B+, NEO 6M GPS module, 4 Female-to-Male wires, 4 Female headers, Sautering iron, Solder wire, External moniter with HDMI cord + lightening port adpater (for Mac users) + keyboard and mouse OR Pi wireless dongle OR ethernet cable + USB adapter (for Mac users), Battery (not necessary for testing), Wifi (not necessary for testing), Patience (last but NOT LEAST!)
checklistLinks:
steps:
stepsLinks:

---


Your mission (should you choose to accept it!): 

Create a full CRUD (Create, Read, Update, Delete) application that solves a problem using at least one new technology in 10 days.

I like to walk Garf, my sister's dog. The problem is he can get away real quick. What if he gets lost? Enter **Garf**, the pet tracker! With a GPS collar and a mobile app, I'll always be able to keep an eye on him!

This step-by-step guide is designed to be an easy-to-follow, one-stop-shop for setup, questions, and troubleshooting for sending GPS data from a Raspberry Pi.

picture of pi


What's a Raspberry Pi?

It's a small headless (without screen) computer created by a non-profit, The Raspberry Pi Foundation, to promote teaching of basic computer science. The Pi was designed to be affordable for schools in all countries. The latest model, the Pi 3 B+, is currently priced at $40. Due to the Pi's low cost, size, versatility, and ease-of-use, it's been heavily utilized in many IoT and robotics applications.

Why the name Raspberry Pi?

From Eben Upton, the founder of the Pi Foundation...

The Raspberry is a reference to a fruit naming tradition in microcomputers. (think Tangerine, Acorn, Apricot, Blackberry, Apple) The Pi is a reference to Python, originally the only coding language to be used on the device.

***

<h1 style="font-weight: bold">Build Checklist</h1>

***
##Essential

1) <a href="https://www.amazon.com/CanaKit-Raspberry-Ultimate-Starter-Clear/dp/B07BC567TW/ref=sr_1_6?s=electronics&ie=UTF8&qid=1550094539&sr=1-6&keywords=canakit+raspberry+pi+3" target="_blank">Raspberry Pi 3 B+</a>
2) Monitor + HDMI + <a href="https://www.amazon.com/AmazonBasics-Mini-DisplayPort-HDMI-Cable/dp/B0134V29UA/ref=sr_1_3?s=electronics&ie=UTF8&qid=1550098951&sr=1-3&keywords=hdmi+to+lightning+port" target="_blank">lightening port adapter</a> (Mac)  
**or** ethernet + <a href="https://www.amazon.com/AmazonBasics-1000-Gigabit-Ethernet-Adapter/dp/B00M77HMU0/ref=sr_1_3?s=electronics&ie=UTF8&qid=1550099115&sr=1-3&keywords=ethernet+to+usb+adapter" target="_blank">USB adapter</a> (Mac) +
<a href="https://www.amazon.com/UGREEN-Reader-Memory-Windows-Simultaneously/dp/B01EFPX9XA/ref=pd_lpo_vtph_147_tr_t_2?_encoding=UTF8&psc=1&refRID=G3BY2234F6DP9VJCRZWM">SD Card Reader</a>  
**or** USB Drive > 8 GB
3) <a href="https://www.amazon.com/DIYmall-AeroQuad-Antenna-Arduino-Aircraft/dp/B01H5FNA4K/ref=sr_1_1_sspa?s=electronics&ie=UTF8&qid=1550097557&sr=1-1-spons&keywords=neo6m+gps+module&psc=1" target="_blank">NEO 6M GPS module</a>
4) <a href="https://www.amazon.com/Elegoo-EL-CP-004-Multicolored-Breadboard-arduino/dp/B01EV70C78/ref=sr_1_2_sspa?s=electronics&ie=UTF8&qid=1550097630&sr=1-2-spons&keywords=female+to+male+jumper+wires&psc=1" target="_blank">4 Female-to-Male wires</a>*
5) **Patience!**

*included with **some** CanaKits

##Helpful

1) Wifi
2) <a href="https://www.amazon.com/dp/B0137ITW46/ref=psdc_10112773011_t1_B0137IPVY6" target="_blank">Battery</a>  
**or** <a href="https://www.amazon.com/dp/B0137ITW46/ref=psdc_10112773011_t1_B0137IPVY6" target="_blank">portable battery + MicroUSB</a>
3) <a href="https://www.amazon.com/VAPKER-2-54mm-Stackable-Straight-Arduino/dp/B01HHR77V8/ref=sr_1_4?s=electronics&ie=UTF8&qid=1550097290&sr=1-4&keywords=female+header" target="_blank">4 Female headers</a>
4) <a href="https://www.amazon.com/ANBES-Soldering-Iron-Kit-Electronics/dp/B06XZ31W3M/ref=sr_1_3?ie=UTF8&qid=1550097778&sr=8-3&keywords=sautering+iron" target="_blank">Sautering iron</a>
5) <a href="https://www.amazon.com/dp/B07J55HD6J/ref=sspa_dk_detail_0?psc=1&pd_rd_i=B07J55HD6J&pd_rd_w=m3pql&pf_rd_p=10ebaf99-73de-4f5d-a994-e7f5fc52f86f&pd_rd_wg=2MT0g&pf_rd_r=FY6RAJHMG98ZTYNP9866&pd_rd_r=4cd82a47-2fe2-11e9-891e-bb622be878cb" target="_blank">Solder wire</a>

***

<h1 style="font-weight: bold">Build Steps</h1>

***

<a href="#1"><h3>1 - Install OS</h3></a>
<a href="#2"><h3>2 - Connect to Pi</h3></a>
<a href="#3"><h3>3 - Connect GPS</h3></a>
<a href="#4"><h3>4 - Parse Data</h3></a>

***

<h1 id="1" style="font-weight: bold">Step 1 - Install OS</h1>

***

```
pi@raspberrypi:~ $ cat /etc/os-release
PRETTY_NAME="Raspbian GNU/Linux 9 (stretch)"
NAME="Raspbian GNU/Linux"
VERSION_ID="9"
VERSION="9 (stretch)"
ID=raspbian
ID_LIKE=debian
HOME_URL="http://www.raspbian.org/"
SUPPORT_URL="http://www.raspbian.org/RaspbianForums"
BUG_REPORT_URL="http://www.raspbian.org/RaspbianBugs"
```

After hastily tearing apart the box like a kid on Christmas, make sure to protect the Pi by sticking on the cooling waffles and snapping on the plastic case!


**If you have access to a monitor with HDMI connection, an SD Card preloaded with NOOBS (New Out Of Box Software) is the easiest way to install the OS. NOOBS comes with Canakits or it can purchased separately.** (Option A)

**If you don't have a monitor or want to install the OS headless, a blank SD Card or blank USB is preferred.** (Option C)

**But you can manually configure NOOBS to be installed headless.** (Option B)


## Option A: NOOBS SD Card and a monitor

Insert the SD Card into the bottom of the Pi and plug into power source! Plug in external moniter(HDMI port), keyboard(USB port), and mouse.  Select the Raspbian operating system from the list (Raspbian, LibreELEC, OSMC, Recalbox, Lakka, RISC OS, Screenly OSE, Windows 10 IoT Core, TLXOS). That was easy!

## Option B: NOOBS SD Card and no monitor 

Insert NOOBS SD Card into SD Card Reader into computer.

We are going to go into the /images to delete all the compressed os image files except for **Raspbian**. Raspbian will be installed by default on boot without seeking user input. Ok let's do it...

 In the OS folder on the SD card with NOOBS, delete all folders except Raspbian (folders Arch, RaspBMC, Pidora,  OpenELEC, RISC_OS, and data_partition for NOOBS 1.3.7. And only Data_Partition for NOOBS 1.3.10). (**depending on NOOBS version**)


Edit file recovery.cmdline (in SD card root folder) to append silentinstall to the arguments list.

After (**depending on NOOBS version**):
```

 runinstaller quiet vt.cur_default=1 coherent_pool=6M elevator=deadline silentinstall
```

Now the Pi should auto install Raspian OS, but wait!

**SSH connections are blocked by default for security reasons!**

In order to change the settings we have to create a file titled ssh.

Search for /boot/ on SD Card...

Create 2 files:

```
touch /Volumes/boot/ssh
touch /Volumes/boot/wpa_supplicant.conf
```
or could look like this...

```
cd /media/{your-username}/boot
touch ssh
```

**If you do not have a ethernet cord + USB adapter, you will need to add the wpa config file or edit the existing one to automagically connect your Pi to your wireless network on boot**

```
touch wpa_supplicant.conf
nano wpa_supplicant.conf
```

Add your network id to ssid and your network password to psk to the code block below and add to wpa_supplicant.config.

```
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1
country=US

network={
    ssid="myssid"
    scan_ssid=1
    psk="mypass"
    key_mgmt=WPA-PSK
}
```

To exit nano, type Ctrl + X, Y to save.

Now you are finally ready to eat some pie! Alright eject SD Card and insert into Pi. Install could take up to 30 minutes by some accounts. Maybe grab lunch, pie sounds good!

If you see a green button blinking on the Pi next to the red button, you should be connected to the internet. Hallelujah!

## Option C: Blank SD Card or USB Drive

Download the image from the Raspberry Pi website <a href="https://www.raspberrypi.org/downloads/" target="_blank">Downloads page</a>.

Download <a href="https://etcher.io/" target="_blank">Etcher</a> and install it.

**If you're not using Etcher, you'll need a special unzipper like <a href="http://unarchiver.c3.cx/unarchiver" target="_blank">The Unarchiver</a> (Mac) to extract the image file becasue the file is over 4GB in ZIPG4 format.**

Write the OS image zip to an SD Card or USB with Etcher:

-   Connect an SD card reader with SD card or insert USB.
-   Open Etcher and select the Raspberry Pi `.img` or `.zip` file.
-   Select the SD card or USB and click 'Flash!'
-   Eject SD card or USB and reinsert into computer
-   Follow the earlier instructions to enable SSH

**SSH connections are blocked by default for security reasons!**

**Please find the earlier instructions about adding ssh file to /boot/**

**If you do not have a ethernet cord + USB adapter, you will need to add the wpa config file or edit the existing one to automagically connect your Pi to your wireless network on boot**

**Please find the earlier instructions on how to add a wpa config file.**

***

<h1 id="2" style="font-weight: bold">Step 2 - Connect to Pi</h1>

***

## Option A: Ethernet

Connect Pi to ethernet cord, ethernet to USB adapter, and adapter to a Mac USB port.

Change the internet sharing settings on your Mac to allow sharing with Pi.

picture of share screen

Follow wireless instructions below.

## Option B: Wireless

Create an SSH (Secure Shell).

In terminal:

```
ssh pi@raspberrypi.local
```
**If you renamed the hostname of your Pi, type ssh yourusername@yournewhostname.local**

The default password is raspberry to connect the device.

If logged in, jump to Raspi-Config.

***

###**Troubleshooting SSH**

If you can't create SSH, try to ping the Pi. This should send back to you the Pi's IP address.

```
ping raspberrypi.local
```
**If you renamed the hostname of your Pi, type ping yourusername@yournewhostname.local**

If you can't ping the Pi, you might have a connection problem or the wrong hostname.

The easiest way to check is by logging into your router. 

Get router IP.
```
netstat -rn |grep default
```
Copy and paste the router IP starting with 192. into Chrome. Go to Modem Status -> Device Table. (varies depending on router setup) The device table shows all connected devices and their IP addresses. Find Pi and copy and paste the IP into the terminal.
```
ssh pi@192.168.X.X
```
You might a receive this warning.
```
The authenticity of host '192.168.X.X (192.168.X.X)' can't be established.
ECDSA key fingerprint is SHA256:Pr0qOIDe2E+oPqXUqBHoCqg8bHwYuSAyC3tW6MICCYM.
Are you sure you want to continue connecting (yes/no)?
```
Type yes, press Enter.

If you do not see your Pi in the device table, see Step 1 - Installing OS to add ssh file and wpa config file to /boot/ or see Option A: Ethernet.

If you can't login to router, you can use nmap.

The nmap command (Network Mapper) is a free and open-source tool for network discovery, available for Linux, macOS, and Windows.
```
apt-get install nmap
hostname -I //returns your IP (192.168.X.X)
nmap -sn 192.168.X.X/24
```
Copy Pi's IP and paste into:
```
ssh pi@192.168.X.X
```

If you want to fancy...
```
(sudo nmap -p 22 --open -sV 192.168.0.0/24 | grep 192 | awk '{print $NF}') && ssh pi@$IP
```

We are in! Sweet baby Jesus!

***

###**Raspi-Config**

As long as SSH is enabled on the Pi, someone else could access your Pi. It's not required to change the default password, but each time you start the Pi with the default password you will receive a warning.

Change the password.
```
passwd
```

Pi 3 comes with Bluetooth which by default is setup on the serial port which we'll be connecting to. If there's a way to connect the GPS without disabling the bluetooth, please advise me.

To verify SSH, Serial Port settings
```
sudo raspi-config
```
Make sure SSH, VNC, SPI are enabled. Switch the serial console off, but keep the serial port on.

picture of interface settings

To get the lastest distribution:
```
sudo apt-get update
sudo apt-get dist-upgrade
sudo apt-get install -y
sudo reboot
```
***

<h1 id="3" style="font-weight: bold">Step 3 - Connect GPS</h1>

***


Verify the cmdline.txt file.
```
cat /boot/cmdline.txt
```
There should be no console=serial0

The serial0 is the serial port we need to use for the GPS.

Now we need to modify the /boot/config.txt to enable UART and disable the bluetooth.
```
nano /boot/config.txt
```
Paste the following into the bottom:
```
dtoverlay=pi3-disable-bt
core_freq=250
enable_uart=1
force_turbo=1
```
Ctrl+X to exit, press Y to save
```
sudo reboot
```

The final step is enable the getty service for ttyAMA0 or serial0. I'm not sure the reason why this must be done. I want my script to be the only thing accessing the port, but without enabling the getty my script doesn't work.

First let's physically connect the device.

Photo of pin chart.

**VCC to Pin 1, which is 3.3v**

**TX to Pin 10, which is RX (GPIO15)**

**RX to Pin 8, which is TX (GPIO14)**

**Gnd to Pin 6, which is Gnd**

The red light on the GPS turns on with power, and the green light blinks when receiving a satellite signal.

Cat port ttyAMA0 or serial0.
```
sudo cat /dev/serial0
```
If nothing happens, press control + C to exit.

Enable the getty-service.
```
sudo systemctl enable serial-getty@ttyAMA0.service
```
Cat either port.
```
sudo cat /dev/ttyAMA0
```
If you get back a response like the picture below, your GPS cannot get a fix. Try placing the Pi next to a window or on a porch.

picture of no signal

You want to get a response like the one below.

picture of good response

Hooray! You are getting good data. What is it?

The console is logging NMEA sentences. What are those?

They all return different data, but we only need either the GPGGA or the GPRMC to get the latitude and the longitude. If we wanted the velocity and directional data, we would use the GPRMC.

<a href="https://www.youtube.com/watch?v=AXwSYz6htsg&index=24&list=LLUS9Tv-pcbyrIL0noeS5Jmg&t=0s" target="_blank">More on NMEA sentences</a>

We'll run a script to parse the data.

***

<h1 id="4" style="font-weight: bold">Step 4 - Parse Data</h1>

***


Let's Git set up!

Enter username.
```
git config --global user.name "YOUR_USERNAME"
git config --global user.name
```
Enter email.
```
git config --global user.email "email@example.com"
git config --global user.email
```
Verify setup.
```
git config --global --list
```
Create directory.
```
mkdir gps
cd gps
touch gps-parser.py
nano gps-parser.py
```
Copy and paste script below into gps-parser.py file.
```python
def decode(coord):
    v = coord.split(".")
    head = v[0]
    tail =  v[1]
    deg = head[0:-2]
    min = head[-2:]
    totalmin = min + "." + tail
    percentdeg = round((float(totalmin) / 60), 6)
    degnum = float(deg)
    totaldeg = degnum + percentdeg
    totaldegstr = str(totaldeg)
    return totaldegstr

def getLoc():

    port = "/dev/serial0"
    ser = serial.Serial(port, baudrate = 9600, timeout=1)
    location = 0

    while location == 0:
        try:
            data = ser.readline()
        except:
            print "no data received"
            return
        for line in data.split('\n'):
            if line.startswith( '$GPGGA' ):
                location = 1
                s = line.split(",")
                if (len(s) < 7):
                    print "no satellite data available"
                    return
                if (s[7] == '0') or (s[7] == ""):
                    print "no satellite data available"
                    return
                time = s[1][0:2] + ":" + s[1][2:4] + ":" + s[1][4:6]
                lat = decode(s[2])
                dirLat = s[3]
                global negLat
                negLat = lat
                if dirLat == "S":
                    negLat = "-" + lat
                lon = decode(s[4])
                dirLon = s[5]
                global negLon
                negLon = lon
                if dirLon == "W":
                    negLon = "-" + lon
                sat = s[7]
                try:
                    print "Time(UTC):%s - Latitude:%s(%s) - Longitude:%s(%s) - (%s)" %(time, negLat, dirLat, negLon, dirLon, sat)
                    return
                except:
                    print "no lat or long"
                    return

def main():

    name = ""
    key = ""

    print 'Initiating...'

    baseURL = 'https://api.thingspeak.com/update?api_key=%s' % key

    while True:
        time.sleep(int(1))
        getLoc()
        try:
            f = urllib2.urlopen(baseURL +
                                    "&field1=%s&field2=%s&field3=%s" % (name, negLat, negLon))
            print "- SENT -"
            f.close()
        except:
            print "- FAILED TO SEND -"



#Call main
if __name__ == '__main__':
    main()
```
###**Behind the script** 

I created an infinite loop using while True because I wanted the script to run forever. I made the function getLoc() to run a loop to keep checking the a serial port for valid data. We can control the timing and flow better with a functional component like this. I added a buffer with time.sleep() before making the call. Timing can be important when receiving a live stream of data. The more you can do to control the timing and flow of data the better. Inside getLoc() if we find that data is being received using ser.readline(), we are searching the GPGGA line for the latitude and longitude. If there are coordinates, they will be sent to decode() to be converted into a more useful format. We will log the result to the console and the number of satellites pinged. We'll try to send the new coordinates to our server and log the result.

As you can see from the script, you are missing a key and name for your api call. You can go to <a href="https://thingspeak.com/" target="_blank">ThingSpeak</a> to create a profile. This is a limited free api where you can send your data to. Follow the instructions and create a channel. Post your name and the appropriate api key in the script, and the information should send to your channel. You can send your data anywhere from here. There are multiple request libraries for Python or you could write your own script in whatever lanaguage you choose to parse and/or send the data. The only limiting factor is the internet connectivity. 4G hotspot device?

Create remote, add, commit, push.
```
git init
git add .
git commit '1st parser'
git remote add origin https://github.com/user/repo.git
git push origin master
```
Run script.
```
sudo python gps-parser.py
```
You return should look like below.


HIGH FIVE! You've accomplished the impossible!

If not check for indentation errors first.

An easier way to write code is through the Pi's GUI or a Web IDE. 

Or you could write the script in on your computer, push to git, then git pull. This seems a bit of a hassle.

I highly recommend VNC Viewer to access the Pi's GUI. Make sure you set up a profile on VNC Viewer to cloud connect from any network. VNC works on mobile devices too!
```
sudo apt-get update
sudo apt-get install realvnc-vnc-server realvnc-vnc-viewer
```
From raspberrypi.org:

You are entitled to use RealVNC's cloud service for free, provided that remote access is for educational or non-commercial purposes only.

Cloud connections are convenient and encrypted end-to-end. They are highly recommended for connecting to your Raspberry Pi over the internet. There's no firewall or router reconfiguration, and you don't need to know the IP address of your Raspberry Pi, or provide a static one.

-   <a href="https://www.realvnc.com/raspberrypi/#sign-up" target="_blank">Sign up for a RealVNC account</a>.

-   On your Raspberry Pi, sign in to VNC Server using your new RealVNC account credentials.

-   On the device you'll use to take control, download VNC Viewer. You must use the <a href="https://www.realvnc.com/download/viewer/" target="_blank">compatible app from RealVNC</a>.

-   Sign in to VNC Viewer using the same RealVNC account credentials, and then either tap or click to connect to your Raspberry Pi.

With VNC Viewer, you can run <a href="https://realpython.com/python-thonny/Thonny" target="_blank">Thonny</a>, a Python IDE.

Open Thonny.
```
thonny
```
There are many IDE options for Pi. <a href="https://www.raspberrypi.org/blog/mu-python-ide/" target="_blank">Mu</a>, a Python IDE released in 2018, looks cool! VS Code and Atom have 3rd party builds for Pi. I couldn't get the "headmelted" version of VS Code to show more than a blank screen. Geany IDE supports tons of programming languages like C, C++, C#, Java, HTML, PHP, Python, Perl, Ruby, Erlang and even LaTeX. 

I like <a href="https://learn.adafruit.com/webide/overview" target="_blank">ADAfruit's Web IDE</a>. It's easy to install, runs headless in any Chrome or Firefox browser connected to the same network, and has dark theme sytnax highlighting for Python, Ruby, and Javascritpt.

Happy Coding!






