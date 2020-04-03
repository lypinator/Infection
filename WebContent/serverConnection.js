var allPlayers = new Map();
var serverConnection;
var playerId;
function connectToServer(canvas) {
    serverConnection = new WebSocket('ws://127.0.0.1:3001');
    serverConnection.onmessage = function (message) {
        try {
            var json = JSON.parse(message.data);
        } catch (e) {
            console.log('Invalid JSON: ', message.data);
            return;
        }
        switch (json.type) {
            case 'NEW_PLAYER':
                var newPlayer = canvas.add.sprite(491.7915, 1036.438, "WalkLeftStand-removebg-preview");
                newPlayer.setData("hasGun", false);
                newPlayer.setScale(0.48163477, 0.35892242);
                newPlayer.anims.play("LeftWalkLeftStand-removebg-preview");
                allPlayers.set(json.player.currentPlayerInformation.playerId, newPlayer);
                break;
            case 'CONNECTION_INFORMATION':
                playerId = json.playerId;
                for (var player of json.players) {
                    var newPlayer1 = canvas.add.sprite(player.xPos, player.yPos, "WalkLeftStand-removebg-preview");
                    newPlayer1.setData("hasGun", false);
                    newPlayer1.setScale(0.48163477, 0.35892242);
                    newPlayer1.anims.play("LeftWalkLeftStand-removebg-preview");
                    allPlayers.set(player.playerId, newPlayer1);
                    canvas.initializeWalls(); 
                }
                break;
            case 'PLAYER_MOVEMENT_UPDATE':
                
                allPlayers.get(json.playerId).x = json.xPos;
                allPlayers.get(json.playerId).y = json.yPos;
                break;
            case 'WALL_MOVEMENT_UPDATE':
                canvas.fWalls.children.entries[json.wallId].x = json.xPos;
                canvas.fWalls.children.entries[json.wallId].y = json.yPos;
                break;
        }
    }
}