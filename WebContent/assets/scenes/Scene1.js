var directionX;
var directionY;
let colliderGrabWallActivated = true;

// You can write more code here

class Bullet extends Phaser.Physics.Arcade.Sprite
{
    constructor (scene, x, y)
    {
        super(scene, x, y, 'bullet');
    }

    fire (x, y)
    {
        this.body.reset(x, y);

        this.setActive(true);
        this.setVisible(true);

        this.setVelocityY(directionY);

		this.setVelocityX(directionX)
    }

    preUpdate (time, delta)
    {
        super.preUpdate(time, delta);

        if (this.y <= -32 || this.x <= -32 || this.y >= 2032 || this.x >= 2032)
        {
            this.setActive(false);
            this.setVisible(false);
        }
    }
}

class Bullets extends Phaser.Physics.Arcade.Group
{
    constructor (scene)
    {
        super(scene.physics.world, scene);

        this.createMultiple({
            frameQuantity: 30,
            key: 'bullet',
            active: false,
            visible: false,
            classType: Bullet
        });
    }

    fireBullet (x, y, hasGun)
    {
        let bullet = this.getFirstDead(false);

        if (bullet && hasGun)
        {
            bullet.fire(x, y);
        }
    }
}
function collisionHandler(){
	console.log("hit");
	this.fToken.destroy();
	this.fPlayer.setData('hasGun',true);
}
function hideText(text){
	text.visible = false;
}
function itemCollisionHandler(){
	

	console.log("Collided");
	this.fGameInfo.text = "Hold E to Pickup Item"; 
	this.fGameInfo.visible = true;

	this.time.removeAllEvents();
	this.time.delayedCall(100, hideText, [this.fGameInfo], this);
	
	
}

function ToggleCollision(){
	colliderGrabWallActivated = true;
}

function wallCollisionHandler(){
	
	colliderGrabWallActivated = false;
	console.log("Collided");
	this.fGameInfo.text = "Hold E to Move Item"; 
	this.fGameInfo.visible = true;

	this.time.removeAllEvents();
	this.time.delayedCall(1000, hideText, [this.fGameInfo], this);
	this.time.delayedCall(100,ToggleCollision,null,this);
	
}
/* START OF COMPILED CODE */

class Scene1 extends Phaser.Scene {
	
	constructor() {
	
		super("Scene1");
		
	}
	
	_create() {
	
		this.add.image(1000.0, 1000.0, "background1");
		
		var platform = this.add.image(224.0, 912.0, "platform");
		
		var platform_1 = this.add.image(222.07042, 1131.7639, "platform");
		
		var platform_3 = this.add.image(288.6319, 998.15063, "platform");
		platform_3.setData("body.immovable", true);
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
		
		var platform_7 = this.add.image(1203.3524, 567.26764, "platform");
		platform_7.setScale(0.5973581, 1.035678);
		
		var platform_8 = this.add.image(1188.6333, 339.41705, "platform");
		platform_8.setScale(0.5973581, 1.035678);
		
		var platform_6 = this.add.image(1052.0481, 453.31494, "platform");
		platform_6.setScale(0.07395803, 4.9579167);
		
		var platform_9 = this.add.image(1393.2197, 443.0471, "platform");
		platform_9.setScale(0.07395803, 4.9579167);
		
		var GameInfo = this.add.text(330.8849, 147.59862, "New text", {});
		GameInfo.setScale(2.2440186, 3.0575879);
		
		this.fWalls = this.add.group([ platform, platform_3, platform_1, platform_2, platform_4, platform_5 ]);
		this.fMoveables = this.add.group([ platform_7, platform_8, platform_6, platform_9 ]);
		
		this.fLightningBolt = lightningBolt;
		this.fPlayer = player;
		this.fToken = token;
		this.fGameInfo = GameInfo;
		
	}
	
	
	
	
	
	
	
	/* START-USER-CODE */
	
	create() {
		
		
		
		this._create();
		this.bullet;
		this.bullets = new Bullets(this);
		
		this.physics.add.existing(this.fPlayer);
		this.fPlayer.body.setSize(this.fPlayer.width, this.fPlayer.height);
		this.fPlayer.body.setCollideWorldBounds(true);

		this.fPlayer.body.setDrag(2000);
		this.fPlayer.anims.duration = 1000;
		
		this.physics.add.existing(this.fToken);
		
		this.physics.add.existing(this.fLightningBolt);
		this.fLightningBolt.body.setSize(this.fLightningBolt.width, this.fLightningBolt.height);
		this.fLightningBolt.body.immovable = true;
		
		for (var image of this.fWalls.children.entries) {
			this.physics.add.existing(image);
			image.body.setSize(image.width, image.height);
			image.body.immovable = true;
		}
		for (var obj of this.fMoveables.children.entries) {
			this.physics.add.existing(obj);
			obj.body.setSize(obj.width, obj.height);
			obj.body.setDrag(2000);
			obj.body.immovable = true;
		}
		this.cameras.main.setSize(2000, 2000);
		this.cameras.main.setZoom(5);
		this.cameras.main.startFollow(this.fPlayer,false,0.5,0.5);
		

		this.key_UP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
		this.key_LEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
		this.key_RIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
		this.key_DOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
		this.key_SPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACEBAR);
		this.key_PICKUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
		
		this.input.keyboard.on('keydown_SPACE',function(event){
			this.bullets.fireBullet(this.fPlayer.x, this.fPlayer.y,this.fPlayer.getData('hasGun'));
		},this);
		
		this.physics.add.collider(this.fPlayer, this.fWalls);
		this.physics.add.collider(this.fPlayer, this.fMoveables);
		this.pickUpDuration = 0;
		
		
		
		}

	update() {
		this.physics.overlap(this.fPlayer, this.fLightningBolt, itemCollisionHandler, null, this);
		this.physics.world.addCollider(this.fPlayer, this.fToken, collisionHandler, null, this);
		
		this.physics.world.addCollider(this.fPlayer, this.fMoveables, wallCollisionHandler,null,this);
		/*()=>{
			return colliderGrabWallActivated;
		}, this);
		*/
	this.physics.world.addCollider(this.fPlayer, this.fToken, collisionHandler, null, this);

	if(this.key_UP.isDown){
		this.fPlayer.body.velocity.y = -200;
		directionY = -300;
		directionX = 0;
		//console.log("up");
	}	
	if(this.key_LEFT.isDown){
		this.fPlayer.body.velocity.x = -200;
		console.log();
		this.fPlayer.anims.play("LeftWalkLeftStand-removebg-preview",true);
		directionX = -300;
		directionY = 0;
		//console.log("left");
		
	}
	if(this.key_DOWN.isDown){
		this.fPlayer.body.velocity.y = 200;
		directionY = 300;
		directionX = 0;
		//console.log("down");
	}
	if(this.key_RIGHT.isDown){
		//console.log("right");
		this.fPlayer.body.velocity.x = 200;
		directionX = 300;
		directionY = 0;
	}

	if (this.key_RIGHT.isUp && this.key_DOWN.isUp && this.key_LEFT.isUp && this.key_UP.isUp){
		this.fPlayer.body.velocity.y = 0;
		this.fPlayer.body.velocity.x = 0;
	}
	
	//Game information
	this.fGameInfo.x = this.fPlayer.x - 100; 
	this.fGameInfo.y = this.fPlayer.y + 100; 
	
	if(this.key_PICKUP.getDuration() > 1000){
		this.fLightningBolt.destroy(); 
		
	}
	
}
	


	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
