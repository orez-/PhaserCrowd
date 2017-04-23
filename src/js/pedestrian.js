window.myGame = window.myGame || {};

(function(Phaser, myGame) {
    const ACCEPTABLE_GOAL_DISTANCE = 200;
    const Pedestrian = function(game, overworld) {
        this.overworld = overworld;
        var start = overworld.randomFloorPoint();
        myGame.Actor.call(this, game, start.x, start.y, 'pedestrian');
        this.frame = game.rnd.integerInRange(0, 1);
        this.body.bounce.x = 0.25;
        this.body.bounce.y = 0.25;
        this.setNewGoal();
        this.avoiding = false;
    }
    Pedestrian.prototype = Object.create(myGame.Actor.prototype);
    Pedestrian.prototype.constructor = Pedestrian;

    Pedestrian.prototype.update = function() {
        if (!this.avoiding) {
            this.body.acceleration.x = 0;
            this.body.acceleration.y = 0;
        }
        else {
            this.avoiding = false;
        }
        var speed = Pedestrian.prototype.MOVE_SPEED;
        var next = this.path[this.pathIndex];
        var distance2 = Phaser.Math.distanceSq(next.x, next.y, this.body.x, this.body.y);
        if (distance2 < ACCEPTABLE_GOAL_DISTANCE * ACCEPTABLE_GOAL_DISTANCE) {
            this.pathIndex++;
            if (this.pathIndex >= this.path.length) {
                this.setNewGoal();
            }
            next = this.path[this.pathIndex];
        }
        this.body.acceleration.x += Phaser.Math.clamp(next.x - this.body.x, -speed, speed);
        this.body.acceleration.y += Phaser.Math.clamp(next.y - this.body.y, -speed, speed);
        myGame.Actor.prototype.update.call(this);
    };

    Pedestrian.prototype.onBubbleInvasion = function(invader) {
        const G = 1200000;
        var bubble_center = this.body.center;
        var actor_center = invader.body.center;
        var r2 = Phaser.Math.distanceSq(bubble_center.x, bubble_center.y, actor_center.x, actor_center.y);
        // Since we collide before checking bubble overlap
        // we shouuld be guaranteed to have nonzero distance
        var force = G / r2;
        var angle = Math.atan2(bubble_center.y - actor_center.y, bubble_center.x - actor_center.x);
        this.body.acceleration.x += Math.cos(angle) * force;
        this.body.acceleration.y += Math.sin(angle) * force;
        this.avoiding = true;
    }

    Pedestrian.prototype.setNewGoal = function() {
        var goal = this.overworld.randomFloorPoint();
        this.path = this.overworld.findPath(this.body, goal);
        this.pathIndex = 0;
    };

    myGame.Pedestrian = Pedestrian;
})(window.Phaser, window.myGame);
