var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var player;

const MOVE_SPEED = 1500;

function preload() {
    game.load.image('pedestrian', 'assets/sprites/pedestrian.png');
    game.load.image('background', 'assets/tilemaps/bg.png');
}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.add.sprite(0, 0, 'background');

    player = game.add.sprite(384, game.world.height - 150, 'pedestrian');
    game.physics.arcade.enable(player);
    player.body.drag.x = 1000;
    player.body.drag.y = 1000;

    cursors = game.input.keyboard.createCursorKeys();
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
        console.log('limited speed to: '+maxVelocity);
    }
};


function update() {
    // player.body.velocity.x = 0;
    // player.body.velocity.y = 0;
    // console.log(player.body.velocity);
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
}
