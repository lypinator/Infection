
// You can write more code here


function collisionHandler(player,token){
	console.log("hit");
	this.fToken.destroy();
}
/* START OF COMPILED CODE */

class Scene1 extends Phaser.Scene {
	
	constructor() {
	
		super("Scene1");
		
	}
	
	_create() {
	
		this.add.image(992.0, 1010.13214, "background1");
		
		var platform = this.add.image(224.0, 912.0, "platform");
		
		var platform_1 = this.add.image(222.07042, 1131.7639, "platform");
		
		var platform_3 = this.add.image(288.6319, 998.15063, "platform");
		platform_3.setData("body.immovable", true);
		platform_3.setScale(0.12639447, 4.9188023);
		
		var platform_2 = this.add.image(45.849155, 1022.5466, "platform");
		platform_2.setScale(0.10933112, 7.793609);
		
		var platform_4 = this.add.image(923.90283, 924.77264, "platform");
		
		var player = this.add.sprite(491.7915, 1036.438, "blueMan");
		player.setScale(0.48163477, 0.35892242);
		
		var platform_5 = this.add.image(1097.0784, 1099.6459, "platform");
		platform_5.setScale(0.11905486, 12.137681);
		
		var token = this.add.image(695.0789, 636.8644, "blueMan1");
		token.setScale(0.34577677, 0.31667724);
		
		this.fWalls = this.add.group([ platform, platform_3, platform_1, platform_2, platform_4, platform_5 ]);
		
		this.fPlayer = player;
		this.fToken = token;
		
	}
	
	
	
	
	/* START-USER-CODE */
	
	create() {
		
		
		
		this._create();
		
		
		this.physics.add.existing(this.fPlayer);
		this.fPlayer.body.setSize(this.fPlayer.width, this.fPlayer.height);
		this.fPlayer.body.setCollideWorldBounds(true);
		//debugger;
		
		this.physics.add.existing(this.fToken);
		this.fToken.body.setSize(this.fToken.width, this.fToken.height);
		
		for (var image of this.fWalls.children.entries) {
			this.physics.add.existing(image);
			image.body.setSize(image.width, image.height);
			image.body.immovable = true;
		}
		
		this.cameras.main.setSize(2000, 2000);
		this.cameras.main.setZoom(4);
		this.cameras.main.startFollow(this.fPlayer,false,0.5,0.5);
		

		this.key_UP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
		this.key_LEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
		this.key_RIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
		this.key_DOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
		this.key_SPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACEBAR);
		
		this.physics.add.collider(this.fPlayer, this.fWalls);
		}

	update() {

	this.physics.world.addCollider(this.fPlayer, this.fToken, collisionHandler, null, this);
	
	if(this.key_UP.isDown){
		this.fPlayer.body.velocity.y = -200;
		//console.log("up");
	}	
	if(this.key_LEFT.isDown){
		this.fPlayer.body.velocity.x = -200;
		//console.log("left");
	}
	if(this.key_DOWN.isDown){
		this.fPlayer.body.velocity.y = 200;
		//console.log("down");
	}
	if(this.key_RIGHT.isDown){
		//console.log("right");
		this.fPlayer.body.velocity.x = 200;
	}
	if (this.key_RIGHT.isUp && this.key_DOWN.isUp && this.key_LEFT.isUp && this.key_UP.isUp){
		this.fPlayer.body.velocity.y = 0;
		this.fPlayer.body.velocity.x = 0;
	}
	}


	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here