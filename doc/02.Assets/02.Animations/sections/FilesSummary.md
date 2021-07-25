## Klei Animation Files

Klei uses a proprietary file format to store data about their sprites and animations.
Normally this data is contained in a set of three files that make up a **kanim**. These files all share a common prefix, such as "hqbase" which is the name of the kanim for the **Printing Pod**.

An example of a complete set of animation files:
* `hqbase_0.png`  
  This is a sprite sheet containing all of the sprites used to make the Printing Pod.
* `hqbase_build.bytes`  
  This is the file that contains all of the sprite data for the Printing Pod.
* `hqbase_anim.bytes`  
  This is the file that contains all of the animations for the Printing Pod. (i.e. Keyframes)

The name for an animation does not always match the name you see in the game, so it will be very useful to extract all of the game's textures at once to allow visual searching through the graphics.  
See [Extracting Assets](Animations#ExtractingAssets) for instructions.

You can find the texture files for all of the animations in the `<Extracted Assets>/Texture2D` folder.

The **build.bytes** and **anim.bytes** files that go with the texture will be located in the `<Extracted Assets>/TextAsset` folder.