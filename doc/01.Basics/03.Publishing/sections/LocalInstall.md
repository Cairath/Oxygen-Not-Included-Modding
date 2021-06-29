## Local Install
Mods can be installed locally should the mod not be available on Steam, you want a specific version, Steam is refusing to serve the correct version, or really any other reason. Simply copy the entire folder containing the mod's `.dll` (**not** as a zip or other archive), `mod.yaml` and `mod_info.yaml` (and other files the mod can contain, like graphical assets) into the `%USERPROFILE%\Documents\Klei\OxygenNotIncluded\mods\Local` folder within the game's files. Create the `Local` folder if it does not exist.
The mod's name in-game will be taken from the `title` property in the `mod.yaml` file, or the name of the folder, verbatim, if the `title` property is not defined. Otherwise, the mod will function identically as if it was installed via Steam.

### Sharing Local Mods
Nothing says you *have* to publish to Steam (and there are valid reasons not to), so you can simply place the folder containing your mod files into an archive (`.zip` or similar) and send it to whoever you wish via whatever platform you desire. The person on the other end needs to simply unpack the archive and the game will load the mod.
