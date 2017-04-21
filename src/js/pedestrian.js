window.myGame = window.myGame || {};

(function(Phaser, myGame) {
    const ACCEPTABLE_GOAL_DISTANCE = 20;
    const Pedestrian = function(game, overworld) {
        this.overworld = overworld;
        var start = overworld.randomFloorPoint();
        myGame.Actor.call(this, game, start.x, start.y, 'pedestrian');
        this.goal = new Phaser.Point();
        this.setNewGoal();
    }
    Pedestrian.prototype = Object.create(myGame.Actor.prototype);
    Pedestrian.prototype.constructor = Pedestrian;

    Pedestrian.prototype.update = function() {
        var speed = Pedestrian.prototype.MOVE_SPEED;
        var distance2 = Phaser.Math.distanceSq(this.goal.x, this.goal.y, this.body.x, this.body.y);
        if (distance2 < ACCEPTABLE_GOAL_DISTANCE * ACCEPTABLE_GOAL_DISTANCE) {
            this.setNewGoal();
        }
        this.body.acceleration.x = Phaser.Math.clamp(this.goal.x - this.body.x, -speed, speed);
        this.body.acceleration.y = Phaser.Math.clamp(this.goal.y - this.body.y, -speed, speed);
        myGame.Actor.prototype.update.call(this);
    };

    Pedestrian.prototype.setNewGoal = function() {
        this.goal = this.overworld.randomFloorPoint();
    };
    myGame.Pedestrian = Pedestrian;
})(window.Phaser, window.myGame);
