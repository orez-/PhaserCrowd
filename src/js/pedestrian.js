window.myGame = window.myGame || {};

(function(Phaser, myGame) {
    const MOVE_SPEED = 1500;
    const Pedestrian = function(game) {
        myGame.Actor.call(this, game, 'pedestrian');
    }
    Pedestrian.prototype = Object.create(myGame.Actor.prototype);
    Pedestrian.prototype.constructor = Pedestrian;

    Pedestrian.prototype.update = function () {
        myGame.Actor.prototype.update.call(this);
    }
    myGame.Pedestrian = Pedestrian;
})(window.Phaser, window.myGame);
