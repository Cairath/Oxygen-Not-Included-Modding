## mod_info.yaml
This file is **mandatory**. If you are using [archived versions](#versioning), you need a file **per every version**.  
Place it in your mod's root directory: `YourModName\mod.yaml`, and in the directory of each version if you have multiple.

The file template looks as follows:
```yaml
supportedContent: EXPANSION1_ID 
minimumSupportedBuild: 468097
version: "1.3.42"
APIVersion: 2
```

* **supportedContent**: this field defines game version for which this mod version will be loaded. It is possible to have separate mod versions for the Base Game and Spaced Out, please refer to the [versioning](#versioning) section.
  * ALL - both base game and Spaced Out
  * VANILLA_ID - only base game
  * EXPANSION1_ID - only Spaced Out
* **minimumSupportedBuild**: minimum game version for which the mod will be loaded
* **version**: an arbitrary string that will be displayed to users on the mod screen, automatically prefixed with 'v' (v1.3.42). Since this is just a text value, you can define your custom version format.
* **APIVersion**: all mods that include a .dll file (so anything aside from translations) must be set to 2 to specify you have upgraded your mod to use Harmony 2. If not set, the mod will not load.
