window.myGame = window.myGame || {};

(function(Phaser, myGame) {
    var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
    var player;
    var overworld;

    const MOVE_SPEED = 1500;

    function preload() {
        game.load.image('pedestrian', 'assets/sprites/pedestrian.png');
        game.load.tilemap('level', 'assets/levels/level0.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tiles', 'assets/tilemaps/overworld.png');
    }

    function create() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.add.sprite(0, 0, 'background');

        overworld = new myGame.Overworld(game, 'Crowd', 'tiles', 'level');

        player = game.add.sprite(384, 384, 'pedestrian');
        game.physics.arcade.enable(player);
        player.body.drag.x = 1000;
        player.body.drag.y = 1000;

        cursors = game.input.keyboard.createCursorKeys();
        game.camera.follow(player);
    }

    function update() {
        myGame.Util.constrainVelocity(player, 300);
        if (cursors.left.isDown) {
            player.body.acceleration.x = -MOVE_SPEED;
        }
        else if (cursors.right.isDown) {
            player.body.acceleration.x = MOVE_SPEED;
        }
        else {
            player.body.acceleration.x = 0;

        }
        if (cursors.up.isDown) {
            player.body.acceleration.y = -MOVE_SPEED;
        }
        else if (cursors.down.isDown) {
            player.body.acceleration.y = MOVE_SPEED;
        }
        else {
            player.body.acceleration.y = 0;
        }
        game.physics.arcade.collide(player, overworld.buildingLayer);
    }
})(window.Phaser, window.myGame);
