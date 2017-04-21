window.myGame = window.myGame || {};

(function(Phaser, myGame) {
    var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
    var player;
    var map;
    var buildingLayer;

    const MOVE_SPEED = 1500;

    function preload() {
        game.load.image('pedestrian', 'assets/sprites/pedestrian.png');
        game.load.image('background', 'assets/tilemaps/bg.png');
        game.load.tilemap('level', 'assets/levels/level0.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tiles', 'assets/tilemaps/overworld.png');
    }

    function create() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.add.sprite(0, 0, 'background');

        // map shit
        map = game.add.tilemap('level', 256, 256);
        map.addTilesetImage('Crowd', 'tiles');
        map.createLayer('floor');
        buildingLayer = map.createLayer('building');
        map.setCollisionByExclusion([], true, 'building');
        //  Resize the world
        buildingLayer.resizeWorld();

        player = game.add.sprite(384, 384, 'pedestrian');
        game.physics.arcade.enable(player);
        player.body.drag.x = 1000;
        player.body.drag.y = 1000;

        cursors = game.input.keyboard.createCursorKeys();
        game.camera.follow(player);
    }

    function constrainVelocity(sprite, maxVelocity) {
        var body = sprite.body;
        var angle, currVelocitySqr, vx, vy;
        vx = body.velocity.x;
        vy = body.velocity.y;
        currVelocitySqr = vx * vx + vy * vy;
        if (currVelocitySqr > maxVelocity * maxVelocity) {
            angle = Math.atan2(vy, vx);
            vx = Math.cos(angle) * maxVelocity;
            vy = Math.sin(angle) * maxVelocity;
            body.velocity.x = vx;
            body.velocity.y = vy;
        }
    }

    function update() {
        constrainVelocity(player, 300);
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
        game.physics.arcade.collide(player, buildingLayer);
    }
})(window.Phaser, window.myGame);
