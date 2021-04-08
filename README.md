![All Downloads](https://img.shields.io/github/downloads/jessev14/alphaControl/total?style=for-the-badge)

# Alpha Control

Alpha Control is a simple FoundryVTT module that allows GMs to change the alpha value (opacity/transparency) of tokens and tiles (default 1.0).
It also allows changing of the default alpha value for hidden entities (default 0.5).

# Usage

<img src="/img/alphaControl-demo.wmv">

Alpha value can be changed programmatically by setting a flag on the entity.
Token Example:
```js
token.setFlag("alphaControl","alpha", 0.7);
```

# Technical Notes

Alpha Control functions by overriding the `#refresh` method of the Token and Tile classes.
In addition, a private method of TileConfig is also overridden: `#_onChangeInput`. This patch was made to suppress console errors that occured when making chages to the Tile Configuration application and to extend handling to range inputs.