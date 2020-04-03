"use strict";
// Optional. You will see this name in eg. 'ps' or 'top' command
process.title = 'node-chat';
// Port where we'll run the websocket server
var webSocketsServerPort = 3001;
// websocket and http servers
var webSocketServer = require('websocket').server;
var http = require('http');

var server = http.createServer(function (request, response) {
});
server.listen(webSocketsServerPort, function () {
  console.log((new Date()) + " Server is listening on port "
    + webSocketsServerPort);
});
/**
 * WebSocket server
 */
var wsServer = new webSocketServer({
  httpServer: server
});

var allPlayers = [];
var connections = [];
wsServer.on('request', function (request) {

  var currentPlayersConnection = request.accept(null, request.origin);
  var currentPlayerId = allPlayers.length;

  //Push the current players new connection
  connections.push({
    playerId: currentPlayerId,
    connection: currentPlayersConnection
  });

  //Send the CurrentPlayer their ID and list of other players
  currentPlayersConnection.sendUTF(JSON.stringify({ type: 'CONNECTION_INFORMATION', playerId: currentPlayerId, players: allPlayers }));
  
  //Push the CurrentPlayer to the list of players
  var currentPlayerInformation = {
    playerId: currentPlayerId,
    xPos: 200,
    yPos: 545
  }
  allPlayers.push(currentPlayerInformation);
  
  //Let all other clients know a new player was added to the game
  for (var con of connections) {
    if (con.playerId !== currentPlayerId) {
      con.connection.sendUTF(JSON.stringify({ type: "NEW_PLAYER", player: {currentPlayerInformation} }));
    }

    // user sent some message
    currentPlayersConnection.on('message', function (message) {
      try {
        var incomingMessage = JSON.parse(message.utf8Data);
      } catch (e) {
        console.log(e);
      }

      if (incomingMessage.type === "MOVEMENT") {
        allPlayers[incomingMessage.playerId].xPos = incomingMessage.xPos;
        allPlayers[incomingMessage.playerId].yPos = incomingMessage.yPos;

        for(var con of connections){
          if(con.playerId !== incomingMessage.playerId){
            con.connection.sendUTF(JSON.stringify({
              type: 'PLAYER_MOVEMENT_UPDATE',
              playerId: incomingMessage.playerId,
              xPos: incomingMessage.xPos,
              yPos: incomingMessage.yPos
            }));
          }
        }
      }
    });
  };
});
