#!/usr/bin/nodejs --harmony
//----------------------------------------------------------------

'use strict';
//----------------------------------------------------------------

// process is always available without using require().
//const process = require('process');
const { fork } = require('child_process');
const log = require('fancy-log');
//----------------------------------------------------------------

function spawn(module) {
  if (module.enabled == false) {
    return;
  }
  
  let modulePath = null;
  try {
    modulePath = require.resolve(module.name);
  }
  catch (e) {
    modulePath = module.name;
  }
  
  // Create a process key in the descriptor
  // to stash a reference to our process.
  module.process = fork(modulePath, module.args, module.options);
  module.process.on("exit", onExit.bind(module));
}

function onExit(code, signal) {
  log(`${this.name} died!\ncode: ${code}, signal: ${signal}`);
  
  let callback = (module) => {
    log(`Launching ${module.name} once again.`);
    spawn(module);
  };
  
  setTimeout(callback, 30000, this);
}

function main(args) {
  let modules = require('./modules.json');
  
  modules.forEach((module, index, array) => {
    spawn(module);
  });
}
//----------------------------------------------------------------

main(process.argv);
//----------------------------------------------------------------
