# dacham-nombox-server
Bridges functionality of web resources and dacham-nombox clients using redis pub/sub.

## Installation and Setup
```
git clone https://github.com/laddspencer/dacham-nombox-server.git
cd dacham-nombox-server
npm install
```

### modules.json
Copy the example modules file to `modules.json`:
```
cp modules_example.json modules.json
```
Edit the new file to configure plugin modules or add your own. Two modules,
`twitch-redis-bridge` and `streamlabs-redis-bridge`, are included by default.
If these are to be employed, the path to their config files (the args element
after "-F") must be set.

When adding your own modules, `name` does not have to refer to a package in
`node_modules`; it can be a path to any Node.js file or package directory.

### Configuration Files
Each config file pointed to by `modules.json` should be updated to specify
the path to the module's respective credentials file. There are existing
configuration and credential files in the `config` directory.

