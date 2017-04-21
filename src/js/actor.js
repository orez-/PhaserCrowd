window.myGame = window.myGame || {};

(function(Phaser, myGame) {
    const Actor = function(game, x, y, image) {
        Phaser.Sprite.call(this, game, x, y, image);
        game.physics.arcade.enable(this);
        this.body.drag.x = 1000;
        this.body.drag.y = 1000;
        this.body.setCircle(16);
        this.body.friction.x = 0;
        this.body.friction.y = 0;
        this.anchor.x = 0.5
        this.anchor.y = 0.5
        this.createBubble(game);
    }
    Actor.prototype = Object.create(Phaser.Sprite.prototype);
    Actor.prototype.constructor = Actor;

    Actor.prototype.MOVE_SPEED = 1500;
    Actor.prototype.update = function () {
        myGame.Util.constrainVelocity(this, 300);
    }
    Actor.prototype.createBubble = function (game) {
        // if debug, use 'bubble' for the sprite group
        this.bubble = new Phaser.Sprite(game, 0, 0, null);
        game.physics.arcade.enable(this.bubble);
        this.bubble.anchor.x = 0.5;
        this.bubble.anchor.y = 0.5;
        this.bubble.body.setCircle(64);
        this.addChild(this.bubble);
    }
    myGame.Actor = Actor;
})(window.Phaser, window.myGame);
