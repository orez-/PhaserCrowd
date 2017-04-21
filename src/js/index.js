window.myGame = window.myGame || {};

(function(Phaser, myGame) {
    var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
    const NUM_PEDESTRIANS = 250;
    var player;
    var actorGroup;
    var bubbleGroup;
    var overworld;
    var cursors;

    function preload() {
        game.load.spritesheet('pedestrian', 'assets/sprites/pedestrian.png', 32, 32);
        game.load.image('player', 'assets/sprites/player.png');
        game.load.tilemap('level', 'assets/levels/level0.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tiles', 'assets/tilemaps/overworld.png');
        game.load.image('bubble', 'assets/sprites/bubble.png');
    }

    function create() {
        game.physics.startSystem(Phaser.Physics.ARCADE);

        overworld = new myGame.Overworld(game, 'Crowd', 'tiles', 'level');
        actorGroup = game.add.group();
        // bubbleGroup = game.add.group();
        bubbleGroup = [];
        for (var i=0; i<NUM_PEDESTRIANS; i++) {
            var pedestrian = new myGame.Pedestrian(game, overworld);
            actorGroup.add(pedestrian);
            bubbleGroup.push(pedestrian.bubble);
        }
        player = new myGame.Player(game, overworld);
        actorGroup.add(player);
        cursors = game.input.keyboard.createCursorKeys();
        game.camera.follow(player);
        game.renderer.renderSession.roundPixels = true;  // avoid camera jitter
    }

    function update() {
        player.updateControls(cursors);
        game.physics.arcade.collide(actorGroup);
        game.physics.arcade.overlap(bubbleGroup, actorGroup, onBubbleOverlap, null, this);
        game.physics.arcade.collide(actorGroup, overworld.buildingLayer);
    }

    function onBubbleOverlap(bubble, actor) {
        // processCallback isn't working ᖍ(ツ)ᖌ
        if(!ignoreOwnBubble(bubble, actor)) {
            return;
        }
        bubble.parent.onBubbleInvasion(actor);
    }

    function ignoreOwnBubble(bubble, actor) {
        return bubble.parent !== actor;
    }
})(window.Phaser, window.myGame);
