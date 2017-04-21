window.myGame = window.myGame || {};

(function(Phaser, myGame) {
    const ACCEPTABLE_GOAL_DISTANCE = 200;
    const Pedestrian = function(game, overworld) {
        this.overworld = overworld;
        var start = overworld.randomFloorPoint();
        myGame.Actor.call(this, game, start.x, start.y, 'pedestrian');
        this.setNewGoal();
    }
    Pedestrian.prototype = Object.create(myGame.Actor.prototype);
    Pedestrian.prototype.constructor = Pedestrian;

    Pedestrian.prototype.update = function() {
        var speed = Pedestrian.prototype.MOVE_SPEED;
        var next = this.path[this.pathIndex]
        var distance2 = Phaser.Math.distanceSq(next.x, next.y, this.body.x, this.body.y);
        if (distance2 < ACCEPTABLE_GOAL_DISTANCE * ACCEPTABLE_GOAL_DISTANCE) {
            this.pathIndex++;
            if (this.pathIndex >= this.path.length) {
                this.setNewGoal();
            }
            next = this.path[this.pathIndex]
        }
        this.body.acceleration.x = Phaser.Math.clamp(next.x - this.body.x, -speed, speed);
        this.body.acceleration.y = Phaser.Math.clamp(next.y - this.body.y, -speed, speed);
        myGame.Actor.prototype.update.call(this);
    };

    Pedestrian.prototype.setNewGoal = function() {
        var goal = this.overworld.randomFloorPoint();
        this.path = this.overworld.findPath(this.body, goal);
        this.pathIndex = 0;
    };

    myGame.Pedestrian = Pedestrian;
})(window.Phaser, window.myGame);
