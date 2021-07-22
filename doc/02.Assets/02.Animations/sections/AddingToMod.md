## Adding Animations to a Mod

The mod loading system in Oxygen Not Included will automatically detect the asset files and add them to the game assets.  
They just need to be put in the correct place in your mod folder.

Each of the animations you want to include with a mod must be put in their own folder like this:
```
<mod_folder>/anim/assets/myanim1/myanim1_0.png
<mod_folder>/anim/assets/myanim1/myanim1_build.bytes
<mod_folder>/anim/assets/myanim1/myanim1_anim.bytes

<mod_folder>/anim/assets/myanim2/myanim2_0.png
<mod_folder>/anim/assets/myanim2/myanim2_build.bytes
<mod_folder>/anim/assets/myanim2/myanim2_anim.bytes
```

`/myanim1/`: This folder name is imported by the game and creates a kanim asset named `myanim1_kanim`.

If there are any issues with the structure of the kanim the game will usually display the error in the logs. It may also crash when some code tries to use the kanim after it failed to load.
