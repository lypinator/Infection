class Bullet extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'bulletLeft');
    }

    fire(x, y) {
		if(this.scene.time.now < this.nextFire){return;}
		
		//Down
		if (directionY > 0 && directionX == 0){
			this.setAngle(270);
			y+=30;
		}
		//Up
		else if(directionY < 0 && directionX == 0){
			this.setAngle(90);
			y-=30;
		}
		//Right
		else if(directionX > 0 && directionY == 0){
			this.setAngle(180);
			x+=25;
		}
		else{
			this.setAngle(0);
			x-=25;
		}
		//Else Left
		
		this.body.reset(x, y);
		this.body.setSize(this.width,this.height);
        this.setActive(true);
        this.setVisible(true);

        this.setVelocityY(directionY);

        this.setVelocityX(directionX);
		this.nextFire = this.scene.time.now + this.fireRate;
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
		
        if (this.y <= -32 || this.x <= -32 || this.y >= 2032 || this.x >= 2032) {
            this.setActive(false);
            this.setVisible(false);
        }
    }
}

class Bullets extends Phaser.Physics.Arcade.Group {
    constructor(scene) {
        super(scene.physics.world, scene);
        this.createMultiple({
            frameQuantity: 30,
            key: 'bullet',
            active: false,
            visible: false,
            classType: Bullet,
			width: 10,
			height:10,
			fireRate: 1000
        });
		this.fireRate = 1000;
    }

    fireBullet(x, y, hasGun) {
        let bullet = this.getFirstDead(false);
        if (bullet && hasGun) {
            bullet.fire(x, y);
        }
    }
}