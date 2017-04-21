window.myGame = window.myGame || {};

(function(Phaser, myGame) {
    const Overworld = function(game, tileset, tiles, tilemap) {
        this.map = game.add.tilemap(tilemap);
        this.map.addTilesetImage(tileset, tiles);
        this.floorLayer = this.map.createLayer('floor');
        this.buildingLayer = this.map.createLayer('building');
        this.map.setCollisionByExclusion([], true, 'building');
        this.buildingLayer.resizeWorld();

        this.floorTiles = this.getFloorTiles();
    };

    Overworld.prototype.getFloorTiles = function() {
        var safeTiles = [];
        var tiles = this.floorLayer.getTiles(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        tiles.forEach(function(tile) {
            if (tile.index == 1) {
                safeTiles.push(tile);
            }
        })
        return safeTiles;
    };

    Overworld.prototype.constructor = Overworld;

    Overworld.prototype.randomFloorPoint = function() {
        // Get a random point on the floor (not in a building)
        var tile = Phaser.ArrayUtils.getRandomItem(this.floorTiles);
        return new Phaser.Point(tile.worldX, tile.worldY);
    }

    myGame.Overworld = Overworld;
})(window.Phaser, window.myGame);
