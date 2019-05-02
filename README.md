# dacham-nombox-server
Bridges functionality of web resources and dacham-nombox clients using redis pub/sub.

Well, that doesn't tell you much...what we're really talking about here is taking a variety of resources like Twitch chat messages, Streamlabs donations, or even sensor readings, and combining them into a common stream of data that is more easily accessible than writing your own web-socket code or chat bots. All of the heavy lifting (connection management, authorization, etc) is done with **dacham-nombox-server** plugins, and as the user, you simply have to connect to a Redis server and subscribe to the messages that you're interested in.

## See It In Action
This whole thing was conceived as the backend for a system that would allow me to transparently overlay an instance of [Unity](https://unity.com/) on top of my stream and have it react to interesting events. In this example, the people in my chat are using keywords to activate objects in the scene (fire missiles, run a ban-animation, and trigger "toasty" popups).

<a href="https://www.twitch.tv/laddspencer/clip/SpookySullenCattleDBstyle"
target="_blank"><img src="https://github.com/laddspencer/dacham-nombox-server/blob/master/overlay_madness.jpg"
alt="DacHam-NomBox Unity Overlay" width="100%" border="10" /></a>

## Installation and Setup
```
git clone https://github.com/laddspencer/dacham-nombox-server.git
cd dacham-nombox-server
npm install
```

### modules.json
A sample config file [modules_example.json](https://github.com/laddspencer/dacham-nombox-server/blob/master/modules_example.json) is include in the source tree; use this as the basis for your own by copying or renaming it to *modules.json*.

```
[
  {
    "name": "twitch-redis-bridge",
    "enabled": true,
    "args": ["-F", "/path/to/trb_config.json"],
    "options": {}
  },
  {
    "name": "streamlabs-redis-bridge",
    "enabled": true,
    "args": ["-F", "/path/to/srb_config.json"],
    "options": {}
  }
]
```

Edit the new file to configure plugin modules or add your own. Two modules,
*[twitch-redis-bridge](https://github.com/laddspencer/twitch-redis-bridge)* and *[streamlabs-redis-bridge](https://github.com/laddspencer/streamlabs-redis-bridge)*, are included by default. Their packages are downloaded during the `npm install` step and can be found under **node_modules**.
If these are to be employed, the path to their config files (the *args* element
after **-F**) must be set. Absolute paths work best, but relative paths will work if you're careful about which directory you're running **dacham-nombox-server** from.

When adding your own modules, *name* does not have to refer to a package in
**node_modules**; it can be a path to any Node.js file or package directory (e.g. **./foo/my_script.js**).

### Configuration Files
Each config file pointed to by *modules.json* should be updated to specify
the path to the module's respective credentials file. There are existing
configuration and credential files in the *config* directory.


## Windows 10 Linux Subsystem
This was built and tested on a Linux server (even a [Raspberry Pi](https://www.raspberrypi.org/) will work), but it can be run on Windows 10 using the new [Linux Subsystem](https://docs.microsoft.com/en-us/windows/wsl/install-win10). If this is the route you choose, there are some things to be aware of.

### Node.js
The version of Node.js available through apt-get on Win10 (Linux Subsystem)
is too old, so we build ourselves a copy of the latest LTS release.
From a Linux shell:
```
sudo apt-get install python gcc make g++
curl -O https://nodejs.org/dist/v10.15.3/node-v10.15.3.tar.gz
tar xzvf node-v10.15.3.tar.gz
cd node-v10.15.3/
./configure
make
sudo make install
```

This will install Node.js under */usr/local/bin/node*. I like to add a symlink
under */usr/bin* so all of my scripts can be run without modification. At some
point the executable came to be called *node* instead of *nodejs*; I like to make
the symlink use the old name anyway.
```
cd /usr/bin
sudo ln -s /usr/local/bin/node nodejs
```

### Redis
The Redis server does not run by default on Windows. In my experience, I have to start it manually every time I want to run **dacham-nombox-server** on my Windows machine.

Windows firewall is likely blocking access to the default redis port (6379).
If that is the case, you will have to add a rule to allow access to this port.
