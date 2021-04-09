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
        },
        onChange: () => window.location.reload()
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
        },
        onChange: () => window.location.reload()
    });

    // Copied directly from foundry.js
    // Edits made to point to set alpha values (flag on entity or module setting if hidden)
    Token.prototype.refresh = function controlTokenAlpha() {
        // Token position and visibility
        if (!this._movement) this.position.set(this.data.x, this.data.y);

        // Size the texture aspect ratio within the token frame
        const tex = this.texture;
        if (tex) {
            let aspect = tex.width / tex.height;
            if (aspect >= 1) {
                this.icon.width = this.w * this.data.scale;
                this.icon.scale.y = this.icon.scale.x;
            } else {
                this.icon.height = this.h * this.data.scale;
                this.icon.scale.x = this.icon.scale.y;
            }
        }

        // Mirror horizontally or vertically
        this.icon.scale.x = Math.abs(this.icon.scale.x) * (this.data.mirrorX ? -1 : 1);
        this.icon.scale.y = Math.abs(this.icon.scale.y) * (this.data.mirrorY ? -1 : 1);

        // Set rotation, position, and opacity
        this.icon.rotation = toRadians(this.data.lockRotation ? 0 : this.data.rotation);
        this.icon.position.set(this.w / 2, this.h / 2);
        //this.icon.alpha = this.data.hidden ? 0.5 : 1.0;
        const setHidden = game.settings.get("alphaControl", "hiddenToken");
        const setAlpha = this.data.flags["alphaControl"]?.alpha ?? 1.0;
        this.icon.alpha = this.data.hidden ? setHidden : setAlpha;


        // Refresh Token border and target
        this._refreshBorder();
        this._refreshTarget();

        // Refresh nameplate and resource bars
        this.nameplate.visible = this._canViewMode(this.data.displayName);
        this.bars.visible = this._canViewMode(this.data.displayBars);

    }

    // Copied directly from foundry.js
    // Edits made to point to set alpha values (flag on entity or module setting if hidden)
    Tile.prototype.refresh = function controlTileAlpha() {
        // Set Tile position
        this.position.set(this.data.x, this.data.y);
        const aw = Math.abs(this.data.width);
        const ah = Math.abs(this.data.height);

        // Draw the sprite image
        let bounds = null;
        if (this.data.img) {
            const img = this.tile.img;

            // Set the tile dimensions and mirroring
            img.width = aw;
            if (this.data.width * img.scale.x < 0) img.scale.x *= -1;
            img.height = ah;
            if (this.data.height * img.scale.y < 0) img.scale.y *= -1;

            // Pivot in the center of the container
            img.anchor.set(0.5, 0.5);
            img.position.set(aw / 2, ah / 2);
            img.rotation = toRadians(this.data.rotation);

            // Toggle tile visibility
            //img.alpha = this.data.hidden ? 0.5 : 1.0;
            const setHidden = game.settings.get("alphaControl", "hiddenTile");
            const setAlpha = this.data.flags["alphaControl"]?.alpha ?? 1.0;
            img.alpha = this.data.hidden ? setHidden : setAlpha;


            bounds = this.tile.getLocalBounds(undefined, true);
        }

        // Draw a temporary background
        else {
            bounds = new NormalizedRectangle(0, 0, this.data.width, this.data.height);
            this.tile.bg.clear().beginFill(0xFFFFFF, 0.5).drawShape(bounds);
            this.tile.bg.visible = true;
        }

        // Allow some extra padding to detect handle hover interactions
        this.hitArea = this._controlled ? bounds.clone().pad(20) : bounds;

        // Update border frame
        this._refreshBorder(bounds);
        this._refreshHandle(bounds);

        // Set visibility
        this.alpha = 1;
        this.visible = !this.data.hidden || game.user.isGM;
        return this;
    }

    // Copied directly from foundry.js
    // Edits to handle range-input on-change and to supress console error that occurs when making changes in Tile Config app
    TileConfig.prototype._onChangeInput = function _tileConfig(event) {
        const el = event.target;
        if (el.type === "range") return this._onChangeRange(event);
        const fd = new FormDataExtended(event.currentTarget.form);
        for (let [k, v] of Object.entries(fd.toObject())) {
            this.object.data[k] = v;
        }
        this.object.refresh();
    }
});


async function injectControlAlphaOptions(app, html, data) {
    if (!game.user.isGM) return;
    const entity = app.token ? "token" : "object";
    const alpha = app[entity].getFlag("alphaControl", "alpha") ?? 1.0;
    const selector = entity === "token" ? "div[data-tab='image']:first" : "div[class='form-group']:last";
    const form = html.find(selector);
    const snippet = await renderTemplate(
        "modules/alphaControl/templates/config-snippet.hbs",
        { alpha }
    );
    if (entity === "token") form.append(snippet);
    else {
        form.after(snippet);
        html[0].style.height = "320px";
    }
}


Hooks.on("renderTokenConfig", injectControlAlphaOptions);
Hooks.on("renderTileConfig", injectControlAlphaOptions);