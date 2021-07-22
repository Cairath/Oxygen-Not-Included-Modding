## Changelog

### The Beginning
**The first official API, very-experimental**

This was the first official implementation of any sort of modding API. It didn't do much other than pull DLLs into the game and invoke `OnLoad` and Harmony `PatchAll` on them.

After *Spaced Out!*, the `mod_info.yaml` was introduced with very limited features, mostly just to allow for different mod versions between the two game versions.

### Version 1
**We don't talk about v1**

No really, it makes Ipsquiggle sad. Nobody knows where it went.

### Version 2
**A.K.A "The Mergedown" of Spaced Out**

The Mergedown was the first introduction of an actual official API of sorts. While not a complete API for everything, it did provide some notable features:
- Harmony has been upgraded to Harmony 2 (a.k.a. HarmonyLib)
- Old hooks have been replaced by the `UserMod2` class (see [UserMod2](Mod-Structure#usermod2))
- The Harmony `PatchAll` can now invoked conditionally and in control of the mod developer (see [UserMod2.OnLoad](Mod-Structure#usermod2-onload-method))
- `mod_info.yaml` gained some new fields, and `mod.yaml` was introduced (see [mod_info.yaml](Mod-Structure#mod_info-yaml))

More information can be found on the Klei forums about the updates.
- [Spaced Out! - The Big Merge Update - 469287](https://forums.kleientertainment.com/forums/topic/131141-spaced-out-the-big-merge-update-469287/)
- [ONI Is Upgrading to Harmony 2.0!](https://forums.kleientertainment.com/forums/topic/130712-oni-is-upgrading-to-harmony-20/)
- [Setting up mod_info.yaml](https://forums.kleientertainment.com/forums/topic/126022-setting-up-mod_infoyaml)
