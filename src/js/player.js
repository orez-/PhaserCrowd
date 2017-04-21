window.myGame = window.myGame || {};

(function(Phaser, myGame) {
    console.log("player");
    const MOVE_SPEED = 1500;
    const Player = function(game) {
        myGame.Actor.call(this, game, 'player');
    }
    Player.prototype = Object.create(myGame.Actor.prototype);
    Player.prototype.constructor = Player;

    Player.prototype.updateControls = function (cursors) {
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
    myGame.Player = Player;
})(window.Phaser, window.myGame);
