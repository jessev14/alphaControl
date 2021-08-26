![All Downloads](https://img.shields.io/github/downloads/jessev14/alphaControl/total?style=for-the-badge)

![Latest Release Download Count](https://img.shields.io/github/downloads/jessev14/alphaControl/latest/alphaControl.zip)
[![Forge Installs](https://img.shields.io/badge/dynamic/json?label=Forge%20Installs&query=package.installs&suffix=%25&url=https%3A%2F%2Fforge-vtt.com%2Fapi%2Fbazaar%2Fpackage%2FalphaControl&colorB=4aa94a)](https://forge-vtt.com/bazaar#package=alphaControl)

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/jessev14)

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
- Token/Tiles opacity control now part of core Foundry VTT
- Alpha Control now only allows GMs to override default alpha value for hidden entities.

## Technical Notes
Alpha Control functions by patching the `#refresh` method of Tokens/Tiles.
