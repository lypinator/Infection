var directionX;
var directionY;


// You can write more code here
function collisionHandler() {
    console.log("hit");
    this.fToken.destroy();
    this.fPlayer.setData('hasGun', true);
}
function hideText(text) {
    text.visible = false;
}
function itemCollisionHandler() {
    console.log("Collided");
    this.fGameInfo.text = "Hold E to Pickup Item";
    this.fGameInfo.visible = true;

    this.time.removeAllEvents();
    this.time.delayedCall(100, hideText, [this.fGameInfo], this);
}
/* START OF COMPILED CODE */

class Scene1 extends Phaser.Scene {
    constructor() {
        super("Scene1");
    }

    _create() {

        this.add.image(998.8055, 1069.4198, "background1");
        var platform = this.add.image(224.0, 912.0, "platform");

        var platform_1 = this.add.image(222.07042, 1131.7639, "platform");

        var platform_3 = this.add.image(288.6319, 998.15063, "platform");
        platform_3.setScale(0.12639447, 4.9188023);

        var platform_2 = this.add.image(45.849155, 1022.5466, "platform");
        platform_2.setScale(0.10933112, 7.793609);

        var platform_4 = this.add.image(923.90283, 924.77264, "platform");

        var lightningBolt = this.add.image(750.0, 1200.0, "lightning_bolt");
        lightningBolt.setScale(0.3, 0.3);

        var player = this.add.sprite(491.7915, 1036.438, "WalkLeftStand-removebg-preview");
        player.setData("hasGun", false);
        player.setScale(0.48163477, 0.35892242);
        player.anims.play("LeftWalkLeftStand-removebg-preview");

        var platform_5 = this.add.image(1097.0784, 1099.6459, "platform");
        platform_5.setScale(0.11905486, 12.137681);

        var token = this.add.sprite(695.0789, 636.8644, "blueMan1");
        token.setScale(0.34577677, 0.31667724);

        var gameInfo = this.add.text(498.5, 313.0, "New text", {
            "fontSize": "25px",
            "color": "#FFFFFF",
            "stroke": "#FF8080"
        });
        gameInfo.visible = false;

        this.fWalls = this.add.group([platform, platform_3, platform_1, platform_2, platform_4, platform_5]);

        this.fLightningBolt = lightningBolt;
        this.fPlayer = player;
        this.fToken = token;
        this.fGameInfo = gameInfo;
    }

    /* START-USER-CODE */

    create() {
        //this.physics.add.collider(this.fPlayer, this.fWalls);
        this.pickUpDuration = 0;
        this.moveObject = false;
        this.activeWall = null;
        this.playerWallOffsetX;
        this.playerWallOffsetY;

        this._create();
        connectToServer(this); 
        this.configurePlayer();
        this.configureItems();
        this.configureWalls();
        this.configureCameras();
        this.configureKeys();
        this.configureKeyPressEvents();
    }

    update() {

        this.configureCollisionHandler(); 

        if (this.key_UP.isDown) {
            this.fPlayer.body.velocity.y = -200;
            directionY = -300;
            directionX = 0;
            this.sendPlayerUpdate(); 
        }
        if (this.key_LEFT.isDown) {
            this.fPlayer.body.velocity.x = -200;
            console.log();
            this.fPlayer.anims.play("LeftWalkLeftStand-removebg-preview", true);
            directionX = -300;
            directionY = 0;
            this.sendPlayerUpdate(); 
        }
        if (this.key_DOWN.isDown) {
            this.fPlayer.body.velocity.y = 200;
            directionY = 300;
            directionX = 0;
            this.sendPlayerUpdate(); 

        }
        if (this.key_RIGHT.isDown) {
            this.fPlayer.body.velocity.x = 200;
            directionX = 300;
            directionY = 0;
            this.sendPlayerUpdate(); 
        }

        if (this.key_RIGHT.isUp && this.key_DOWN.isUp && this.key_LEFT.isUp && this.key_UP.isUp) {
            this.fPlayer.body.velocity.y = 0;
            this.fPlayer.body.velocity.x = 0;
        }

        if (this.key_LOCK.isDown && this.moveObject) {

            this.activeWall.x = this.playerWallOffsetX + this.fPlayer.x;
            this.activeWall.y = this.playerWallOffsetY + this.fPlayer.y;
            this.sendWallUpdate(this.activeWall.body.name,this.activeWall.x, this.activeWall.y )

        } else {
            if (this.activeWall != null) {
                this.activeWall.body.immovable = true;
                this.moveObject = false;
            }
        }

        //Game information
        this.fGameInfo.x = this.fPlayer.x - 100;
        this.fGameInfo.y = this.fPlayer.y + 100;

        if (this.key_PICKUP.getDuration() > 1000 && this.isOverlapping(this.fPlayer, this.fLightningBolt)) {
            this.fLightningBolt.destroy();
        }
    }

    //Heler Functions
    wallCollisionHandler(player, wall) {
        if (this.key_LOCK.getDuration() > 1000 && !this.moveObject) {
            wall.body.immovable = false;
            wall.setTint(0xECECEC);
            this.moveObject = true;
            this.activeWall = wall;
            this.playerWallOffsetX = wall.x - player.x;
            this.playerWallOffsetY = wall.y - player.y;
        }
    }
    sendPlayerUpdate(){
        var updateMessage = { type: "MOVEMENT", playerId: playerId, xPos: this.fPlayer.x, yPos: this.fPlayer.y };
        serverConnection.send(JSON.stringify(updateMessage));
    }

    sendWallUpdate(wallId, xPos, yPos){
        var updateMessage = { type: "WALLMOVEMENT",playerId: playerId, wallId: wallId, xPos: xPos, yPos: yPos };
        serverConnection.send(JSON.stringify(updateMessage));
    }


    isOverlapping(spriteA, spriteB) {

        return Phaser.Geom.Intersects.RectangleToRectangle(Phaser.Geom.Rectangle.Scale(spriteA, 1.5, 1.5).getBounds(), Phaser.Geom.Rectangle.Scale(spriteB, 1.5, 1.5).getBounds());
    }

    configureKeyPressEvents(){
    this.input.keyboard.on('keydown_SPACE', function (event) {
        this.bullets.fireBullet(this.fPlayer.x, this.fPlayer.y, this.fPlayer.getData('hasGun'));
    }, this);
}

configureCollisionHandler(){
    this.physics.overlap(this.fPlayer, this.fLightningBolt, itemCollisionHandler, null, this);
    this.physics.world.addCollider(this.fPlayer, this.fToken, collisionHandler, null, this);
    this.physics.world.addCollider(this.fPlayer, this.fWalls, this.wallCollisionHandler, null, this);
}

    configurePlayer() {
        this.physics.add.existing(this.fPlayer);
        this.fPlayer.body.setSize(this.fPlayer.width, this.fPlayer.height);
        this.fPlayer.body.setCollideWorldBounds(true);
        this.fPlayer.body.setDrag(2000);
        this.fPlayer.anims.duration = 1000;
        this.fPlayer.body.setSize(this.fPlayer.width, this.fPlayer.height);
    }
    configureWalls() {
        var wallId = 0;
        for (var wall of this.fWalls.children.entries) {
            this.physics.add.existing(wall);
            wall.body.setSize(wall.width, wall.height);
            wall.body.setDrag(2000);
            wall.body.immovable = true;
            wall.body.name = wallId; 
            wallId++;
        }
    }

    initializeWalls(){
        var wallId = 0;
        for (var wall of this.fWalls.children.entries) {
            this.sendWallUpdate(wallId, wall.x, wall.y ); 
            wallId++;
        }
    }
    configureCameras() {
        this.cameras.main.setSize(2000, 2000);
        this.cameras.main.setZoom(5);
        this.cameras.main.startFollow(this.fPlayer, false, 0.5, 0.5);
    }

    configureItems() {
        this.bullets = new Bullets(this);
        this.physics.add.existing(this.fToken);
        this.physics.add.existing(this.fLightningBolt);
        this.fLightningBolt.body.setSize(this.fLightningBolt.width, this.fLightningBolt.height);
        this.fLightningBolt.body.immovable = true;
    }
    configureKeys() {
        this.key_UP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.key_LEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.key_RIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.key_DOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.key_SPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACEBAR);
        this.key_PICKUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.key_LOCK = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
    }
}

/* END-USER-CODE */


/* END OF COMPILED CODE */

// You can write more code here
