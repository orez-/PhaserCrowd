window.myGame = window.myGame || {};

(function(Phaser, myGame) {
    const Overworld = function(game, tileset, tiles, tilemap) {
        this.map = game.add.tilemap(tilemap);
        this.map.addTilesetImage(tileset, tiles);
        this.floorLayer = this.map.createLayer('floor');
        this.buildingLayer = this.map.createLayer('building');
        this.map.setCollisionByExclusion([], true, 'building');
        this.buildingLayer.resizeWorld();

        this.loadFloorTiles();
    };

    Overworld.prototype.loadFloorTiles = function() {
        this.floorTiles = [];
        this.pointMap = {};
        var self = this;
        var tiles = this.floorLayer.getTiles(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        tiles.forEach(function(tile) {
            if (tile.index === 1) {
                self.floorTiles.push(tile);
                self.pointMap[tile.x + " " + tile.y] = true
            }
        });
    };

    Overworld.prototype.constructor = Overworld;

    Overworld.prototype.randomFloorPoint = function() {
        // Get a random point on the floor (not in a building)
        var tile = Phaser.ArrayUtils.getRandomItem(this.floorTiles);
        return new Phaser.Point(tile.worldX + 128, tile.worldY + 128);
    };

    Overworld.prototype.buildPath = function(parents, targetNode) {
        var result = [targetNode];
        var key = targetNode.x + " " + targetNode.y;
        while (parents[key] !== null) {
            targetNode = parents[key];
            result.push(targetNode);
            key = targetNode.x + " " + targetNode.y;
        }
        return result.reverse();
    };

    Overworld.prototype.findPath = function (start, end) {
        start = {x: Math.floor(start.x / 256), y: Math.floor(start.y / 256)}
        end = {x: Math.floor(end.x / 256), y: Math.floor(end.y / 256)}
        var queue = [start];
        var parents = {};
        parents[start.x + " " + start.y] = null;
        var visited = {};
        visited[start.x + " " + start.y] = true;
        while (queue.length) {
            var current = queue.shift();
            if (current.x === end.x && current.y === end.y) {
                var path = this.buildPath(parents, end);
                path = path.map(function(step) {
                    return {x: step.x * 256 + 128, y: step.y * 256 + 128};
                });
                return path;
            }
            this.floorNeighbors(current).forEach(function(pt) {
                var key = pt.x + " " + pt.y;
                if (!visited[key]) {
                    parents[key] = current;
                    visited[key] = true;
                    queue.push(pt);
                }
            });
        }
    };

    Overworld.prototype.floorNeighbors = function (point) {
        var potential = [
            {x: point.x + 1, y: point.y},
            {x: point.x - 1, y: point.y},
            {x: point.x, y: point.y + 1},
            {x: point.x, y: point.y - 1},
        ];
        var neighbors = [];
        var self = this;
        potential.forEach(function(pt) {
            if (self.pointMap[pt.x + " " + pt.y]) {
                neighbors.push(pt);
            }
        });
        return neighbors;
    };

    myGame.Overworld = Overworld;
})(window.Phaser, window.myGame);
