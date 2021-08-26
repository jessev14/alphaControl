import { libWrapper } from "../lib/shim.js";


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

Hooks.once("setup", () => {
    libWrapper.register("alphaControl", "CONFIG.Token.objectClass.prototype.refresh", function (wrapped) {
        wrapped();
        this.icon.alpha = this.data.hidden ? game.settings.get("alphaControl", "hiddenToken") : this.data.alpha;
        
        return this;
    }, "WRAPPER");

    libWrapper.register("alphaControl", "CONFIG.Tile.objectClass.prototype.refresh", function (wrapped) {
        wrapped();
        if (this.tile) this.tile.alpha = this.data.hidden ? game.settings.get("alphaControl", "hiddenTile") : this.data.alpha;

        return this;
    }, "WRAPPER");
});
