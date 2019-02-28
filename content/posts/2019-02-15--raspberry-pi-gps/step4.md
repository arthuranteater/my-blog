---
title: How To Build Raspberry Pi - GPS Device
---
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
