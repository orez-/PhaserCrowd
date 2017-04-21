window.myGame = window.myGame || {};

(function(myGame) {
    const Util = {
        constrainVelocity: function (sprite, maxVelocity) {
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
            }
        }
    }

    myGame.Util = Util;
})(window.myGame);
