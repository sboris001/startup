// const { WebSocketServer, OPEN } = require('ws'); // Import WebSocketServer and OPEN from 'ws'

// function peerProxy(httpServer) {
//     const wss = new WebSocketServer({ server: httpServer });

//     // In your peerProxy.js file, modify the WebSocket message handling to process movie ratings
//     wss.on('connection', function(ws) {
//         console.log('Client connected');

//         ws.on('message', function(message) {
//             // Broadcast the received message to all connected clients
//             wss.clients.forEach(function(client) {
//                 if (client !== ws && client.readyState === OPEN) {
//                     client.send(message);
//                 }
//             });

//             const ratingData = JSON.parse(message);
//             console.log('Received movie rating:', ratingData);
//         });

//         ws.on('close', function() {
//             console.log('Client disconnected');
//         });
//     });
// }

// module.exports = { peerProxy };

const { WebSocketServer } = require('ws');
const uuid = require('uuid');

function peerProxy(httpServer) {
  // Create a websocket object
  const wss = new WebSocketServer({ noServer: true });

  // Handle the protocol upgrade from HTTP to WebSocket
  httpServer.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, function done(ws) {
      wss.emit('connection', ws, request);
    });
  });

  // Keep track of all the connections so we can forward messages
  let connections = [];

  wss.on('connection', (ws) => {
    const connection = { id: uuid.v4(), alive: true, ws: ws };
    connections.push(connection);

    // Forward messages to everyone except the sender
    ws.on('message', function message(data) {
        const d = JSON.parse(data);

      connections.forEach((c) => {
        if (c.id !== connection.id) {
          c.ws.send(JSON.stringify(d));
        }

        console.log('Received movie rating:', d);
      });
    });

    // Remove the closed connection so we don't try to forward anymore
    ws.on('close', () => {
      const pos = connections.findIndex((o, i) => o.id === connection.id);

      if (pos >= 0) {
        connections.splice(pos, 1);
      }
    });

    // Respond to pong messages by marking the connection alive
    ws.on('pong', () => {
      connection.alive = true;
    });
  });

  // Keep active connections alive
  setInterval(() => {
    connections.forEach((c) => {
      // Kill any connection that didn't respond to the ping last time
      if (!c.alive) {
        c.ws.terminate();
      } else {
        c.alive = false;
        c.ws.ping();
      }
    });
  }, 10000);
}

module.exports = { peerProxy };

