![All Downloads](https://img.shields.io/github/downloads/jessev14/alphaControl/total?style=for-the-badge)

# Alpha Control

## 0.7.9
- Set alpha value for token and tiles in config menu.
- Set default alpha values for hidden entities.

Alpha value can be changed programmatically by setting a flag on the entity.
Token Example:
```js
token.setFlag("alphaControl","alpha", 0.7);
```

## 0.8.X
- Token/Tiles opacity control now party of core Foundry VTT
- Module now only allows GMs to override default alpha value for hidden entities.

## Technical Notes
Alpha Control functions by patching the `#refresh` method of Tokens/Tiles.
