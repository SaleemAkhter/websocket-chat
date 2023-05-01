const WebSocket = require('ws');
const Users = require('./lib/Users');
class Sparko {
  constructor(serverUrl, userPref) {
    this.socketServer = null;
    this.serverUrl = serverUrl;
    this.userPref = userPref;
    this.httpUrl = '192.168.18.49:8080'
    this.users = new Users(this); // Pass the Sparko instance to the Users constructor
  }

  async connect() {
    return new Promise((resolve, reject) => {
      this.socketServer = new WebSocket(this.serverUrl);
      this.socketServer.on('open', () => {
        this.socketServer.send(JSON.stringify(this.userPref));
        resolve();
      });
      this.socketServer.on('error', (error) => {
        reject(new Error(`Unable to connect to WebSocket server at ${this.serverUrl}: ${error.message}`));
      });
    });
  }

  sendMessage(message) {
    if (this.socketServer.readyState === WebSocket.OPEN) {
      this.socketServer.send(message);
    } else {
      throw new Error('WebSocket connection is not open');
    }
  }

  disconnect() {
    if (this.socketServer.readyState === WebSocket.OPEN) {
      this.socketServer.close();
      console.log('Connection closed');
    } else {
      console.warn('Connection is already closed');
    }
  }

  handleMessage(callback) {
    if (this.socketServer.readyState === WebSocket.OPEN) {
      this.socketServer.on('message', (message) => {
        callback(message);
      });
    } else {
      console.warn('Cannot listen for messages: WebSocket connection is not open');
    }
  }


}

module.exports = Sparko;
