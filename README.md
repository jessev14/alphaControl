![All Downloads](https://img.shields.io/github/downloads/jessev14/alphaControl/total?style=for-the-badge)

# Alpha Control

Alpha Control is a simple FoundryVTT module that allows GMs to change the alpha value (opacity/transparency) of tokens and tiles (default 1.0).
It also allows changing of the default alpha value for hidden entities (default 0.5).

# Usage

<img src="/img/alphaControl-demo.gif" width="600">

Open the configuration panel for the entity (double right click for tokens, double left click for tiles).
For tokens, switch to the Image tab and then for either entity type, set the alpha value at the bottom.

Alpha value can be changed programmatically by setting a flag on the entity.
Token Example:
```js
token.setFlag("alphaControl","alpha", 0.7);
```

# Technical Notes

Alpha Control functions by overriding the `#refresh` method of the Token and Tile classes.
In addition, a private method of TileConfig is also overridden: `#_onChangeInput`. This patch was made to suppress console errors that occured when making chages to the Tile Configuration application and to extend handling to range inputs.

I'm fairly certain my implementation is the worst monkey patching practice you could do, but it's the only method I could figure out.
If you have any ideas on how to clean this up, please reach out! (enso#0361)