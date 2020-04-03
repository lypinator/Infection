class Bullet extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'bullet');
    }

    fire(x, y) {
        this.body.reset(x, y);

        this.setActive(true);
        this.setVisible(true);

        this.setVelocityY(directionY);

        this.setVelocityX(directionX)
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
            classType: Bullet
        });
    }

    fireBullet(x, y, hasGun) {
        let bullet = this.getFirstDead(false);

        if (bullet && hasGun) {
            bullet.fire(x, y);
        }
    }
}