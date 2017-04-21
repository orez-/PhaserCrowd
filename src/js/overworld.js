window.myGame = window.myGame || {};

(function(Phaser, myGame) {
    const Overworld = function(game, tileset, tiles, tilemap) {
        this.map = game.add.tilemap(tilemap);
        this.map.addTilesetImage(tileset, tiles);
        this.floorLayer = this.map.createLayer('floor');
        this.buildingLayer = this.map.createLayer('building');
        this.map.setCollisionByExclusion([], true, 'building');
        this.buildingLayer.resizeWorld();
    };

    Overworld.prototype.constructor = Overworld;

    myGame.Overworld = Overworld;
})(window.Phaser, window.myGame);
