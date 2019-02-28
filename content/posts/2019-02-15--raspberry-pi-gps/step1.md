---
title: How To Build Raspberry Pi - GPS Device

---

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
