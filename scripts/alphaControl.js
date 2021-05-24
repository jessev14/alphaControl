Hooks.once("init", () => {
    game.settings.register("alphaControl", "hiddenToken", {
        name: game.i18n.localize("alphaControl.settings.hiddenToken"),
        hint: game.i18n.localize("alphaControl.settings.defaultHiddenHint"),
        scope: "world",
        config: true,
        type: Number,
        default: 0.5,
        range: {
            min: 0.1,
            max: 1.0,
            step: 0.1
        }
    });

    game.settings.register("alphaControl", "hiddenTile", {
        name: game.i18n.localize("alphaControl.settings.hiddenTile"),
        hint: game.i18n.localize("alphaControl.settings.defaultHiddenHint"),
        scope: "world",
        config: true,
        type: Number,
        default: 0.5,
        range: {
            min: 0.1,
            max: 1.0,
            step: 0.1
        }
    });
});

const og_token_refresh = Token.prototype.refresh;
CONFIG.Token.objectClass.prototype.refresh = function () {
  og_token_refresh.call(this);  
  this.icon.alpha = this.data.hidden ? game.settings.get("alphaControl", "hiddenToken") : this.data.alpha;
  return this;
};

const og_tile_refresh = Tile.prototype.refresh;
CONFIG.Tile.objectClass.prototype.refresh = function () {
    og_tile_refresh.call(this);
    this.tile.alpha = this.data.hidden ? game.settings.get("alphaControl", "hiddenTile") : this.data.alpha;
    return this;
};
