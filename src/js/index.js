window.myGame = window.myGame || {};

(function(Phaser, myGame) {
    var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
    var player;
    var overworld;
    var cursors;

    function preload() {
        game.load.image('pedestrian', 'assets/sprites/pedestrian.png');
        game.load.tilemap('level', 'assets/levels/level0.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tiles', 'assets/tilemaps/overworld.png');
    }

    function create() {
        game.physics.startSystem(Phaser.Physics.ARCADE);

        overworld = new myGame.Overworld(game, 'Crowd', 'tiles', 'level');
        player = new myGame.Pedestrian(game);
        game.add.existing(player);
        cursors = game.input.keyboard.createCursorKeys();
        game.camera.follow(player);
    }

    function update() {
        player.updateControls(cursors);
        player.update();
        game.physics.arcade.collide(player, overworld.buildingLayer);
    }
})(window.Phaser, window.myGame);
