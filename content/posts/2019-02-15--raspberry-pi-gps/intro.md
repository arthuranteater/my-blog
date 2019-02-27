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








