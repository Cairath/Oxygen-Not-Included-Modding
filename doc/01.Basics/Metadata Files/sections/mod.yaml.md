## mod.yaml
This file is not mandatory, but very highly **recommended**.  
Place it in your mod's root directory: `YourModName\mod.yaml` - **one** file per mod. 

As of now, three properties can be defined, and the file template looks as follows:
```yaml
title: "Your Mod Title" 
description: "Something About Your Mod"
staticID: "yourSuperCoolMod" 
```

* **title**: set this to your mod name in the Steam Workshop. In case of non-Steam mod installation, this is what will be displayed in game as the mod title
* **description**: currently not used in game, but perhaps will be one day!
* **staticID**: a mod's unique identifier. This needs to be globally unique, across ALL mods. Can be as simple as your mod name (with no spaces), or you can prefix it with your name. Once you publish the mod - don't change this value. This is used for mod compatibility - the game will use this ID to create and name a Harmony instance for your mod, and other mods can refer to yours by this ID.
