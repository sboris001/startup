const { WebSocketServer, OPEN } = require('ws'); // Import WebSocketServer and OPEN from 'ws'

function peerProxy(httpServer) {
    const wss = new WebSocketServer({ server: httpServer });

    // In your peerProxy.js file, modify the WebSocket message handling to process movie ratings
    wss.on('connection', function(ws) {
        console.log('Client connected');

        ws.on('message', function(message) {
            // Broadcast the received message to all connected clients
            wss.clients.forEach(function(client) {
                if (client !== ws && client.readyState === OPEN) {
                    client.send(message);
                }
            });

            // Handle movie ratings here
            const ratingData = JSON.parse(message);
            // Process the received movie rating data (e.g., store it in a database)
            console.log('Received movie rating:', ratingData);
        });

        ws.on('close', function() {
            console.log('Client disconnected');
        });
    });
}

module.exports = { peerProxy };
