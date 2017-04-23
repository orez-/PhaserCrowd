window.myGame = window.myGame || {};

const MAX_VELOCITY = 300;
const BUBBLE_RADIUS = 64;
(function(Phaser, myGame) {
    const Actor = function(game, x, y, image) {
        Phaser.Sprite.call(this, game, x, y, image);
        game.physics.arcade.enable(this);
        this.body.drag.x = 1000;
        this.body.drag.y = 1000;
        this.body.setCircle(16);
        this.body.friction.x = 0;
        this.body.friction.y = 0;
        this.anchor.x = 0.5;
        this.anchor.y = 0.5;
        this.body.maxVelocity.x = MAX_VELOCITY;
        this.body.maxVelocity.y = MAX_VELOCITY;
        this.createBubble(game);
    }
    Actor.prototype = Object.create(Phaser.Sprite.prototype);
    Actor.prototype.constructor = Actor;

    Actor.prototype.MOVE_SPEED = 1500;
    Actor.prototype.update = function () {
        myGame.Util.constrainVelocity(this, MAX_VELOCITY);
    }
    Actor.prototype.createBubble = function (game) {
        this.bubble = new Phaser.Sprite(game, 0, 0, null);
        game.physics.arcade.enable(this.bubble);
        this.bubble.body.setCircle(BUBBLE_RADIUS, -BUBBLE_RADIUS, -BUBBLE_RADIUS);
        this.bubble.body.immovable = true;
        this.addChild(this.bubble);
    }
    myGame.Actor = Actor;
})(window.Phaser, window.myGame);
