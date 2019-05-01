# dacham-nombox-server
Bridges functionality of web resources and dacham-nombox clients using redis pub/sub.

## Installation and Setup
```
git clone https://github.com/laddspencer/dacham-nombox-server.git
cd dacham-nombox-server
npm install
```

### modules.json
Copy the example modules file to *modules.json*:
```
cp modules_example.json modules.json
```
Edit the new file to configure plugin modules or add your own. Two modules,
*twitch-redis-bridge* and *streamlabs-redis-bridge*, are included by default.
If these are to be employed, the path to their config files (the *args* element
after **-F**) must be set.

When adding your own modules, *name* does not have to refer to a package in
*node_modules*; it can be a path to any Node.js file or package directory.

### Configuration Files
Each config file pointed to by *modules.json* should be updated to specify
the path to the module's respective credentials file. There are existing
configuration and credential files in the *config* directory.


## Windows 10 Linux Subsystem

### Node.js notes
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

### Redis notes
Windows firewall is likely blocking access to the default redis port (6379).
If that is the case, you will have to add a rule to allow access to this port.
