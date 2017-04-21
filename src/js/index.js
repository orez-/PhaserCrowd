window.myGame = window.myGame || {};

(function(Phaser, myGame) {
    var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
    const NUM_PEDESTRIANS = 1000;
    var player;
    var actorGroup;
    var overworld;
    var cursors;

    function preload() {
        game.load.image('pedestrian', 'assets/sprites/pedestrian.png');
        game.load.image('player', 'assets/sprites/player.png');
        game.load.tilemap('level', 'assets/levels/level0.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tiles', 'assets/tilemaps/overworld.png');
    }

    function create() {
        game.physics.startSystem(Phaser.Physics.ARCADE);

        overworld = new myGame.Overworld(game, 'Crowd', 'tiles', 'level');
        actorGroup = game.add.group();
        for (var i=0; i<NUM_PEDESTRIANS; i++)
            actorGroup.add(new myGame.Pedestrian(game));
        player = new myGame.Player(game);
        actorGroup.add(player);
        cursors = game.input.keyboard.createCursorKeys();
        game.camera.follow(player);
    }

    function update() {
        player.updateControls(cursors);
        game.physics.arcade.collide(actorGroup, overworld.buildingLayer);
    }
})(window.Phaser, window.myGame);
