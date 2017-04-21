window.myGame = window.myGame || {};

(function(Phaser, myGame) {
    const MOVE_SPEED = 1500;
    const Pedestrian = function(game) {
        Phaser.Sprite.call(this, game, 384, 384, 'pedestrian');
        game.physics.arcade.enable(this);
        this.body.drag.x = 1000;
        this.body.drag.y = 1000;
    }
    Pedestrian.prototype = Object.create(Phaser.Sprite.prototype);
    Pedestrian.prototype.constructor = Pedestrian;

    Pedestrian.prototype.updateControls = function (cursors) {
        if (cursors.left.isDown) {
            this.body.acceleration.x = -MOVE_SPEED;
        }
        else if (cursors.right.isDown) {
            this.body.acceleration.x = MOVE_SPEED;
        }
        else {
            this.body.acceleration.x = 0;

        }
        if (cursors.up.isDown) {
            this.body.acceleration.y = -MOVE_SPEED;
        }
        else if (cursors.down.isDown) {
            this.body.acceleration.y = MOVE_SPEED;
        }
        else {
            this.body.acceleration.y = 0;
        }
    };

    Pedestrian.prototype.update = function () {
        myGame.Util.constrainVelocity(this, 300);
    }
    myGame.Pedestrian = Pedestrian;
})(window.Phaser, window.myGame);
