
window.addEventListener('load', function() {

	var game = new Phaser.Game({
    "title": "Infection",
    "width": 2000,
    "height": 2000,
	"physics": {
		default: 'arcade',
        arcade: {
        debug: true
		}
	},
    "type": Phaser.AUTO,
    "backgroundColor": "#88F",
    "parent": "game-container",
    "scale": {
        "mode": Phaser.Scale.FIT,
        "autoCenter": Phaser.Scale.CENTER_BOTH
    }
	});
	game.scene.add("Boot", Boot, true);
	
});

class Boot extends Phaser.Scene {

	preload() {
		this.load.pack("pack", "assets/pack.json");
	}

	create() {
		this.scene.start("Scene1");
	}

}
