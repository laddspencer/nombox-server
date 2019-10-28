'use strict';
//----------------------------------------------------------------

const redis = require('redis');
//----------------------------------------------------------------

// subHandler parameters:
//   channel - the channel on which the message was received.
//   message - the JSON-formatted message string.

// Sample message:
//
//  {
//  "channel":"#laddspencer","userstate": {
//    "badge-info":null,
//    "badges": {
//      "broadcaster":"1",
//      "premium":"1"
//      },
//    "color":"#2E8B57",
//    "display-name":"LaddSpencer",
//    "emotes":null,"flags":null,
//    "id":"7a46f3f5-e244-463b-bb1b-e22b574e2ec6","mod":false,
//    "room-id":"6137808",
//    "subscriber":false,
//    "tmi-sent-ts":"1572206612784",
//    "turbo":false,
//    "user-id":"6137808",
//    "user-type":null,
//    "emotes-raw":null,
//    "badges-raw":"broadcaster/1,premium/1",
//    "username":"laddspencer",
//    "message-type":"chat"
//   },
//   "message":"test message",
//   "self":false}
//----------------------------------------------------------------

function PubsubFilter(subChannel, pubChannel, subHandler) {
  this.sub_channel = subChannel;
  this.pub_channel = pubChannel;
  this.message_handler = subHandler;
  
  this.sub_client = redis.createClient();
  this.pub_client = redis.createClient();
  
  this.sub_client.on('connect', () => {
    this.sub_client.on('message', handlerWrapper.bind(this));
    this.sub_client.subscribe(this.sub_channel);
  });
  
  console.log(`This pubsub-filter will be publishing on ${pubChannel}`);
}

PubsubFilter.prototype.publish = function(msg) {
  //console.log('this:' + this);
  //console.log('this.pub_client: ' + this.pub_client);
  this.pub_client.publish(this.pub_channel, msg);
}
//----------------------------------------------------------------

function handlerWrapper(channel, message) {
  let msg_obj = JSON.parse(message);
  if (msg_obj.self == true) {
    return;
  }
  
  this.message_handler(channel, msg_obj);
}
//----------------------------------------------------------------

module.exports = PubsubFilter;
//----------------------------------------------------------------

