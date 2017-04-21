window.myGame = window.myGame || {};

(function(Phaser, myGame) {
    const Actor = function(game, x, y, image) {
        Phaser.Sprite.call(this, game, x, y, image);
        game.physics.arcade.enable(this);
        this.body.drag.x = 1000;
        this.body.drag.y = 1000;
    }
    Actor.prototype = Object.create(Phaser.Sprite.prototype);
    Actor.prototype.constructor = Actor;

    Actor.prototype.MOVE_SPEED = 1500;
    Actor.prototype.update = function () {
        myGame.Util.constrainVelocity(this, 300);
    }
    myGame.Actor = Actor;
})(window.Phaser, window.myGame);
