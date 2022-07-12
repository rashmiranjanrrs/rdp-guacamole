STEP 1:
docker pull scottyhardy/docker-remote-desktop

docker run --detach \
    --rm \
    --hostname="$(hostname)" \
    --publish="3389:3389/tcp" \
    --name="remote-desktop" \
    scottyhardy/docker-remote-desktop:latest

STEP 2: 
docker pull guacamole/guacd

docker run --name some-guacd -d -p 4822:4822 guacamole/guacd

STEP 3:
clone this repository
git clone <repo.git>

docker build . -t rrs/node-web-app

docker run -p 49160:8080 -d rrs/node-web-app:latest

STEP 4: 
http://localhost:49160/connect





# Test

This project is used to build demo as a proof of concept for the PSM service

## Description

Build a set of services to be able to connect a local RDP session using a web browser

### Components

- [ ] Create a docker container service running [RDP server](https://hub.docker.com/r/scottyhardy/docker-remote-desktop)
- [ ] Create a docker container service running [guacd server](https://hub.docker.com/r/guacamole/guacd)
- [ ] Create a express JS app server with route to access RDP session
  - [ ] On client side route serve html with a display using [guacamole-common-js](https://guacamole.apache.org/doc/gug/guacamole-common-js.html)
  - [ ] On server side use [guacamole-lite](https://www.npmjs.com/package/guacamole-lite) to connect with guac server

## Authors

Contact @immkg for any details and queries


# What is the Remote Desktop Protocol (RDP)?
The Remote Desktop Protocol (RDP) is a protocol, or technical standard, for using a desktop computer remotely. Remote desktop software can use several different protocols, including RDP, Independent Computing Architecture (ICA), and virtual network computing (VNC), but RDP is the most commonly used protocol. RDP was initially released by Microsoft and is available for most Windows operating systems, but it can be used with Mac operating systems too.

# What is guacd?
guacd is the native server-side proxy used by the Apache Guacamole web application. If you wish to deploy Guacamole, or an application using the Guacamole core APIs, you will need a copy of guacd running.

# guacamole-common-js
The Guacamole project provides a JavaScript API for interfacing with other components that conform to the design of Guacamole, such as projects using libguac or guacamole-common. This API is called guacamole-common-js.

guacamole-common-js provides a JavaScript implementation of a Guacamole client, as well as tunneling mechanisms for getting protocol data out of JavaScript and into guacd or the server side of a web application.

For convenience, it also provides mouse and keyboard abstraction objects that translate JavaScript mouse, touch, and keyboard events into consistent data that Guacamole can more easily digest. The extendable on-screen keyboard that was developed for the Guacamole web application is also included.

# guacamole-lite is a NodeJS replacement for guacamole-client (server-side Java servlet). Guacamole is a RDP/VNC client for HTML5 browsers.

This is the best solution for those ones who need to integrate Guacamole into an existing projects with their own users and connections management (or without them at all).

# Connecting with an RDP client:-
All Windows desktops and servers come with Remote Desktop pre-installed and macOS users can download the Microsoft Remote Desktop application for free from the App Store. For Linux users, I'd suggest using the Remmina Remote Desktop client.

For the hostname, use localhost if the container is hosted on the same machine you're running your Remote Desktop client on and for remote connections just use the name or IP address of the machine you are connecting to. NOTE: To connect to a remote machine, it will require TCP port 3389 to be exposed through the firewall.

https://hub.docker.com/r/scottyhardy/docker-remote-desktop
https://hub.docker.com/r/guacamole/guacd
https://registry.hub.docker.com/u/guacamole
https://guacamole.apache.org/doc/gug/guacamole-common-js.html
https://www.npmjs.com/package/guacamole-lite
https://remmina.org/how-to-install-remmina/
https://stackoverflow.com/questions/42385977/accessing-a-docker-container-from-another-container