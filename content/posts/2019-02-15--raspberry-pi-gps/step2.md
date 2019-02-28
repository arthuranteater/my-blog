---
title: How To Build Raspberry Pi - GPS Device

---

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